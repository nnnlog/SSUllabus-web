import {Accessor, createSignal, For, Show} from "solid-js";
import {Semester, Subject} from "../../types/graphql";
import {Syllabus} from "../../types/syllabus";
import {getSubjectsSyllabus} from "../../graphql";
import {GradeRuleValue, GradeScaleValue, LanguageValue, SubjectProcessValue} from "../../types/enum";
import AgGridSolid from "solid-ag-grid";
import {SizeColumnsToContentStrategy} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import SyllabusViewer from "../syllabus/SyllabusViewer";

const SubjectTable = (props: {
    yearSemester: Accessor<{
        year: number,
        semester: Semester
    }>,
    subjects: Accessor<Subject[]>,
}) => {
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

    const defaultColDef = {
        sortable: true,
        filter: true,
        autoHeight: true,
        wrapText: true,
        // cellStyle: { 'white-space': 'pre' }
    };

    const columnDefs = [
        {
            field: "syllabus",
            headerName: "강의 계획서",
            cellRenderer: (value: { data: Subject }) => {
                return <button onclick={() => openSyllabus(value.data.code)}>열기</button>;
            },
            width: 130,
        },
        {field: "code", headerName: "과목코드"},
        {field: "name", headerName: "과목명"},
        {field: "bunban", headerName: "분반"},
        {field: "credit", headerName: "학점"},
        {field: "professor", headerName: "교수명"},
        {field: "listen_count", headerName: "수강 인원"},
        {field: "remain_count", headerName: "여석"},
        {field: "majors", headerName: "이수구분", valueGetter: (value: { data: Subject }) => value.data.majors.join(", ")},
        {field: "multi_majors", headerName: "이수구분(타전공 인정)"},
        {field: "target", headerName: "수강 대상"},
        {field: "limited_target", headerName: "대상외수강제한 여부"},
        {
            field: "time_place",
            headerName: "시간/강의실",
            valueGetter: (value: {
                data: Subject
            }) => value.data.time_place?.map(a => `${a.day} (${a.place}) - ${a.time_start} : ${a.time_end}`)?.join("\n") ?? "",
            cellRenderer: (params: { value: string }) => {
                return <><For each={params.value.split("\n")}>{i => <p style={{margin: 0}}>{i}</p>}</For></>;
            },
        },
        {
            field: "grade_scale",
            headerName: "성적 스케일",
            valueGetter: (value: { data: Subject }) => GradeScaleValue[value.data.grade_scale]
        },
        {
            field: "grade_rule",
            headerName: "성적 평가 방식",
            valueGetter: (value: { data: Subject }) => GradeRuleValue[value.data.grade_rule]
        },
        {field: "lang", headerName: "강의 언어", valueGetter: (value: { data: Subject }) => LanguageValue[value.data.lang]},
        {field: "is_el", headerName: "EL 여부"},
        {field: "is_capstone", headerName: "캡스톤 여부"},
        {field: "open_department", headerName: "개설 학과"},
        {
            field: "process",
            headerName: "과정",
            valueGetter: (value: { data: Subject }) => SubjectProcessValue[value.data.process]
        },
    ];

    const autoSizeStrategy: SizeColumnsToContentStrategy = {
        type: 'fitCellContents',
        colIds: []
    };

    return <>
        <div class="ag-theme-material">
            <AgGridSolid domLayout='autoHeight' defaultColDef={defaultColDef} columnDefs={columnDefs}
                         rowData={props.subjects()} pagination={true} paginationPageSize={50}
                         paginationPageSizeSelector={[10, 50, 100, 500, 1000, 5000]}
                         autoSizeStrategy={autoSizeStrategy}></AgGridSolid>
        </div>
        <Show when={showSyllabus() && syllabus() !== null}>
            <SyllabusViewer syllabus={syllabus()!} setShowSyllabus={setShowSyllabus}></SyllabusViewer>
        </Show>
    </>;
};

export default SubjectTable;
