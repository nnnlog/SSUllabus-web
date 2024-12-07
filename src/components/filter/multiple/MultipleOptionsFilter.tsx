import {createEffect, createMemo, createSignal, For, Show} from "solid-js";
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

    createEffect(() => {
        setSelectedValue(props.defaultValues ?? []);
    });

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
            if (values.length === props.values.length) return "(전체)";
            if (values.length === 0) return "(없음)";
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
             style={{
                 cursor: "pointer",
                 display: "flex",
                 "align-items": "center",
                 "align-content": "center",
             }}>
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
                           onInput={(e) => setInput(e.currentTarget.value)}
                           autofocus={true}/>
                    <button class={styles.close} onclick={() => closeModal()}>닫기</button>
                </div>
            </Portal>
        </Show>
    </>;
};

export default MultipleOptionsFilter;
