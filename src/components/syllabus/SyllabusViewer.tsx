import {Syllabus} from "../../types/syllabus";
import {createMemo, Index, onCleanup, onMount, Setter, Show} from "solid-js";
import {Portal} from "solid-js/web";

import styles from "./SyllabusViewer.module.css";

const SyllabusViewer = (props: { syllabus: Syllabus | null, setShowSyllabus: Setter<boolean> }) => {
    const header = createMemo<({
        key: string,
        value: string,
        colspan?: number,
    })[][]>(() => props.syllabus ? [
        [
            {
                key: "강좌명",
                value: props.syllabus.name,
            },
            {
                key: "담당교수",
                value: props.syllabus.professor,
            },
            {
                key: "과목코드",
                value: props.syllabus.code,
            },
        ],
        [
            {
                key: "연도",
                value: props.syllabus.year,
            },
            {
                key: "학기",
                value: props.syllabus.semester,
            },
            {
                key: "수강대상학과",
                value: props.syllabus.target,
            },
        ],
        [
            {
                key: "이수구분",
                value: props.syllabus.isu_main_type,
            },
            {
                key: "학점수",
                value: props.syllabus.credit,
            },
            {
                key: "언어",
                value: props.syllabus.lang,
            },
        ],
        [
            {
                key: "성적스케일",
                value: props.syllabus.grade_scale,
            },
            {
                key: "성적평가방식",
                value: props.syllabus.grade_rule,
            },
            {
                key: "교과목유형",
                value: props.syllabus.subject_type,
            },
        ],
        [
            {
                key: "필수선수과목",
                value: props.syllabus.must_listen_before,
            },
            {
                key: "권장선수과목",
                value: props.syllabus.should_listen_before,
            },
            {
                key: "강좌형식",
                value: props.syllabus.class_progress_type,
            },
        ],
        [
            {
                key: "교수실",
                value: props.syllabus.prof_room,
            },
            {
                key: "연락처",
                value: props.syllabus.prof_telno,
            },
            {
                key: "이메일",
                value: props.syllabus.prof_email,
            },
        ],
        [
            {
                key: "주교재",
                value: props.syllabus.textbook_main,
            },
            {
                key: "부교재",
                value: props.syllabus.textbook_sub,
            },
            {
                key: "수업유형",
                value: props.syllabus.class_type,
            },
        ],
        [
            {
                key: "개요",
                value: props.syllabus.abstract,
                colspan: 5,
            },
        ],
        [
            {
                key: "학습준비사항",
                value: props.syllabus.need_for_study,
                colspan: 5,
            },
        ],
        [
            {
                key: "수강학생 유의 및 참고사항",
                value: props.syllabus.etc,
                colspan: 5,
            },
        ],
    ] : []);

    const files = createMemo(() => props.syllabus ? props.syllabus.file : []);

    const grading = createMemo(() => props.syllabus ? props.syllabus.grading : []);

    const weeks = createMemo(() => props.syllabus ? props.syllabus.week : []);

    onMount(() => {
        document.body.style.overflowY = "hidden";
    });
    onCleanup(() => {
        document.body.style.overflowY = "";
    });

    return <Portal>
        <Show when={props.syllabus !== null} fallback={<div>
            강의 계획서 정보가 없습니다.
        </div>}>
            <div class={styles.overlay} onClick={() => props.setShowSyllabus(false)}></div>
            <div class={styles.popup}>
                <div class={styles.close} onClick={() => props.setShowSyllabus(false)}>X</div>
                <div style={{"font-size": "22px", "font-weight": "bold", "margin-bottom": "1rem"}}>강의 개요</div>
                <table class={styles.table}>
                    <tbody>
                    <Index each={header()}>{row =>
                        <tr style={styles.tableRow}>
                            <Index each={row()}>{keyValue =>
                                <>
                                    <td class={styles.tableDatumKey}>{keyValue().key}</td>
                                    <td class={styles.tableDatumValue}
                                        colSpan={keyValue().colspan ?? 1}>{keyValue().value}</td>
                                </>
                            }</Index>
                        </tr>
                    }</Index>
                    </tbody>
                </table>
                <div style={{"margin-top": "3rem"}}></div>
                <div style={{"font-size": "22px", "font-weight": "bold", "margin-bottom": "1rem"}}>첨부파일</div>
                <table class={styles.table}>
                    <thead>
                    <tr>
                        <th class={styles.tableDatumKey}>파일명</th>
                        <th class={styles.tableDatumKey}>다운로드</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Show when={files().length > 0} fallback={
                        <tr>
                            <td class={styles.tableDatumValue} colspan={2}>파일 없음</td>
                        </tr>
                    }>
                        <Index each={files()}>{row =>
                            <tr style={styles.tableRow}>
                                <td class={styles.tableDatumValue}>{row().name}</td>
                                <td class={styles.tableDatumValue}><a href={row().url} target={"_blank"}>다운로드</a></td>
                            </tr>
                        }</Index>
                    </Show>
                    </tbody>
                </table>
                <div style={{"margin-top": "3rem"}}></div>
                <div style={{"font-size": "22px", "font-weight": "bold", "margin-bottom": "1rem"}}>평가 기준</div>
                <table class={styles.table}>
                    <thead>
                    <tr>
                        <th class={styles.tableDatumKey}>평가항목</th>
                        <th class={styles.tableDatumKey}>각 항목별 만점 (100점)</th>
                        <th class={styles.tableDatumKey}>반영비율 (합계 100%)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Index each={grading()}>{row =>
                        <tr style={styles.tableRow}>
                            <td class={styles.tableDatumValue}>{row().name}</td>
                            <td class={styles.tableDatumValue}>{row().score}</td>
                            <td class={styles.tableDatumValue}>{row().weighted_score}</td>
                        </tr>
                    }</Index>
                    </tbody>
                </table>
                <div style={{"margin-top": "3rem"}}></div>
                <div style={{"font-size": "22px", "font-weight": "bold", "margin-bottom": "1rem"}}>주차별 계획</div>
                <table class={styles.table}>
                    <thead>
                    <tr>
                        <th class={styles.tableDatumKey}>주차</th>
                        <th class={styles.tableDatumKey}>핵심어</th>
                        <th class={styles.tableDatumKey}>세부내용</th>
                        <th class={styles.tableDatumKey}>교수방법</th>
                        <th class={styles.tableDatumKey}>교재범위</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Index each={weeks()}>{row =>
                        <tr style={styles.tableRow}>
                            <td class={styles.tableDatumValue}>{row().week}</td>
                            <td class={styles.tableDatumValue}>{row().coreword}</td>
                            <td class={styles.tableDatumValue}>{row().detail}</td>
                            <td class={styles.tableDatumValue}>{row().teaching_way}</td>
                            <td class={styles.tableDatumValue}>{row().textbook}</td>
                        </tr>
                    }</Index>
                    </tbody>
                </table>
            </div>
        </Show>
    </Portal>
        ;
};

export default SyllabusViewer;
