import {Component, createEffect, createMemo, createSignal, Index} from "solid-js";
import {CurrentSemesterDataQuery, Semester, Subject, SubjectProcess, SubjectsQueryVariables} from "../types/graphql";
import {createStore} from "solid-js/store";
import {getCurrentSemesterData, getSubjects} from "../graphql";
import SelectYearSemester from "../components/filter/SelectYearSemester";
import FilterMultipleOption from "../components/filter/filterMultipleOption";
import {GradeRuleValue, GradeScaleValue, LanguageValue, SemesterValue, SubjectProcessValue} from "../types/enum";
import SubjectTable from "../components/SubjectTable";
import BooleanOption from "../components/filter/booleanOption";

const SearchSubject: Component = () => {
    const [yearSemester, setYearSemester] = createSignal<{
        year: number,
        semester: Semester
    }>({
        year: 2024,
        semester: Semester.First
    });

    const [query, setQuery] = createStore<SubjectsQueryVariables>({
        get year() {
            return yearSemester().year;
        },
        get semester() {
            return yearSemester().semester;
        },
        process: [SubjectProcess.Haksa],
    });

    const [subjects, setSubjects] = createSignal<Subject[]>([]);

    const fetchSubjectData = async () => {
        let res = (await getSubjects(query)).subject;
        setSubjects(res);
    };

    const [currentSemesterData, setCurrentSemesterData] = createSignal<CurrentSemesterDataQuery>({
        credits: [],
        major_lists: [],
        multi_major_lists: [],
        lecture_rooms: [],
    });

    const fetchCurrentSemesterData = async () => setCurrentSemesterData(await getCurrentSemesterData({
        year: yearSemester().year,
        semester: yearSemester().semester,
    }));

    const majorLists = createMemo(() => {
        return currentSemesterData().major_lists.reduce((a, b) => ({...a, [b.isu_name]: `${b.is_main ? " " : "(다전공) "}${b.isu_name}`}), {}); // for first sort
    });

    const multiMajorLists = createMemo(() => {
        return currentSemesterData().multi_major_lists.reduce((a, b) => ({...a, [b.isu_name]: b.isu_name}), {});
    });

    createEffect(fetchCurrentSemesterData, [yearSemester()]);

    return (
        <div style={{width: "90%", margin: "3rem auto 0 auto"}}>
            <div style={{display: "flex", "justify-content": "space-between", "border-bottom": "1px solid black", "padding-bottom": "1rem"}}>
                <SelectYearSemester setYearSemester={setYearSemester} yearSemester={yearSemester}></SelectYearSemester>
                <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "flex-direction": "column", flex: 1, "align-self": "start"}}>
                    <div style={{display: "flex", "justify-content": "space-between", "margin-left": "1rem", width: "100%", "align-self": "start"}}>
                        <div style={{"margin-right": "0.3rem"}}>검색어 :</div>
                        <input id={"search"} placeholder={"검색어 키워드를 입력하세요. (과목명, 과목코드, 교수명 대상 검색)"} style={{flex: 1,}} onkeyup={event => {
                            if (event.code !== "Enter") return;
                            if (event.currentTarget.value.length === 0) return;

                            if (query.keyword) {
                                if (query.keyword.includes(event.currentTarget.value)) return;
                                setQuery("keyword", query.keyword.length, event.currentTarget.value);
                            } else {
                                setQuery("keyword", [event.currentTarget.value]);
                            }
                            event.currentTarget.value = "";
                        }}/>
                    </div>
                    <div style={{display: "flex", "align-self": "flex-start", "margin-left": "1rem", "margin-top": ".3rem"}}>
                        <Index each={query.keyword}>{(keyword, i) =>
                            <div style={{display: "flex"}}>
                                <div style={{"margin-right": ".3rem"}}>{keyword()}</div>
                                <button style={{"margin-right": "1rem"}}
                                        onclick={() => setQuery("keyword", value => value?.length === 1 ? undefined : [...value!.slice(0, i), ...value!.slice(i + 1)])}>x
                                </button>
                            </div>
                        }</Index>
                    </div>
                </div>
            </div>
            {/*filter in here*/}
            <div style={{display: "flex", "flex-direction": "column", flex: 1, "justify-content": "space-between",}}>
                <FilterMultipleOption
                    text={GradeScaleValue}
                    initialValue={query.grade_scale ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("grade_scale", undefined);
                        else setQuery("grade_scale", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"성적 스케일 : "}
                ></FilterMultipleOption>
                <FilterMultipleOption
                    text={GradeRuleValue}
                    initialValue={query.grade_rule ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("grade_rule", undefined);
                        else setQuery("grade_rule", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"성적 평가 방식 : "}
                ></FilterMultipleOption>
                <FilterMultipleOption
                    text={LanguageValue}
                    initialValue={query.lang ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("lang", undefined);
                        else setQuery("lang", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"강의 언어 : "}
                ></FilterMultipleOption>
                <FilterMultipleOption
                    text={SubjectProcessValue}
                    initialValue={query.process ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("process", undefined);
                        else setQuery("process", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"과정 : "}
                ></FilterMultipleOption>
                <FilterMultipleOption
                    text={currentSemesterData().credits.reduce((a, b) => ({...a, [b]: b.toString()}), {})}
                    initialValue={query.credit?.map(a => a.toString()) ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("credit", undefined);
                        else setQuery("credit", v.map(a => parseFloat(a)));
                    }}
                    placeholder={"(모두)"}
                    filterName={"학점 : "}
                ></FilterMultipleOption>
                <FilterMultipleOption
                    text={majorLists()}
                    initialValue={query.majors ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("majors", undefined);
                        else setQuery("majors", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"이수구분 : "}
                ></FilterMultipleOption>
                <FilterMultipleOption
                    text={multiMajorLists()}
                    initialValue={query.multi_majors ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("multi_majors", undefined);
                        else setQuery("multi_majors", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"타전공인정 : "}
                ></FilterMultipleOption>
                <BooleanOption
                    initialValue={query.is_el ?? undefined}
                    onChange={v => {
                        if (v === 1) setQuery("is_el", undefined);
                        else setQuery("is_el", v === 2);
                    }}
                    filterName={"Engaged Learning 여부 : "}
                ></BooleanOption>
                <BooleanOption
                    initialValue={query.is_capstone ?? undefined}
                    onChange={v => {
                        if (v === 1) setQuery("is_capstone", undefined);
                        else setQuery("is_capstone", v === 2);
                    }}
                    filterName={"캡스톤디자인 여부 : "}
                ></BooleanOption>
                <BooleanOption
                    initialValue={query.limited_target ?? undefined}
                    onChange={v => {
                        if (v === 1) setQuery("limited_target", undefined);
                        else setQuery("limited_target", v === 2);
                    }}
                    filterName={"대상외수강제한 여부 : "}
                ></BooleanOption>
            </div>
            <button onclick={fetchSubjectData} style={{width: "100%", padding: ".5rem", "font-size": "16px"}}>
                조회
            </button>
            <div style={{"margin-top": "3rem"}}></div>
            <SubjectTable subjects={subjects} yearSemester={yearSemester}/>
        </div>
    );
};

export default SearchSubject;
