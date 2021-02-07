declare type initialFormStateTypes = {
    formValues?: formValues;
};
declare type formValues = {
    [key: string]: string;
};
export declare type FormPropsType = {
    formID: string;
    formAttributes?: Object;
    children?: any | any[];
    initialFormState?: initialFormStateTypes;
    onSubmit?: Function;
    errorMessage?: string;
    groupErrors?: boolean;
};
export declare type stateType = {
    errors?: Object;
    formValues?: formValues;
    groupErrors?: boolean;
};
export {};
