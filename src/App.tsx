import {Component, createSignal, For} from 'solid-js';
import "@thisbeyond/solid-select/style.css";
import SelectYearSemester from "./components/SelectYearSemester";
import {createStore} from "solid-js/store";

const App: Component = () => {
    let [yearSemester, setYearSemester] = createSignal({
        year: 2024,
        semester: "1학기"
    });

    let [keywords, setKeywords] = createStore([] as string[]);

    return (
        <div style={{width: "90%", margin: "3rem auto 0 auto"}}>
            <div style={{display: "flex", "justify-content": "space-between", "border-bottom": "1px solid black", "padding-bottom": "1rem"}}>
                <SelectYearSemester setYearSemester={setYearSemester} yearSemester={yearSemester}></SelectYearSemester>
                <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "flex-direction": "column", flex: 1, "align-self": "start"}}>
                    <div style={{display: "flex", "justify-content": "space-between", "margin-left": "1rem", width: "100%", "align-self": "start"}}>
                        <div style={{"margin-right": "0.3rem"}}>검색어 :</div>
                        <input id={"search"} placeholder={"검색어 키워드를 입력하세요. (과목명, 과목코드, 교수명 대상 검색)"} style={{flex: 1,}} onkeyup={event => {
                            if (event.code !== "Enter") return;
                            if (keywords.includes(event.currentTarget.value)) return;
                            setKeywords([...keywords, event.currentTarget.value]);
                            event.currentTarget.value = "";
                        }}/>
                    </div>
                    <div style={{display: "flex", "align-self": "flex-start", "margin-left": "1rem"}}>
                        <For each={keywords}>{(keyword, i) =>
                            <div style={{"margin-right": "1rem"}}>{keyword}</div>
                        }</For>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", "flex-direction": "column", flex: 1, "justify-content": "space-between",}}>
                <div>

                </div>
            </div>
            {yearSemester().year}년도
            {yearSemester().semester}
            {/*<Select options={["apple", "banana", "pear", "pineapple", "kiwi"]} multiple={true}/>*/}
        </div>
    );
};

export default App;
