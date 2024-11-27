import {Accessor, Component, createEffect, createMemo, createSignal, onCleanup, onMount, Show} from "solid-js";
import {CurrentSemesterDataQuery, LectureRoomTimeTable, LectureRoomTimeTableQueryVariables, Semester, Subject, SubjectsSimpleQuery} from "../types/graphql";
import {getCurrentSemesterData, getLectureRoomTimeTable, getSubjectsSimple} from "../graphql";
import SelectYearSemester from "../components/filter/SelectYearSemester";
import FilterSingleOption from "../components/filter/filterSingleOption";

const SearchSubject: Component = () => {
    const [yearSemester, setYearSemester] = createSignal<{
        year: number,
        semester: Semester
    }>({
        year: 2024,
        semester: Semester.First
    });

    const [building, setBuilding] = createSignal("");
    const [lectureRoom, setLectureRoom] = createSignal("");

    const place = createMemo(() => [[building(), lectureRoom()].join(" ")]);

    const query = createMemo<LectureRoomTimeTableQueryVariables>(() => ({
        year: yearSemester().year,
        semester: yearSemester().semester,
        place: place(),
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

    const lectureRoomBuilding = createMemo(() => {
        let data = currentSemesterData().lecture_rooms;
        data = Array.from(new Set(data.map(a => a.split(" ")[0])));
        return data.reduce((a, b) => ({...a, [b]: b}), {});
    });

    const lectureRooms = createMemo(() => {
        let data = currentSemesterData().lecture_rooms;
        data = Array.from(new Set(data.filter(a => a.split(" ")[0] === building()).map(a => a.split(" ").slice(1).join(" "))));
        return data.reduce((a, b) => ({...a, [b]: b}), {});
    });

    createEffect(fetchCurrentSemesterData, yearSemester());

    const [data, setData] = createSignal<LectureRoomTimeTable[]>([]);
    const [subjectsData, setSubjectsData] = createSignal<SubjectsSimpleQuery>();
    const subjectsDataKey: Accessor<{ [name: string]: Subject }> = createMemo(() => subjectsData()?.subject?.reduce((a, b) => ({
        ...a,
        [b.code]: b
    }), {}) ?? {});

    let canvas: HTMLCanvasElement | undefined;
    const draw = () => {
        if (canvas === undefined) return;
        if (Object.values(subjectsDataKey()).length === 0) return;

        let startTime = 1e4;
        let endTime = 0;

        data().forEach(({time_start, time_end}) => {
            let start = parse(time_start), end = parse(time_end);
            startTime = Math.min(startTime, start);
            endTime = Math.max(endTime, end);
        });

        const pixelsPerMinute = 1;

        canvas.width = window.innerWidth * 0.8;
        canvas.height = (endTime - startTime + 1) * pixelsPerMinute + 100 + 50;

        let order: { [key: string]: number } = {"일": 0, "월": 1, "화": 2, "수": 3, "목": 4, "금": 5, "토": 6};

        let idx = 0;
        let colors = [
            "#072448", "#3e4491", "#ffcb00", "#f8aa4b", "#ff6150",
            "#e74645", "#fb7756", "#facd60", "#cac751", "#1ac0c6",
            "#f9b4ab", "#fdebd3", "#264e70", "#679186", "#679186",
        ];
        let colorTable: { [key: string]: string } = {};

        let ctx = canvas.getContext("2d")!;

        ctx.fillStyle = "rgba(0, 0, 0, .5)";
        ctx.font = "20px Pretendard";
        for (let k in order) {
            ctx.fillText(k, (canvas.width - 200) / 7 * order[k] + 100 + (canvas.width - 200) / 7 / 2 - 10, 80);
        }

        // for (let i = 1; i < 7; i++) {
        //     ctx.beginPath();
        //     ctx.moveTo((canvas.width - 200) / 7 * i + 100, 100);
        //     ctx.lineTo((canvas.width - 200) / 7 * i + 100, canvas.height - 50);
        //     ctx.stroke();
        // }

        const drawTime = (i: number) => {
            if (!(startTime <= i && i <= endTime)) return;

            ctx.beginPath();
            ctx.moveTo(100, (i - startTime) * pixelsPerMinute + 100);
            ctx.lineTo((canvas.width - 100), (i - startTime) * pixelsPerMinute + 100);
            ctx.stroke();

            ctx.fillText(
                `${Math.floor(i / 60).toString().padStart(2, "0")}시 ${i % 60 === 0 ? "" : `${(i % 60).toString().padStart(2, "0")}분`}`,
                30,
                (i - startTime) * pixelsPerMinute + 5 + 100,
            );

            ctx.fillText(
                `${Math.floor(i / 60).toString().padStart(2, "0")}시 ${i % 60 === 0 ? "" : `${(i % 60).toString().padStart(2, "0")}분`}`,
                canvas.width - 70,
                (i - startTime) * pixelsPerMinute + 5 + 100,
            );
        }

        ctx.font = "15px Pretendard";
        for (let i = 0; i < 60 * 24; i += 60) drawTime(i);

        if (startTime % 60 > 0) drawTime(startTime);
        if (endTime % 60 > 0) drawTime(endTime);

        data().forEach(({time_start, time_end, day, code}) => {
            let {name, professor} = subjectsDataKey()[code] as Subject;
            let start = parse(time_start), end = parse(time_end);

            if (!(code in colorTable)) colorTable[code] = colors[idx++ % colors.length];

            ctx.fillStyle = colorTable[code];
            ctx.fillRect(
                ((canvas.width - 200) / 7 * order[day]) + 100,
                (start - startTime) * pixelsPerMinute + 100,
                (canvas.width - 200) / 7,
                (end - start + 1) * pixelsPerMinute,
            );

            ctx.fillStyle = "white";
            ctx.font = "20px Pretendard";
            ctx.fillText(
                name,
                ((canvas.width - 200) / 7 * order[day]) + 5 + 100,
                (start - startTime) * pixelsPerMinute + pixelsPerMinute + 20 + 100,
                (canvas.width - 200) / 7 - 20
            );
            ctx.font = "13px Pretendard";
            ctx.fillText(
                professor ?? "",
                ((canvas.width - 200) / 7 * order[day]) + 7 + 100,
                (start - startTime) * pixelsPerMinute + 20 + 18 + 100,
                (canvas.width - 200) / 7 - 20
            );
        });
    };

    createEffect(async () => {
        if (place()[0].trim() === "") return;

        setData(
            (await getLectureRoomTimeTable(query())).lecture_room_timetable.find(a => a.place === query().place[0])?.value ?? []
        );

        setSubjectsData(await getSubjectsSimple({
            year: yearSemester().year,
            semester: yearSemester().semester,
            code: data().map(a => a.code)
        }));

        draw();
    });

    const parse = (a: string) => {
        let [b, c] = a.split(":");
        return parseInt(b) * 60 + parseInt(c);
    };

    onMount(() => window.addEventListener("resize", draw, false));
    onCleanup(() => window.removeEventListener("resize", draw));

    return (
        <div style={{width: "90%", margin: "3rem auto 0 auto"}}>
            <div style={{display: "flex", "justify-content": "space-between", "border-bottom": "1px solid black", "padding-bottom": "1rem"}}>
                <SelectYearSemester setYearSemester={setYearSemester} yearSemester={yearSemester}></SelectYearSemester>
            </div>
            <div style={{display: "flex", "flex-direction": "column", flex: 1, "justify-content": "space-between",}}>
                <FilterSingleOption
                    text={lectureRoomBuilding()}
                    initialValue={building()}
                    onChange={v => {
                        if (v === null) setBuilding("");
                        else setBuilding(v);
                    }}
                    placeholder={"강의실 건물을 선택하세요."}
                    filterName={"건물 : "}
                ></FilterSingleOption>
                <FilterSingleOption
                    text={lectureRooms()}
                    initialValue={lectureRoom()}
                    onChange={v => {
                        if (v === null) setLectureRoom("");
                        else setLectureRoom(v);
                    }}
                    placeholder={"강의실을 선택하세요."}
                    filterName={"강의실 : "}
                ></FilterSingleOption>
            </div>
            <Show when={data() !== null}>
                <canvas ref={canvas}></canvas>
            </Show>
        </div>
    );
};

export default SearchSubject;
