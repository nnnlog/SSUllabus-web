import {Component, createEffect, createMemo, createSignal, Index} from "solid-js";
import {CurrentSemesterDataQuery, Semester, Subject, SubjectProcess, SubjectsQueryVariables} from "../../types/graphql";
import {createStore} from "solid-js/store";
import {getCurrentSemesterData, getSubjects} from "../../graphql";
import {GradeRuleValues, GradeScaleValues, LanguageValues, SubjectProcessValues} from "../../types/enum";
import SubjectTable from "../../components/table/SubjectTable";
import styles from "./SearchSubject.module.css";
import MultipleOptionsFilter from "../../components/filter/multiple/MultipleOptionsFilter";
import MultipleBooleanOptionsFilter from "../../components/filter/multiple/MultipleBooleanOptionsFilter";
import YearSemesterOptionFilter from "../../components/filter/single/YearSemesterOptionFilter";
import LegacySubjectTable from "../../components/table/LegacySubjectTable";

const SearchSubject: Component = () => {
    const [yearSemester, setYearSemester] = createSignal<{
        year: number,
        semester: Semester
    }>({
        year: 2024,
        semester: Semester.Second
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

    const majorLists = createMemo(() => {
        return currentSemesterData().major_lists.reduce((a, b) => [
            ...a,
            {
                value: b.isu_name,
                display: `${b.is_main ? " " : "(다전공) "}${b.isu_name}`
            }
        ], [] as { value: string, display: string }[]);
    });

    const multiMajorLists = createMemo(() => {
        return currentSemesterData().multi_major_lists.reduce((a, b) => [
            ...a,
            {
                value: b.isu_name,
                display: b.isu_name
            }
        ], [] as { value: string, display: string }[]);
    });

    createEffect(async () => {
        setCurrentSemesterData(await getCurrentSemesterData({
            year: yearSemester().year,
            semester: yearSemester().semester,
        }))
    }, [yearSemester()]);

    const [searchKeywordInput, setSearchKeywordInput] = createSignal<string>("");
    const addSearchKeyword = () => {
        if (query.keyword) {
            if (query.keyword.includes(searchKeywordInput())) return;
            setQuery("keyword", query.keyword.length, searchKeywordInput());
        } else {
            setQuery("keyword", [searchKeywordInput()]);
        }

        setSearchKeywordInput("");
    };

    return (
        <>
            <section class={styles["search-form"]}>
                <YearSemesterOptionFilter onChanged={(year, semester) => setYearSemester({
                    year,
                    semester
                })}></YearSemesterOptionFilter>
                <div class={styles["filterColumn"]}>
                    <div class={styles["filter-group"]}>
                        <MultipleOptionsFilter
                            values={GradeScaleValues}
                            defaultValues={GradeScaleValues.map(a => a.value)}
                            onChanged={v => {
                                if (v.length === GradeScaleValues.length) setQuery("grade_scale", undefined);
                                else setQuery("grade_scale", v);
                            }}
                            filterName={"성적 스케일"}
                        ></MultipleOptionsFilter>
                        <MultipleOptionsFilter
                            values={GradeRuleValues}
                            defaultValues={GradeRuleValues.map(a => a.value)}
                            onChanged={v => {
                                if (v.length === GradeRuleValues.length) setQuery("grade_rule", undefined);
                                else setQuery("grade_rule", v);
                            }}
                            filterName={"성적 평가 방식"}
                        ></MultipleOptionsFilter>
                        <MultipleOptionsFilter
                            values={LanguageValues}
                            defaultValues={LanguageValues.map(a => a.value)}
                            onChanged={v => {
                                if (v.length === LanguageValues.length) setQuery("lang", undefined);
                                else setQuery("lang", v);
                            }}
                            filterName={"강의 언어"}
                        ></MultipleOptionsFilter>
                    </div>
                    <div class={styles["filter-group"]} style={{"margin-top": "1.5rem"}}>
                        <MultipleOptionsFilter
                            values={currentSemesterData().credits.reduce((a, b) => [...a, {
                                value: b,
                                display: b.toString()
                            }], [] as { value: number, display: string }[])}
                            defaultValues={currentSemesterData().credits}
                            onChanged={v => {
                                if (v.length === currentSemesterData().credits.length) setQuery("credit", undefined);
                                else setQuery("credit", v);
                            }}
                            filterName={"학점"}
                        ></MultipleOptionsFilter>
                        <MultipleOptionsFilter
                            values={majorLists()}
                            defaultValues={majorLists().map(a => a.value)}
                            onChanged={v => {
                                if (v.length === majorLists().length) setQuery("majors", undefined);
                                else setQuery("majors", v);
                            }}
                            filterName={"이수구분 (주전공)"}
                        ></MultipleOptionsFilter>
                        <MultipleOptionsFilter
                            values={multiMajorLists()}
                            defaultValues={multiMajorLists().map(a => a.value)}
                            onChanged={v => {
                                if (v.length === multiMajorLists().length) setQuery("multi_majors", undefined);
                                else setQuery("multi_majors", v);
                            }}
                            filterName={"이수구분 (타전공 인정과목)"}
                        ></MultipleOptionsFilter>
                    </div>
                    <div class={styles["filter-group"]} style={{"margin-top": "1.5rem"}}>
                        <MultipleBooleanOptionsFilter defaultValues={[true, false]} onChanged={v => {
                            if (v.length === 1) setQuery("is_el", v[0]);
                            else setQuery("is_el", undefined);
                        }} filterName={"Engaged Learning 여부"}></MultipleBooleanOptionsFilter>
                        <MultipleBooleanOptionsFilter defaultValues={[true, false]} onChanged={v => {
                            if (v.length === 1) setQuery("is_capstone", v[0]);
                            else setQuery("is_capstone", undefined);
                        }} filterName={"캡스톤디자인 여부"}></MultipleBooleanOptionsFilter>
                        <MultipleBooleanOptionsFilter defaultValues={[true, false]} onChanged={v => {
                            if (v.length === 1) setQuery("limited_target", v[0]);
                            else setQuery("limited_target", undefined);
                        }} filterName={"대상외수강제한 여부"}></MultipleBooleanOptionsFilter>
                    </div>
                    <div class={styles["filter-group"]} style={{"margin-top": "1.5rem"}}>
                        <MultipleOptionsFilter
                            values={SubjectProcessValues}
                            defaultValues={[SubjectProcess.Haksa]}
                            onChanged={v => {
                                if (v.length === SubjectProcessValues.length) setQuery("process", undefined);
                                else setQuery("process", v);
                            }}
                            filterName={"과정"}
                        ></MultipleOptionsFilter>
                    </div>
                </div>
                <div class={styles["buttonRow"]}>
                    <input class={styles["search-text"]} type="text"
                           placeholder="검색어 키워드를 추가하세요. (과목명, 과목코드, 교수명에 대해 검색)"
                           onkeyup={event => {
                               if (event.code !== "Enter") return;
                               if (event.currentTarget.value.length === 0) return;

                               console.log(event.currentTarget.value, searchKeywordInput());
                               addSearchKeyword();
                               event.currentTarget.value = "";
                           }}
                           value={searchKeywordInput()}
                           onkeydown={event => setSearchKeywordInput(event.currentTarget.value)}
                           onsubmit={addSearchKeyword}
                    />
                    <button class={styles["search-button"]} onClick={addSearchKeyword}>추가</button>
                    <button class={styles["search-button"]} style="margin-left: auto;"
                            onClick={fetchSubjectData}>조회
                    </button>
                </div>
                <div class={styles["trait-viewer"]}>
                    <ul class={styles["search-options"]}>
                        <Index each={query.keyword}>{(keyword, i) =>
                            <li>
                                {keyword()}
                                <button class={styles["search-op-btn"]}
                                        onClick={() => setQuery("keyword", value => value?.length === 1 ? undefined : [...value!.slice(0, i), ...value!.slice(i + 1)])}>x
                                </button>
                            </li>
                        }</Index>
                    </ul>
                </div>
            </section>

            <div class={styles["result"]}>
                <hr style="border-style: dashed; border-color: gray; border-width: 1px; width: 100%; margin: 10px auto;"/>
                {/*<LegacySubjectTable subjects={subjects} yearSemester={yearSemester}/>*/}
                <SubjectTable subjects={subjects} yearSemester={yearSemester}/>
            </div>
        </>
    );
};

export default SearchSubject;
