import {Component, createEffect, createMemo, createSignal, Index} from "solid-js";
import {CurrentSemesterDataQuery, Semester, Subject, SubjectProcess, SubjectsQueryVariables} from "../../types/graphql";
import {createStore} from "solid-js/store";
import {getCurrentSemesterData, getSubjects} from "../../graphql";
import SelectYearSemester from "../../components/filter/SelectYearSemester";
import FilterMultipleOption from "../../components/filter/filterMultipleOption";
import {GradeRuleValue, GradeScaleValue, LanguageValue, SemesterValue, SubjectProcessValue} from "../../types/enum";
import SubjectTable from "../../components/table/SubjectTable";
import BooleanOption from "../../components/filter/booleanOption";
import styles from "./SearchSubject.module.css";

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

    const fetchCurrentSemesterData = async () => setCurrentSemesterData(await getCurrentSemesterData({
        year: yearSemester().year,
        semester: yearSemester().semester,
    }));

    const majorLists = createMemo(() => {
        return currentSemesterData().major_lists.reduce((a, b) => ({
            ...a,
            [b.isu_name]: `${b.is_main ? " " : "(다전공) "}${b.isu_name}`
        }), {}); // for first sort
    });

    const multiMajorLists = createMemo(() => {
        return currentSemesterData().multi_major_lists.reduce((a, b) => ({...a, [b.isu_name]: b.isu_name}), {});
    });

    createEffect(fetchCurrentSemesterData, [yearSemester()]);

    const addSearchKeyword = () => {

    };

    return (
        <>
            <section class={styles["search-form"]}>
                <div class={styles["filterColumns"]}>
                    <div class={styles["filterColumn"]}>
                        {/*<div class={styles["filter-group"]}>*/}
                        {/*    <label for="score-scale">성적 스케일 : </label>*/}
                        {/*    <select id="score-scale">*/}
                        {/*        <option>모두</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="eval-method">성적 평가방식 : </label>*/}
                        {/*        <select id="eval-method">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>P/F</option>*/}
                        {/*            <option>절대평가</option>*/}
                        {/*            <option>상대평가</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="language">강의 언어 : </label>*/}
                        {/*        <select id="language">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>한국어</option>*/}
                        {/*            <option>영어</option>*/}
                        {/*            <option>기타</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="program">과정 : </label>*/}
                        {/*        <select id="program">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>학사과정</option>*/}
                        {/*            <option>석사과정</option>*/}
                        {/*            <option>박사과정</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div class={styles["filterColumn"]}>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="credit">학점 : </label>*/}
                        {/*        <select id="credit">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>3학점</option>*/}
                        {/*            <option>2학점</option>*/}
                        {/*            <option>1학점</option>*/}
                        {/*            <option>기타</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="course-type">이수구분 : </label>*/}
                        {/*        <select id="course-type">*/}
                        {/*            <option>모두</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="other-majors">타전공 인정 : </label>*/}
                        {/*        <select id="other-majors">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>Y</option>*/}
                        {/*            <option>N</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div class={styles["filterColumn"]}>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="cap-design">캡스톤 디자인 : </label>*/}
                        {/*        <select id="cap-design">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>Y</option>*/}
                        {/*            <option>N</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="target-students">수강제한 : </label>*/}
                        {/*        <select id="target-students">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>Y</option>*/}
                        {/*            <option>N</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="is-EL">EL 여부 : </label>*/}
                        {/*        <select id="is-EL">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>Y</option>*/}
                        {/*            <option>N</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div class={styles["filterColumn"]}>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="year">학년도 : </label>*/}
                        {/*        <select id="year">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>2024</option>*/}
                        {/*            <option>2023</option>*/}
                        {/*            <option>2022</option>*/}
                        {/*            <option>2021</option>*/}
                        {/*            <option>2020</option>*/}
                        {/*            <option>기타</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*    <div class={styles["filter-group"]}>*/}
                        {/*        <label for="semester">학기 : </label>*/}
                        {/*        <select id="semester">*/}
                        {/*            <option>모두</option>*/}
                        {/*            <option>1학기</option>*/}
                        {/*            <option>2학기</option>*/}
                        {/*            <option>여름학기</option>*/}
                        {/*            <option>겨울학기</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        TBD
                    </div>
                </div>
                <div class={styles["buttonRow"]}>
                    <input class={styles["search-text"]} type="text" placeholder="검색어 키워드를 추가하세요. (과목명, 과목코드, 교수명)"
                           onkeyup={event => {
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
                {/*<div id="additional-options">*/}
                {/*    <ul class={styles["additional-options"]}>*/}
                {/*        <li>*/}
                {/*            <button id="plus-option">+</button>*/}
                {/*            성적스케일*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <button id="plus-option">+</button>*/}
                {/*            대상 외 수강 제한*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <button id="plus-option">+</button>*/}
                {/*            타전공인정*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <button id="plus-option">+</button>*/}
                {/*            성적 평가방법*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <button id="plus-option">+</button>*/}
                {/*            EL 여부*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <button id="plus-option">+</button>*/}
                {/*            강의언어*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <button id="plus-option">+</button>*/}
                {/*            강의계획서*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                {/*<hr style="border-style: dashed; border-color: gray; border-width: 1px; width: 100%; margin: 20px auto;"/>*/}
                <SubjectTable subjects={subjects} yearSemester={yearSemester}/>
                {/*<table>*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>이수구분</th>*/}
                {/*        <th>과목번호</th>*/}
                {/*        <th>과목명</th>*/}
                {/*        <th>분반</th>*/}
                {/*        <th>교수명</th>*/}
                {/*        <th>개설학과</th>*/}
                {/*        <th>시간/학점</th>*/}
                {/*        <th>수강인원</th>*/}
                {/*        <th>여석</th>*/}
                {/*        <th>강의시간(강의실)</th>*/}
                {/*        <th>수강대상</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    <tr>*/}
                {/*        <td>전선</td>*/}
                {/*        <td>00000</td>*/}
                {/*        <td>과목명1</td>*/}
                {/*        <td>가반</td>*/}
                {/*        <td>교수 1</td>*/}
                {/*        <td>컴퓨터학부</td>*/}
                {/*        <td>3학점</td>*/}
                {/*        <td>60명</td>*/}
                {/*        <td>2명</td>*/}
                {/*        <td>20202</td>*/}
                {/*        <td>컴퓨터학부</td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>전선</td>*/}
                {/*        <td>00000</td>*/}
                {/*        <td>과목명1</td>*/}
                {/*        <td>가반</td>*/}
                {/*        <td>교수 1</td>*/}
                {/*        <td>컴퓨터학부</td>*/}
                {/*        <td>3학점</td>*/}
                {/*        <td>60명</td>*/}
                {/*        <td>2명</td>*/}
                {/*        <td>20202</td>*/}
                {/*        <td>컴퓨터학부</td>*/}
                {/*    </tr>*/}
                {/*    </tbody>*/}
                {/*</table>*/}
            </div>
        </>
    );
    // return (
    //     <div style={{width: "90%", margin: "3rem auto 0 auto"}}>
    //         <div style={{
    //             display: "flex",
    //             "justify-content": "space-between",
    //             "border-bottom": "1px solid black",
    //             "padding-bottom": "1rem"
    //         }}>
    //             <SelectYearSemester setYearSemester={setYearSemester} yearSemester={yearSemester}></SelectYearSemester>
    //             <div style={{
    //                 display: "flex",
    //                 "justify-content": "space-between",
    //                 "align-items": "center",
    //                 "flex-direction": "column",
    //                 flex: 1,
    //                 "align-self": "start"
    //             }}>
    //                 <div style={{
    //                     display: "flex",
    //                     "justify-content": "space-between",
    //                     "margin-left": "1rem",
    //                     width: "100%",
    //                     "align-self": "start"
    //                 }}>
    //                     <div style={{"margin-right": "0.3rem"}}>검색어 :</div>
    //                     <input id={"search"} placeholder={"검색어 키워드를 입력하세요. (과목명, 과목코드, 교수명 대상 검색)"} style={{flex: 1,}}
    //                            onkeyup={event => {
    //                                if (event.code !== "Enter") return;
    //                                if (event.currentTarget.value.length === 0) return;
    //
    //                                if (query.keyword) {
    //                                    if (query.keyword.includes(event.currentTarget.value)) return;
    //                                    setQuery("keyword", query.keyword.length, event.currentTarget.value);
    //                                } else {
    //                                    setQuery("keyword", [event.currentTarget.value]);
    //                                }
    //                                event.currentTarget.value = "";
    //                            }}/>
    //                 </div>
    //                 <div style={{
    //                     display: "flex",
    //                     "align-self": "flex-start",
    //                     "margin-left": "1rem",
    //                     "margin-top": ".3rem"
    //                 }}>
    //                     <Index each={query.keyword}>{(keyword, i) =>
    //                         <div style={{display: "flex"}}>
    //                             <div style={{"margin-right": ".3rem"}}>{keyword()}</div>
    //                             <button style={{"margin-right": "1rem"}}
    //                                     onclick={() => setQuery("keyword", value => value?.length === 1 ? undefined : [...value!.slice(0, i), ...value!.slice(i + 1)])}>x
    //                             </button>
    //                         </div>
    //                     }</Index>
    //                 </div>
    //             </div>
    //         </div>
    //         {/*filter in here*/}
    //         <div style={{display: "flex", "flex-direction": "column", flex: 1, "justify-content": "space-between",}}>
    //             <FilterMultipleOption
    //                 text={GradeScaleValue}
    //                 initialValue={query.grade_scale ?? []}
    //                 onChange={v => {
    //                     if (v.length === 0) setQuery("grade_scale", undefined);
    //                     else setQuery("grade_scale", v);
    //                 }}
    //                 placeholder={"(모두)"}
    //                 filterName={"성적 스케일 : "}
    //             ></FilterMultipleOption>
    //             <FilterMultipleOption
    //                 text={GradeRuleValue}
    //                 initialValue={query.grade_rule ?? []}
    //                 onChange={v => {
    //                     if (v.length === 0) setQuery("grade_rule", undefined);
    //                     else setQuery("grade_rule", v);
    //                 }}
    //                 placeholder={"(모두)"}
    //                 filterName={"성적 평가 방식 : "}
    //             ></FilterMultipleOption>
    //             <FilterMultipleOption
    //                 text={LanguageValue}
    //                 initialValue={query.lang ?? []}
    //                 onChange={v => {
    //                     if (v.length === 0) setQuery("lang", undefined);
    //                     else setQuery("lang", v);
    //                 }}
    //                 placeholder={"(모두)"}
    //                 filterName={"강의 언어 : "}
    //             ></FilterMultipleOption>
    //             <FilterMultipleOption
    //                 text={SubjectProcessValue}
    //                 initialValue={query.process ?? []}
    //                 onChange={v => {
    //                     if (v.length === 0) setQuery("process", undefined);
    //                     else setQuery("process", v);
    //                 }}
    //                 placeholder={"(모두)"}
    //                 filterName={"과정 : "}
    //             ></FilterMultipleOption>
    //             <FilterMultipleOption
    //                 text={currentSemesterData().credits.reduce((a, b) => ({...a, [b]: b.toString()}), {})}
    //                 initialValue={query.credit?.map(a => a.toString()) ?? []}
    //                 onChange={v => {
    //                     if (v.length === 0) setQuery("credit", undefined);
    //                     else setQuery("credit", v.map(a => parseFloat(a)));
    //                 }}
    //                 placeholder={"(모두)"}
    //                 filterName={"학점 : "}
    //             ></FilterMultipleOption>
    //             <FilterMultipleOption
    //                 text={majorLists()}
    //                 initialValue={query.majors ?? []}
    //                 onChange={v => {
    //                     if (v.length === 0) setQuery("majors", undefined);
    //                     else setQuery("majors", v);
    //                 }}
    //                 placeholder={"(모두)"}
    //                 filterName={"이수구분 : "}
    //             ></FilterMultipleOption>
    //             <FilterMultipleOption
    //                 text={multiMajorLists()}
    //                 initialValue={query.multi_majors ?? []}
    //                 onChange={v => {
    //                     if (v.length === 0) setQuery("multi_majors", undefined);
    //                     else setQuery("multi_majors", v);
    //                 }}
    //                 placeholder={"(모두)"}
    //                 filterName={"타전공인정 : "}
    //             ></FilterMultipleOption>
    //             <BooleanOption
    //                 initialValue={query.is_el ?? undefined}
    //                 onChange={v => {
    //                     if (v === 1) setQuery("is_el", undefined);
    //                     else setQuery("is_el", v === 2);
    //                 }}
    //                 filterName={"Engaged Learning 여부 : "}
    //             ></BooleanOption>
    //             <BooleanOption
    //                 initialValue={query.is_capstone ?? undefined}
    //                 onChange={v => {
    //                     if (v === 1) setQuery("is_capstone", undefined);
    //                     else setQuery("is_capstone", v === 2);
    //                 }}
    //                 filterName={"캡스톤디자인 여부 : "}
    //             ></BooleanOption>
    //             <BooleanOption
    //                 initialValue={query.limited_target ?? undefined}
    //                 onChange={v => {
    //                     if (v === 1) setQuery("limited_target", undefined);
    //                     else setQuery("limited_target", v === 2);
    //                 }}
    //                 filterName={"대상외수강제한 여부 : "}
    //             ></BooleanOption>
    //         </div>
    //         <button onclick={fetchSubjectData} style={{width: "100%", padding: ".5rem", "font-size": "16px"}}>
    //             조회
    //         </button>
    //         <div style={{"margin-top": "3rem"}}></div>
    //         <SubjectTable subjects={subjects} yearSemester={yearSemester}/>
    //     </div>
    // );
};

export default SearchSubject;
