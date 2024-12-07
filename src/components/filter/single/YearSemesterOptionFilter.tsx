import {createEffect, createSignal} from "solid-js";
import {Semester} from "../../../types/graphql";
import SingleOptionFilter from "./SingleOptionFilter";
import {SemesterValues} from "../../../types/enum";

const YearSemesterOptionFilter = (props: {
    // TODO: inherit values and default value from parent.
    onChanged: (year: number, semester: Semester) => any,
}) => {
    let years: number[] = [];
    for (let i = 1972; i <= 2024; i++) years.push(i);

    const [year, setYear] = createSignal(years[years.length - 1]);
    const [semester, setSemester] = createSignal(Semester.Second);

    createEffect(() => {
        props.onChanged(year(), semester());
    });

    return <div style={{
        "display": "flex",
        "justify-content": "space-between",
        "margin-bottom": "2rem",
        width: "100%",
        "gap": "1rem",
    }}>
        <SingleOptionFilter defaultValue={year()} values={years.map(i => ({
            value: i,
            display: `${i}년`,
        }))} onChanged={v => setYear(v)} filterName={"학년도"}></SingleOptionFilter>
        <SingleOptionFilter defaultValue={semester()} values={SemesterValues}
                            onChanged={v => setSemester(v)} filterName={"학기"}></SingleOptionFilter>
    </div>;
};

export default YearSemesterOptionFilter;
