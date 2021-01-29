
import * as React from 'react';
import { TextInputProps } from './TextInput.types.js';
import { UserEvent } from '../../resources/types';
import { returnTypeOfValidation, isThisValueValid, isThisValueValidType } from '../../resources/handleValidationOptions';
import { GlobalContext } from '../Form/index';
import '../../main.scss';
import './TextInput.scss';

const TextInput: React.FC<TextInputProps> = ({
    componentID,
    children,
    value = '',
    placeholder = 'Please Enter Value',
    label = "Text Input:",
    name = label,
    containerClassName = '',
    regexType = 'personName',
    customRegex,
    errorMessage = 'Error: Please Check Value',
    onChangeCallback = undefined,
    inputAttributes,
    labelAttributes,
    errorMessageAttributes,
    validate = true,
    optional = false,
}) => {
    if (componentID == '' || componentID == undefined) {
        console.warn('componentID for TextInput component should be set. Without it data may not be tracked correctly')
    }

    // Initialization 

    /** If GlobalContext (Form State) has been initiated, this represents the GlobalContext Object. Default is empty object */
    const Context: Record<string, any> = React.useContext(GlobalContext)

    /** An IFFE is ran to check if the component exists within a context. The result is stored in the variable */
    const isThisASmartComponent: boolean = ((): boolean => {
        return Object.keys(Context).length >= 1 ? true : false
    })()

    const [renderCount, setRenderCount] = React.useState<number>(1)

    let regex: string | RegExp = regexType
    customRegex ? (regex = customRegex) : regex;


    let typeOfValidation: keyof isThisValueValidType = returnTypeOfValidation(optional, validate);

    // Functions

    const handleUpdatingState: Function = (value: React.ReactText, isThisValid: boolean): void => {
        if (isThisASmartComponent) {
            // if this is a smart component update Global Context
            let passedValues: Object = {
                errors: { ...Context.errors, [componentID]: !isThisValid },
                formValues: { ...Context.formValues, [componentID]: value }
            }
            Context.updateState({ ...passedValues })
        } else {
            setInputValue(value);
            setError(!isThisValid);
        }
    }

    if (isThisASmartComponent) {

        /** The value for this input. It's default is set to an empty string. Relies on internal state as source of truth unless the component is placed within a form's Context. If a Context exist then that would be the source of truth. */
        var inputValue: string | number = Context.formValues[componentID] === undefined ? value : Context.formValues[componentID];


        if (renderCount === 1) {
            typeOfValidation = 'acceptBlanks';
        }

        let doesTheParentHaveAnError: boolean = Context.errors[componentID] === true ? Context.errors[componentID] : false;

        let isCurrentValueValid: boolean = isThisValueValid[typeOfValidation](inputValue, regex);

        React.useEffect(() => {
            if (!isCurrentValueValid && !doesTheParentHaveAnError) {
                handleUpdatingState(inputValue, isCurrentValueValid);
            }
        })

        /** Boolean that let's the component know if an error exists based on the current validation settings. If a Context exists then that would be the source of truth */

        var errorExist: boolean;
        if (doesTheParentHaveAnError || !isCurrentValueValid) {
            errorExist = true

        } else {
            errorExist = false;
        }

    } else {
        var [inputValue, setInputValue] = React.useState<string | number>(value);
        if (validate === true && (renderCount <= 1 && inputValue === '')) {
            var [errorExist, setError] = React.useState<boolean>(false);
        } else if (validate === true) {
            var [errorExist, setError] = React.useState<boolean>(!isThisValueValid.default(inputValue, regex));
        }
    }

    const onInputValueChange: Function = (e: UserEvent) => {

        if ((e.target.value !== inputValue) || inputValue == '') {
            setRenderCount(renderCount + 1)

            handleUpdatingState(e.target.value, isThisValueValid[typeOfValidation](e.target.value, regex));

            // If user provides onChangeCallback function, we pass information to their function.
            if (onChangeCallback !== undefined) {
                type Params = {
                    event: object;
                    value: string | number;
                    validate: boolean | undefined;
                };
                let params: Params = {
                    event: e,
                    value: e.target.value,
                    validate: validate ? isThisValueValid[typeOfValidation](e.target.value, regex) : undefined,
                };
                onChangeCallback(params);
            }
        }
    };

    return (
        <div className={`text-input ${containerClassName} ${errorExist ? 'error' : ''}`}
            onBlur={e => onInputValueChange(e)}>
            {label !== null && <label htmlFor={componentID} {...labelAttributes}>
                {label}
            </label>
            }
            <input
                type="text"
                id={componentID}
                placeholder={placeholder}
                value={inputValue}
                {...inputAttributes}
                onChange={(e) => {
                    onInputValueChange(e);
                }}
            />
            {children}
            {(errorExist === true && !Context.groupErrors) && (
                <p className="errorMessage" {...errorMessageAttributes}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export { TextInput };
