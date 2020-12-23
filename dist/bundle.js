'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "* {\n  box-sizing: border-box;\n  font-family: Arial, sans-serif;\n  font-size: 16px; }\n";
styleInject(css_248z);

var css_248z$1 = ".radioSelectOption {\n  padding: 10px;\n  width: fit-content;\n  border-bottom: 1px solid black; }\n  .radioSelectOption input,\n  .radioSelectOption label {\n    cursor: pointer; }\n    .radioSelectOption input:hover,\n    .radioSelectOption label:hover {\n      font-size: 1.1em; }\n  .radioSelectOption input {\n    display: none; }\n  .radioSelectOption.selected {\n    border: 1px solid black; }\n";
styleInject(css_248z$1);

const RadioSelect = ({ title = 'Select Option Below', options = [
    { name: 'Default Option 1', value: 'defaultOption1' },
    { name: 'Default Option 2', value: 'defaultOption2' },
    { name: 'Default Option 3', value: 'defaultOption3' }
], groupName, optionSelected, selectCallback, containerClassName = 'radioSelectWrapper' }) => {
    // Initialize option selected state
    const [optionSelectedState, changeOptionSelectedState] = React.useState(optionSelected);
    // Function to compare and check if an option has been selected
    const isThisSelected = (value) => {
        return value === optionSelectedState ? true : false;
    };
    // Click Handler
    const handleClick = (groupName, option) => {
        changeOptionSelectedState(option.value);
        selectCallback(groupName, option);
    };
    const renderOption = () => {
        return options.map((option, index) => {
            return React.createElement("div", { className: `radioSelectOption ${isThisSelected(option.value) ? 'selected' : ''}`, key: index, onClick: (e) => handleClick(groupName, option) },
                React.createElement("input", { type: "radio", id: option.value, name: groupName, checked: isThisSelected(option.value), onChange: () => { } }),
                React.createElement("label", { htmlFor: option.value }, option.name));
        });
    };
    return React.createElement("div", { className: containerClassName },
        React.createElement("p", null, title),
        options ? renderOption() : undefined);
};

const regexOptions = {
    personName: /^[a-zA-Z]+$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    postalCode: /^[a-zA-Z0-9äöüÄÖÜ]*$/,
};

var css_248z$2 = ".text-input {\n  position: relative;\n  width: fit-content; }\n  .text-input input {\n    background-color: white;\n    border: none;\n    border-bottom: 1px solid black;\n    padding: 5px; }\n    .text-input input:focus {\n      border: 1px solid black;\n      outline: none; }\n  .text-input.error input {\n    border: 1px solid red; }\n  .text-input .errorMessage {\n    color: red;\n    text-align: left; }\n";
styleInject(css_248z$2);

const TextInput = ({ inputID, value = '', placeholder = 'Please Enter Value', label = "Text Input:", containerClassName = '', validate = false, regexType = 'personName', customRegex, errorMessage = 'Error: Please Check Value', onChangeCallback = undefined, inputAttributes, labelAttributes, errorMessageAttributes, }) => {
    //** Text Input Value State. Default is empty string */
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
    return (React.createElement("div", { className: `text-input ${containerClassName} ${errorExist ? 'error' : ''}` },
        label !== null && React.createElement("label", Object.assign({ htmlFor: inputID }, labelAttributes), label),
        React.createElement("input", Object.assign({ type: "text", id: inputID, placeholder: placeholder, value: inputValue }, inputAttributes, { onChange: (e) => {
                onInputValueChange(e);
            } })),
        errorExist === true && (React.createElement("p", Object.assign({ className: "errorMessage" }, errorMessageAttributes), errorMessage))));
};

exports.RadioSelect = RadioSelect;
exports.TextInput = TextInput;
