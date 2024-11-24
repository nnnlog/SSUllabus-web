import {A, RouteSectionProps} from "@solidjs/router";
import "@thisbeyond/solid-select/style.css";

import styles from "./App.module.css"

const App = (props: RouteSectionProps) => {
    return <>
        <main>
            <h1 class={styles.title}>SSULLABUS</h1>
            <div class={styles["main-wrapper"]}>
                <div class={styles.container}>
                    <section class={styles.links}>
                        <h2><A href={"/"}>과목 조회</A></h2>
                        <h2><A href={"/lecture_room"}>강의실별 시간표 조회</A></h2>
                    </section>
                    <hr style="border-style: dashed; border-color: gray; border-width: 1px; width: 100%; margin: 10px auto;"/>
                    {props.children}
                </div>
            </div>
        </main>
    </>;
};

export default App;
