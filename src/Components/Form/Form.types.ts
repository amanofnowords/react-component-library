type initialFormStateTypes = {
    formValues?: formValues;
}
type formValues = {
    [key: string] : string;
}
export type FormPropsType = {
    formID: string;
    formAttributes?: Object;
    children?: any | any[];
    initialFormState?: initialFormStateTypes;
    onSubmit?: Function;
    errorMessage?: string;
    groupErrors?: boolean;

}
export type stateType = {
    errors?: Object;
    formValues?: formValues;
    groupErrors?: boolean;
}
