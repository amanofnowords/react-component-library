import * as React from 'react';
import { TextInputProps } from './TextInput.types.js';
import { UserEvent } from '../resources/types';
import { regexOptions } from '../resources/regExp';
import '../main.scss';
import './TextInput.scss';

const TextInput: React.FC<TextInputProps> = ({
    inputID,
    value = '',
    placeholder = 'Please Enter Value',
    label = "Text Input:",
    containerClassName = '',
    validate = false,
    regexType = 'personName',
    customRegex,
    errorMessage = 'Error: Please Check Value',
    onChangeCallback = undefined,
    inputAttributes,
    labelAttributes,
    errorMessageAttributes,
}) => {

    //** Text Input Value State. Default is empty string */
    const [inputValue, setInputValue] = React.useState<string | number>(value);

    /** Takes in a value an checks to make sure it passes */
    const validateInput: Function = (passedValue: string | number): boolean => {
        let regex = regexOptions[regexType];
        customRegex ? (regex = customRegex) : regex;
        let isValid: boolean = regex.test(passedValue);
        return isValid;
    };

    if (validate === true) {
        var [errorExist, setError] = React.useState<boolean>(!validateInput(inputValue));
    }
    const onInputValueChange: Function = (e: UserEvent) => {
        setInputValue(e.target.value);
        let isValid: boolean = validateInput(e.target.value);

        // Validation check
        if (validate === true) {
            setError(!isValid);
        }
        if (onChangeCallback !== undefined) {
            type Params = {
                event: object;
                value: string | number;
                validate: boolean | undefined;
            };
            let params: Params = {
                event: e,
                value: e.target.value,
                validate: validate ? isValid : undefined,
            };
            onChangeCallback(params);
        }
    };

    return (
        <div className={`text-input ${containerClassName} ${errorExist ? 'error' : ''}`}>
            {label !== null && <label htmlFor={inputID} {...labelAttributes}>
                {label}
            </label>
            }
            <input
                type="text"
                id={inputID}
                placeholder={placeholder}
                value={inputValue}
                {...inputAttributes}
                onChange={(e) => {
                    onInputValueChange(e);
                }}
            />

            {errorExist === true && (
                <p className="errorMessage" {...errorMessageAttributes}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export { TextInput };
