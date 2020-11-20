
export type Option = {
    name: string;
    value: string;
}
export type RadioSelectProps = {
    options: Option[];
    groupName: string;
    optionSelected: string;
    selectCallBack: Function;
}

