import { Select } from "@thisbeyond/solid-select";
import {createSignal} from "solid-js";

type MultiSelectValues<T> = {
   value: T,
   text: string,
};

const FilterOption = <T, >(props: {
    text: any,
    initialValue: T[],
    onChange: (selected: T[]) => any,

    filterName: string,
    placeholder: string,
}) => {
    const {initialValue, onChange, placeholder, filterName} = props;

    // let values = Object.keys(text) as T[];

    // const values = Object.keys(text) as T[];
    const [selectedValue, setSelectedValue] = createSignal(initialValue);
    const [input, setInput] = createSignal("");

    return <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "font-size": "15px"}}>
        <div>{filterName}</div>
        <div style={{flex: 1,}}>
            <Select
                multiple={true}
                isOptionDisabled={value => selectedValue().includes(value)}
                options={(Object.keys(props.text) as T[]).filter(k => !selectedValue().includes(k) && (input().length === 0 || props.text[k].includes(input())))}
                initialValue={selectedValue()}
                format={(data) => props.text[data]}
                onChange={v => {
                    setSelectedValue(v);
                    onChange(selectedValue());
                }}
                placeholder={placeholder}
                readonly={false}
                onInput={v => setInput(v)}
            />
        </div>
    </div>
};

export default FilterOption;
export type {MultiSelectValues};
