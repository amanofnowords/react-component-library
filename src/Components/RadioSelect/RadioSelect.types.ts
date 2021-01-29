
export type Option = {
    name: string;
    value: string;
}
export type RadioSelectProps = {
    groupName: string;
    title: string;
    options: Option[];
    optionSelected: string;
    selectCallback: Function;
    containerClassName: string;
    smartForm: boolean;
    required: boolean;
}

