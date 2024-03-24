import {Component} from 'solid-js';
import {Route, Router, RouteSectionProps} from "@solidjs/router";
import "@thisbeyond/solid-select/style.css";

import "./App.module.css"
import searchSubject from "./views/SearchSubject";

const App = (props: RouteSectionProps) => {
    return <>
        <div>
            <a href={"/"}>과목 조회</a>
            <a href={"/lecture_room"}>강의실별 시간표 조회</a>
        </div>
        {props.children}
    </>;
};

export default App;
