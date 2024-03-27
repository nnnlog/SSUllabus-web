import { Select } from "@thisbeyond/solid-select";
import {createMemo, createSignal} from "solid-js";

const BooleanOption = (props: {
    initialValue: undefined | boolean,
    onChange: (selected: number) => any,
    filterName: string,
}) => {
    const values = {
        1: "모두",
        2: "Y",
        3: "N",
    };

    const [selectedValue, setSelectedValue] = createSignal<keyof typeof values>(props.initialValue === undefined ? 1 : (props.initialValue ? 2 : 3));

    return <div style={{display: "flex", "justify-content": "space-between", "align-items": "center", "font-size": "15px"}}>
        <div>{props.filterName}</div>
        <div style={{flex: 1,}}>
            <Select
                isOptionDisabled={value => selectedValue() === value}
                options={Object.keys(values)}
                initialValue={selectedValue()}
                format={(data) => values[data as keyof typeof values]}
                onChange={v => {
                    if (v === null) return;
                    setSelectedValue(v);
                    props.onChange(selectedValue());
                }}
            />
        </div>
    </div>
};

export default BooleanOption;
