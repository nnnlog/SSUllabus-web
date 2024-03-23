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
    const {initialValue, onChange, text, placeholder, filterName} = props;

    const values = Object.keys(text) as T[];
    const [selectedValue, setSelectedValue] = createSignal(initialValue);

    return <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "font-size": "15px"}}>
        <div>{filterName}</div>
        <div style={{flex: 1,}}>
            <Select
                multiple={true}
                isOptionDisabled={value => selectedValue().includes(value)}
                options={values}
                initialValue={selectedValue()}
                format={(data) => text[data]}
                onChange={v => {
                    setSelectedValue(v);
                    onChange(selectedValue());
                }}
                placeholder={placeholder}
            />
        </div>
    </div>
};

export default FilterOption;
export type {MultiSelectValues};
