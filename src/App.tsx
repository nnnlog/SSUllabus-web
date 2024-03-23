import {Component, createSignal, Index} from 'solid-js';
import "@thisbeyond/solid-select/style.css";
import SelectYearSemester from "./components/filter/SelectYearSemester";
import {createStore} from "solid-js/store";

import {GradeRuleValue, GradeScaleValue, LanguageValue, SemesterValue, SubjectProcessValue} from "./types/enum"
import FilterOption from "./components/filter/filterOption";
import {getSubjects} from "./graphql";
import SubjectTable from "./components/SubjectTable";
import {Semester, Subject, SubjectProcess, SubjectsQueryVariables} from "./types/graphql";

import "./App.module.css"

const App: Component = () => {
    let [yearSemester, setYearSemester] = createSignal<{
        year: number,
        semester: Semester
    }>({
        year: 2024,
        semester: Semester.First
    });

    let [query, setQuery] = createStore<SubjectsQueryVariables>({
        get year() {
            return yearSemester().year;
        },
        get semester() {
            return yearSemester().semester;
        },
        process: [SubjectProcess.Haksa],
    });

    let [subjects, setSubjects] = createSignal<Subject[]>([]);

    const fetchData = async () => {
        let res = (await getSubjects(query)).subject;
        setSubjects(res);
    };

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
                <FilterOption
                    text={GradeScaleValue}
                    initialValue={query.grade_scale ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("grade_scale", undefined);
                        else setQuery("grade_scale", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"성적 스케일 : "}
                ></FilterOption>
                <FilterOption
                    text={GradeRuleValue}
                    initialValue={query.grade_rule ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("grade_rule", undefined);
                        else setQuery("grade_rule", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"성적 평가 방식 : "}
                ></FilterOption>
                <FilterOption
                    text={LanguageValue}
                    initialValue={query.lang ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("lang", undefined);
                        else setQuery("lang", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"강의 언어 : "}
                ></FilterOption>
                <FilterOption
                    text={SubjectProcessValue}
                    initialValue={query.process ?? []}
                    onChange={v => {
                        if (v.length === 0) setQuery("process", undefined);
                        else setQuery("process", v);
                    }}
                    placeholder={"(모두)"}
                    filterName={"과정 : "}
                ></FilterOption>
            </div>
            <button onclick={fetchData}>
                조회
            </button>
            <div>
                Showing information about {yearSemester().year}년도 {SemesterValue[yearSemester().semester]}
            </div>
            <SubjectTable subjects={subjects}/>
        </div>
    );
};

export default App;
