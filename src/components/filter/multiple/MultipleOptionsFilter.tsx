import {createMemo, createSignal, For, Show} from "solid-js";
import {Portal} from "solid-js/web";
import overlayStyles from "../../common/Modal.module.css";
import styles from "./MultipleOptionsFilter.module.css";
import {Icon} from "@iconify-icon/solid";

const MultipleOptionsFilter = <T extends (string | number | boolean), >(props: {
    filterName: string,

    defaultValues: T[],
    values: {
        value: T,
        display: string | undefined | null,
    }[],
    onChanged: (selected: T[]) => any,
}) => {
    const [selectedValue, setSelectedValue] = createSignal(props.defaultValues ?? []);

    const [showingModal, setShowingModal] = createSignal(false);
    const [input, setInput] = createSignal("");

    const convertToDisplay = (value: {
        value: T,
        display: string | undefined | null,
    }) => (value.display ?? value.value).toString();

    const valueMap = createMemo(() => {
        let obj: {
            [k in string]: {
            value: T,
            display: string | undefined | null,
        } | undefined;
        } = {} as any;

        for (let {value, display} of props.values) {
            obj[value.toString()] = {value, display};
        }

        return obj;
    });

    const selectedValueSet = createMemo(() => {
        let set = new Set<T>();

        for (let value of selectedValue()) {
            set.add(value);
        }

        return set;
    });

    const showingSelectedValues = createMemo(() => {
            let values = selectedValue().map(k => valueMap()[k.toString()]!).map(convertToDisplay).filter(v => v.includes(input()));
            if (values.length === 0) return "(없음)";
            if (values.length === props.values.length) return "(전체)";
            return values.join(", ");
        }
    );

    const showingSelectedValuesStyle = createMemo(() => {
        let values = selectedValue().map(k => valueMap()[k.toString()]!).map(convertToDisplay).filter(v => v.includes(input()));
        if (values.length === 0) return {"color": "gray", "font-style": "italic"};
        if (values.length === props.values.length) return {"color": "gray", "font-style": "italic"};
        return {};
    });

    const closeModal = () => {
        setShowingModal(false);
        props.onChanged(selectedValue());
    };

    return <>
        <div onclick={() => setShowingModal(true)}
             style={{cursor: "pointer", "max-width": "25rem", display: "flex", "align-items": "center", "align-content": "center"}}>
            <Icon icon={"material-symbols:filter-alt-outline"} class={styles.filterIcon}></Icon>
            <div style={{"margin-right": ".2rem", "white-space": "nowrap", width: "fit-content"}}>
                {props.filterName} :
            </div>
            <div style={showingSelectedValuesStyle()} class={styles.result}>
                {showingSelectedValues()}
            </div>
        </div>
        <Show when={showingModal()}>
            <Portal>
                <div class={overlayStyles.overlay} onClick={() => closeModal()}></div>
                <div classList={{[overlayStyles.popup]: true, [styles.popup]: true}}>
                    <div style={{"font-size": "22px", "font-weight": "bold", "margin-bottom": "1rem"}}>
                        {props.filterName}
                    </div>
                    <div class={styles.allOptions}>
                        <button onclick={() => {
                            setSelectedValue(props.values.map(v => v.value));
                        }}>전체 선택
                        </button>
                        <button onclick={() => {
                            setSelectedValue([]);
                        }}>전체 해제
                        </button>
                        <button onclick={() => {
                            setSelectedValue(props.defaultValues ?? []);
                        }}>기본값으로
                        </button>
                    </div>
                    <div class={styles.searchBox}>
                        <For each={props.values.filter(v => convertToDisplay(v).includes(input()))}>
                            {value =>
                                <div onClick={() => {
                                    if (!selectedValueSet().has(value.value)) {
                                        setSelectedValue([...selectedValue(), value.value]);
                                    } else {
                                        setSelectedValue(selectedValue().filter(v => v !== value.value));
                                    }
                                }} style={{"cursor": "pointer", "display": "flex"}}>
                                    <input type={"checkbox"} checked={selectedValueSet().has(value.value)}
                                           style={{"margin-right": ".3rem"}}/>
                                    <div class={styles.option}>{convertToDisplay(value)}</div>
                                </div>
                            }
                        </For>
                    </div>
                    <input class={styles.input} type={"text"} value={input()} placeholder={"검색할 옵션을 입력하세요."}
                           onInput={(e) => setInput(e.currentTarget.value)}/>
                    <button class={styles.close} onclick={() => closeModal()}>닫기</button>
                </div>
            </Portal>
        </Show>
    </>;
    // return <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "font-size": "15px"}}>
    //     <div style={{display: "flex", "flex-wrap": "wrap"}}>
    //         <For each={selectedValue()}>{(value, i) =>
    //             <div style={{
    //                 "background-color": "#f0f0f0",
    //                 "border-radius": "5px",
    //                 "padding": "0.5rem",
    //                 "margin": "0.5rem",
    //                 "display": "flex",
    //                 "align-items": "center",
    //             }}>
    //                 <span>{(props.values.find(v => v.value === value)?.display ?? value).toString()}</span>
    //                 <button style={{"margin-left": "0.5rem"}} onClick={() => setSelectedValue(selectedValue().filter(v => v !== value))}>X</button>
    //             </div>
    //         }</For>
    //         <input type="text" placeholder={props.placeholder} value={input()} onInput={(e) => setInput(e.currentTarget.value)}/>
    //         <div style={{
    //             "position": "absolute",
    //             "background-color": "white",
    //             "border": "1px solid #ddd",
    //             "border-radius": "5px",
    //             "padding": "0.5rem",
    //             "z-index": 100,
    //             "width": "100%",
    //             "max-height": "300px",
    //             "overflow-y": "auto",
    //         }}>
    //             <For each={showingValues()}>{(value, i) =>
    //                 <div style={{"padding": "0.5rem", "cursor": "pointer"}} onClick={() => {
    //                     setSelectedValue([...selectedValue(), value.value]);
    //                     setInput("");
    //                 }}>{value.display ?? value.value}</div>
    //             }</For>
    //         </div>
    //     </div>
    //     <button onClick={() => props.onChanged(selectedValue())}>적용</button>
    // </div>
};

export default MultipleOptionsFilter;
