import {Accessor, For, Setter} from "solid-js";
import {Semester, SemesterKey} from "../types/enum";

const SelectYearSemester = (props: { setYearSemester: Setter<{ year: number; semester: SemesterKey; }>; yearSemester: Accessor<{ year: number, semester: SemesterKey }> }) => {
    const {setYearSemester, yearSemester} = props;

    let years = [];
    for (let i = 1972; i <= 2024; i++) years.push(i);

    let semesters = Object.keys(Semester) as SemesterKey[];

    return <div style={{display: "flex", "flex-direction": "column", flex: 1, "justify-content": "center"}}>
        <select value={yearSemester().year.toString()} onChange={event => setYearSemester({
            year: parseInt(event.currentTarget.value),
            semester: yearSemester().semester,
        })}>
            <For each={years}>{(year) => <option value={year}>{year}년</option>}</For>
        </select>
        <select style={{"margin-top": ".3rem"}} value={yearSemester().semester} onChange={event => setYearSemester({
            year: yearSemester().year,
            semester: event.currentTarget.value as SemesterKey,
        })}>
            <For each={semesters}>{(key) => <option value={key}>{Semester[key]}</option>}</For>
        </select>
    </div>
};

export default SelectYearSemester;
