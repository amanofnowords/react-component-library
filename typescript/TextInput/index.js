"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
const React = __importStar(require("react"));
const regexOptions = {
    personName: /^[a-zA-Z]+$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    postalCode: /^[a-zA-Z0-9äöüÄÖÜ]*$/
};
const TextInput = ({ inputID, value, placeholder = 'Please Enter Value Here', label = 'Text Input: ', containerClassName = '', validate = false, regexType = 'personName', customRegex, errorMessage = 'Error: Please check value', onChangeCallback = undefined, inputAttributes, labelAttributes, errorMessageAttributes }) => {
    const [inputValue, setInputValue] = React.useState(value);
    /** Takes in a value an checks to make sure it passes */
    const validateInput = (passedValue) => {
        let regex = regexOptions[regexType];
        customRegex ? (regex = customRegex) : regex;
        let isValid = regex.test(passedValue);
        return isValid;
    };
    if (validate === true) {
        var [errorExist, setError] = React.useState(!validateInput(inputValue));
    }
    const onInputValueChange = (e) => {
        setInputValue(e.target.value);
        let isValid = validateInput(e.target.value);
        // Validation check 
        if (validate === true) {
            setError(!isValid);
        }
        if (onChangeCallback !== undefined) {
            let params = {
                event: e,
                value: e.target.value,
                validate: validate ? isValid : undefined,
            };
            onChangeCallback(params);
        }
    };
    return (React.createElement("div", { className: `text-input ${containerClassName}` },
        React.createElement("label", Object.assign({ htmlFor: inputID }, labelAttributes), label),
        React.createElement("input", Object.assign({ type: 'text', id: inputID, placeholder: placeholder, value: inputValue }, inputAttributes, { onChange: e => {
                onInputValueChange(e);
            } })),
        errorExist === true && (React.createElement("p", Object.assign({ className: 'errorMessage' }, errorMessageAttributes), errorMessage))));
};
exports.TextInput = TextInput;
