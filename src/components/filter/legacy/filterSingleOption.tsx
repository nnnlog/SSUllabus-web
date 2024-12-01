import { Select } from "@thisbeyond/solid-select";
import {createMemo, createSignal} from "solid-js";

const FilterSingleOption = <T, >(props: {
    text: any,
    initialValue: T,
    onChange: (selected: T) => any,

    filterName: string,
    placeholder: string,
}) => {
    const [selectedValue, setSelectedValue] = createSignal(props.initialValue);
    const [input, setInput] = createSignal("");

    const values = createMemo(() => (Object.keys(props.text) as T[]).filter(k => (input().length === 0 || props.text[k].includes(input()))).sort((a, b) => props.text[a].localeCompare(props.text[b])));
    // const values = createMemo(() => (Object.keys(props.text) as T[]).filter(k => selectedValue() !== k && (input().length === 0 || props.text[k].includes(input()))).sort((a, b) => a.localeCompare(b)));

    return <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "font-size": "15px"}}>
        <div>{props.filterName}</div>
        <div style={{flex: 1,}}>
            <Select
                isOptionDisabled={value => selectedValue() === value}
                options={values()}
                initialValue={selectedValue()}
                format={(data) => props.text[data]}
                onChange={v => {
                    setSelectedValue(v);
                    props.onChange(selectedValue());
                }}
                readonly={false}
                onInput={v => setInput(v)}
                placeholder={props.placeholder}
            />
        </div>
    </div>
};

export default FilterSingleOption;
