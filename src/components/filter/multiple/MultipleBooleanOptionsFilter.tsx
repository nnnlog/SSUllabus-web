import MultipleOptionsFilter from "./MultipleOptionsFilter";

const MultipleBooleanOptionsFilter = (props: {
    filterName: string,

    defaultValues: boolean[],
    onChanged: (selected: boolean[]) => any,
}) => {
    return <MultipleOptionsFilter filterName={props.filterName} defaultValues={props.defaultValues} values={[
        {value: true, display: "Y"},
        {value: false, display: "N"},
    ]} onChanged={props.onChanged}/>;
};

export default MultipleBooleanOptionsFilter;
