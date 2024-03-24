import {Component, createEffect, createMemo, createSignal, Show} from "solid-js";
import {CurrentSemesterDataQuery, LectureRoomTimeTable, LectureRoomTimeTableQueryVariables, Semester} from "../types/graphql";
import {getCurrentSemesterData, getLectureRoomTimeTable} from "../graphql";
import SelectYearSemester from "../components/filter/SelectYearSemester";
import FilterMultipleOption from "../components/filter/filterMultipleOption";
import {SemesterValue} from "../types/enum";
import FilterSingleOption from "../components/filter/filterSingleOption";

const SearchSubject: Component = () => {
    const [yearSemester, setYearSemester] = createSignal<{
        year: number,
        semester: Semester
    }>({
        year: 2024,
        semester: Semester.First
    });

    const [place, setPlace] = createSignal("");

    const query = createMemo<LectureRoomTimeTableQueryVariables>(() => ({
        year: yearSemester().year,
        semester: yearSemester().semester,
        place: [place()],
    }));

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

    const lectureRooms = createMemo(() => {
        return currentSemesterData().lecture_rooms.reduce((a, b) => ({...a, [b]: b}), {});
    });

    createEffect(fetchCurrentSemesterData, [yearSemester()]);

    const [data, setData] = createSignal<LectureRoomTimeTable[]>([]);
    createEffect(
        async () => setData(
            (await getLectureRoomTimeTable(query())).lecture_room_timetable.find(a => a.place === place())?.value ?? []
        ), [query()]);

    return (
        <div style={{width: "90%", margin: "3rem auto 0 auto"}}>
            <div style={{display: "flex", "justify-content": "space-between", "border-bottom": "1px solid black", "padding-bottom": "1rem"}}>
                <SelectYearSemester setYearSemester={setYearSemester} yearSemester={yearSemester}></SelectYearSemester>
            </div>
            {/*filter in here*/}
            <div style={{display: "flex", "flex-direction": "column", flex: 1, "justify-content": "space-between",}}>
                <FilterSingleOption
                    text={lectureRooms()}
                    initialValue={query().place[0] ?? ""}
                    onChange={v => {
                        if (v === null) setPlace("");
                        else setPlace(v);
                    }}
                    placeholder={"강의실을 선택하세요."}
                    filterName={"강의실 : "}
                ></FilterSingleOption>
            </div>
            <div>
                Showing information about {yearSemester().year}년도 {SemesterValue[yearSemester().semester]}
            </div>
            <Show when={data() !== null}>
                <div>
                    {JSON.stringify(data())}
                </div>
            </Show>
        </div>
    );
};

export default SearchSubject;
