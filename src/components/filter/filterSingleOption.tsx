import { Select } from "@thisbeyond/solid-select";
import {createSignal} from "solid-js";

const FilterSingleOption = <T, >(props: {
    text: any,
    initialValue: T,
    onChange: (selected: T) => any,

    filterName: string,
    placeholder: string,
}) => {
    const {initialValue, onChange, placeholder, filterName} = props;

    const [selectedValue, setSelectedValue] = createSignal(initialValue);
    const [input, setInput] = createSignal("");

    return <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "font-size": "15px"}}>
        <div>{filterName}</div>
        <div style={{flex: 1,}}>
            <Select
                isOptionDisabled={value => selectedValue() === value}
                options={(Object.keys(props.text) as T[]).filter(k => selectedValue() !== k && (input().length === 0 || props.text[k].includes(input())))}
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

export default FilterSingleOption;
