import {Accessor, For, Setter} from "solid-js";

const SelectYearSemester = (props: { setYearSemester: Setter<{ year: number; semester: string; }>; yearSemester: Accessor<{ year: number, semester: string }> }) => {
    const {setYearSemester, yearSemester} = props;

    let years = [];
    for (let i = 1972; i <= 2024; i++) years.push(i);

    let semesters = ["1학기", "여름학기", "2학기", "겨울학기"];

    return <div style={{display: "flex", "flex-direction": "column", flex: 1, "justify-content": "center"}}>
        <select value={yearSemester().year.toString()} onChange={event => setYearSemester({
            year: parseInt(event.currentTarget.value),
            semester: yearSemester().semester,
        })}>
            <For each={years}>{(year) => <option value={year}>{year}년</option>}</For>
        </select>
        <select value={yearSemester().semester} onChange={event => setYearSemester({
            year: yearSemester().year,
            semester: event.currentTarget.value,
        })}>
            <For each={semesters}>{(semester) => <option value={semester}>{semester}</option>}</For>
        </select>
    </div>
};

export default SelectYearSemester;
