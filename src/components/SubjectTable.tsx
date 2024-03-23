import {Accessor, For} from "solid-js";
import {createColumnHelper, createSolidTable, flexRender, getCoreRowModel, getExpandedRowModel} from "@tanstack/solid-table";
import {Subject} from "../types/graphql";

const SubjectTable = (props: {
    subjects: Accessor<Subject[]>,
}) => {
    const {subjects} = props;

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
        columnHelper.accessor("target", {
            header: "수강대상",
        }),
    ];

    const table = createSolidTable({
        columns,
        get data() {
            return subjects();
        },
        enableExpanding: true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return <table>
        <thead>
        <For each={table.getHeaderGroups()}>{(row, i) =>
            <tr>
                <For each={row.headers}>{(header, j) =>
                    <th>{flexRender(header.column.columnDef.header, header.getContext())}</th>}</For>
            </tr>
        }</For>
        </thead>
        <tbody>
        <For each={table.getRowModel().rows}>{(row, i) =>
            <tr>
                <For each={row.getVisibleCells()}>{cell =>
                    <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                }</For>
            </tr>
        }</For>
        </tbody>
    </table>;
};

export default SubjectTable;
