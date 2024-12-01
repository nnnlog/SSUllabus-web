import {Accessor, Setter} from "solid-js";
import {Semester} from "../../types/graphql";
import FilterSingleOption from "./legacy/filterSingleOption";
import {SemesterValue, SemesterValues} from "../../types/enum";

const SelectYearSemester = (props: { setYearSemester: Setter<{ year: number; semester: Semester; }>; yearSemester: Accessor<{ year: number, semester: Semester }> }) => {
    let years: number[] = [];
    for (let i = 1972; i <= 2024; i++) years.push(i);

    return <div style={{display: "flex", "flex-direction": "column", flex: 1, "justify-content": "center"}}>
        {/*<select value={props.yearSemester().year.toString()} onChange={event => props.setYearSemester({*/}
        {/*    year: parseInt(event.currentTarget.value),*/}
        {/*    semester: props.yearSemester().semester,*/}
        {/*})}>*/}
        {/*    <For each={years}>{(year) => <option value={year}>{year}년</option>}</For>*/}
        {/*</select>*/}
        {/*<select style={{"margin-top": ".3rem"}} value={props.yearSemester().semester} onChange={event => props.setYearSemester({*/}
        {/*    year: props.yearSemester().year,*/}
        {/*    semester: event.currentTarget.value as Semester,*/}
        {/*})}>*/}
        {/*    <For each={SemesterValues}>{(key) => <option value={key}>{SemesterValue[key]}</option>}</For>*/}
        {/*</select>*/}
        <FilterSingleOption
            text={Object.fromEntries(years.map(k => [k, k.toString() + "년"]))}
            initialValue={props.yearSemester().year}
            onChange={(value: number) => {
                value = parseInt(value.toString());
                props.setYearSemester(v => ({
                    year: value,
                    semester: v.semester
                }));
            }}
            filterName={"연도 : "}
        ></FilterSingleOption>
        <FilterSingleOption
            text={Object.fromEntries(SemesterValues.map(k => [k, SemesterValue[k]]))}
            initialValue={props.yearSemester().semester}
            onChange={(value: Semester) => {
                props.setYearSemester(v => ({
                    year: v.year,
                    semester: value
                }));
            }}
            filterName={"연도 : "}
        ></FilterSingleOption>
    </div>
};

export default SelectYearSemester;
