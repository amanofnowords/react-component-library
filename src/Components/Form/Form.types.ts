type initialFormStateTypes = {
    formValues?: Object;
}
type formValues = {
    [key: string] : string;
}
export type FormPropsType = {
    formID: string;
    formAttributes?: Object,
    children?: React.ReactChild[]| React.ReactChild;
    initialFormState?: initialFormStateTypes;
    onSubmit?: Function;
    errorMessage?: string;
    groupErrors?: boolean;

}
export type stateType = {
    errors?: Object;
    formValues?: Object;
    groupErrors?: boolean;
}
