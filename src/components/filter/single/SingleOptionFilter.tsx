import {createEffect, createMemo, createSignal, For} from "solid-js";

const SingleOptionFilter = <T extends (string | number | boolean), >(props: {
    filterName: string,

    defaultValue: T,
    values: {
        value: T,
        display: string | undefined | null,
    }[],
    onChanged: (selected: T) => any,
}) => {
    const [selectedValue, setSelectedValue] = createSignal<T>(props.defaultValue);

    const convertToDisplay = (value: {
        value: T,
        display: string | undefined | null,
    }) => (value.display ?? value.value).toString();

    const valueMap = createMemo(() => {
        let obj: {
            [k in string]: { value: T; display: string | undefined | null; } | undefined;
        } = {} as any;

        for (let {value, display} of props.values) {
            obj[value.toString()] = {value, display};
        }

        return obj;
    });

    createEffect(() => {
        console.log(props.filterName, props.values, selectedValue());
    });

    return <div style={{display: "flex", "justify-content": "space-between", flex: 1, "align-items": "center"}}>
        <label for={props.filterName}
               style={{"white-space": "nowrap", "margin-right": "0.5rem"}}>{props.filterName}</label>
        <select value={selectedValue().toString()} onChange={e => {
            setSelectedValue(() => valueMap()[e.currentTarget.value.toString()]!.value);
            props.onChanged(selectedValue());
        }} id={props.filterName}>
            <option disabled={true} value={""}>-- {props.filterName}(을)를 선택하세요. --</option>
            <For each={props.values}>{i => <option
                value={i.value.toString()}>{convertToDisplay(i)}</option>}</For>
        </select>
    </div>;
};

export default SingleOptionFilter;
