import {Accessor, createEffect, createSignal, For, Index, Show} from "solid-js";
import {
    createColumnHelper,
    createSolidTable,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel
} from "@tanstack/solid-table";
import {Semester, Subject} from "../../types/graphql";
import {createStore} from "solid-js/store";
import {GradeRuleValue, GradeScaleValue, LanguageValue, SubjectProcessValue} from "../../types/enum";
import {Syllabus} from "../../types/syllabus";
import {getSubjectsSyllabus} from "../../graphql";
import SyllabusViewer from "../syllabus/SyllabusViewer";
import styles from './SubjectTable.module.css';

const SubjectTable = (props: {
    yearSemester: Accessor<{
        year: number,
        semester: Semester
    }>,
    subjects: Accessor<Subject[]>,
}) => {
    const [expand, setExpand] = createStore(props.subjects().map(() => false));

    createEffect(() => {
        setExpand(props.subjects().map(() => false));
    }, props.subjects());

    const [syllabus, setSyllabus] = createSignal<Syllabus | null>(null);
    const [showSyllabus, setShowSyllabus] = createSignal(false);

    const openSyllabus = async (code: string) => {
        let data = (await getSubjectsSyllabus({
            year: props.yearSemester().year,
            semester: props.yearSemester().semester,
            code: [code]
        })).subject.find(subject => subject.code === code)!.syllabus;
        if (data === null || data === undefined) {
            alert("강의계획서가 없는 과목입니다.");
            return;
        }
        setSyllabus(JSON.parse(data));
        setShowSyllabus(true);
    };

    const columnHelper = createColumnHelper<Subject>();
    const columns = [
        columnHelper.accessor("code", {
            header: "과목코드",
        }),
        columnHelper.accessor("name", {
            header: "과목명",
        }),
        columnHelper.accessor("bunban", {
            header: "분반",
        }),
        columnHelper.accessor("professor", {
            header: "교수명",
        }),
        columnHelper.accessor("listen_count", {
            header: "수강인원",
        }),
        columnHelper.accessor("remain_count", {
            header: "여석",
        }),
        columnHelper.accessor("credit", {
            header: "학점",
        }),
        columnHelper.accessor("process", {
            header: "과정",
            cell: props1 => <>{SubjectProcessValue[props1.getValue()]}</>,
        }),
        columnHelper.accessor("target", {
            header: "수강대상",
        }),
        columnHelper.display({
            header: "상세정보",
            cell: (props) =>
                <div
                    style={{cursor: "pointer"}}
                    onclick={() => setExpand(props.row.index, a => !a)}
                >
                    {expand[props.row.index] ? "닫기" : "자세히보기"}
                </div>,
        }),
        columnHelper.display({
            header: "강의계획서",
            cell: (props) =>
                <div
                    style={{cursor: "pointer"}}
                    onclick={() => openSyllabus(props.row.original.code)}
                >
                    열기
                </div>,
        }),
    ];

    const table = createSolidTable({
        columns,
        get data() {
            return props.subjects();
        },
        getCoreRowModel: getCoreRowModel(),
    });

    const getDetailInformation: (subject: Subject) => [string, string][][] = (subject) => [
        [
            ["이수구분 :", subject.majors.join(", ")],
            ["타전공 인정 :", subject.multi_majors.join(", ")],
            ["개설학과 :", subject.open_department ?? "(알수없음)"],
        ],
        [
            ["성적 스케일 :", GradeScaleValue[subject.grade_scale]],
            ["성적 평가 방법 :", GradeRuleValue[subject.grade_rule]],
            ["강의 언어 :", LanguageValue[subject.lang]],
        ],
        [
            ["대상외수강제한 :", subject.limited_target ? "Y" : "N"],
            ["Engaged Larning :", subject.is_el ? "Y" : "N"],
            ["", ""]
        ],
        [
            ["시간/강의실 :", subject.time_place?.map(a => `${a.day} (${a.place}) - ${a.time_start} : ${a.time_end}`)?.join("\n") ?? "-"],
        ]
    ];

    return <>
        <table class={styles.table}>
            <thead>
            <For each={table.getHeaderGroups()}>{(row, i) =>
                <tr>
                    <For each={row.headers}>{(header, j) =>
                        <th>{header.column.columnDef.header?.toString()}</th>}
                        {/*<th style={{width: `${header.column.getSize()}px`}}>{flexRender(header.column.columnDef.header, header.getContext())}</th>}*/}
                    </For>
                </tr>
            }</For>
            </thead>
            <tbody>
            <Index each={table.getCoreRowModel().rows}>{(row) =>
                <>
                    <tr>
                        <Index each={row().getVisibleCells()}>{cell =>
                            <td style={{"text-align": "center"}}>{flexRender(cell().column.columnDef.cell, cell().getContext())}</td>
                        }</Index>
                    </tr>
                    <Show when={expand[row().index]}>
                        <tr>
                            <td style={{"flex-direction": "column"}} colSpan={row().getVisibleCells().length}>
                                <div style={{padding: "2rem 3rem", margin: "0 auto"}}>
                                    <Index each={getDetailInformation(row().original)}>{a =>
                                        <div style={{
                                            display: "flex",
                                            "justify-content": "space-between",
                                            "margin-bottom": "1rem"
                                        }}>
                                            <Index each={a()}>{value =>
                                                <div style={{
                                                    flex: 1,
                                                    "align-self": "flex-start",
                                                    display: "flex",
                                                    "margin-right": "1rem"
                                                }}>
                                                    <div style={{"margin-right": "0.5rem"}}>{value()[0]}</div>
                                                    <div style={{"white-space": "pre-line", flex: 1}}>{value()[1]}</div>
                                                </div>
                                            }</Index>
                                        </div>
                                    }</Index>
                                </div>
                                {/*<button style={{width: "100%"}} onclick={() => openSyllabus(row().original.code)}>*/}
                                {/*    강의계획서 보기*/}
                                {/*</button>*/}
                            </td>
                        </tr>
                    </Show>
                </>
            }</Index>
            </tbody>
        </table>
        <Show when={showSyllabus() && syllabus() !== null}>
            <SyllabusViewer syllabus={syllabus()!} setShowSyllabus={setShowSyllabus}></SyllabusViewer>
        </Show>
    </>;
};

export default SubjectTable;
