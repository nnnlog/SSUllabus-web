import { Select } from "@thisbeyond/solid-select";
import {createMemo, createSignal} from "solid-js";
import generateRandomString from "../../utils/generateRandomString";

const FilterMultipleOption = <T, >(props: {
    text: any,
    initialValue: T[],
    onChange: (selected: T[]) => any,

    filterName: string,
    placeholder: string,
}) => {
    const [selectedValue, setSelectedValue] = createSignal(props.initialValue);
    const [input, setInput] = createSignal("");

    const values = createMemo(() => (Object.keys(props.text) as T[]).filter(k => !selectedValue().includes(k) && (input().length === 0 || props.text[k].includes(input()))).sort((a, b) => props.text[a].localeCompare(props.text[b])));

    const id = generateRandomString(5);

    return <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "font-size": "15px"}}>
        <label for={id}>{props.filterName}</label>
        <div style={{flex: 1,}}>
            <Select
                id={id}
                multiple={true}
                isOptionDisabled={value => selectedValue().includes(value)}
                options={values()}
                initialValue={selectedValue()}
                format={(data) => props.text[data]}
                onChange={v => {
                    setSelectedValue(v);
                    props.onChange(selectedValue());
                }}
                placeholder={props.placeholder}
                readonly={false}
                onInput={v => setInput(v)}
            />
        </div>
    </div>
};

export default FilterMultipleOption;
