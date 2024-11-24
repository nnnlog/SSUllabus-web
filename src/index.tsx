/* @refresh reload */
import {render} from 'solid-js/web';

import './index.css';
import App from './App';
import 'solid-devtools'
import {HashRouter, Route, Router} from "@solidjs/router";
import searchSubject from "./views/search/SearchSubject";
import searchLectureRoomTable from "./views/SearchLectureRoomTable";

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
    );
}

render(() =>
        <HashRouter root={App}>
            <Route path={"/"} component={searchSubject}/>
            <Route path={"/lecture_room"} component={searchLectureRoomTable}/>
        </HashRouter>,
    root!);
