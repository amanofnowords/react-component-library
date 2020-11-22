import { useState, createElement } from 'react';

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

var css_248z = "";
styleInject(css_248z);

const RadioSelect = ({ options, groupName, optionSelected, selectCallBack }) => {
    const [optionSelectedState, changeOptionSelectedState] = useState(optionSelected);
    const isThisSelected = (value) => {
        return value === optionSelectedState ? true : false;
    };
    const handleClick = (groupName, option) => {
        changeOptionSelectedState(option.value);
        selectCallBack(groupName, option);
    };
    const renderOption = () => {
        return options.map((option, index) => {
            return createElement("div", { className: `radioSelectOption ${isThisSelected(option.value) ? 'selected' : ''}`, key: index, onClick: (e) => handleClick(groupName, option) },
                createElement("input", { type: "radio", id: option.value, name: groupName, checked: isThisSelected(option.value), onChange: () => { } }),
                createElement("label", { htmlFor: option.value }, option.name));
        });
    };
    return createElement("div", null, options ? renderOption() : undefined);
};

const regexOptions = {
    personName: /^[a-zA-Z]+$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    postalCode: /^[a-zA-Z0-9äöüÄÖÜ]*$/
};

var css_248z$1 = "";
styleInject(css_248z$1);

const TextInput = ({ inputID, value, placeholder = 'Please Enter Value', label = 'Text Input: ', containerClassName = '', validate = false, regexType = 'personName', customRegex, errorMessage = 'Error: Please check value', onChangeCallback = undefined, inputAttributes, labelAttributes, errorMessageAttributes }) => {
    const [inputValue, setInputValue] = useState(value);
    /** Takes in a value an checks to make sure it passes */
    const validateInput = (passedValue) => {
        let regex = regexOptions[regexType];
        customRegex ? (regex = customRegex) : regex;
        let isValid = regex.test(passedValue);
        return isValid;
    };
    if (validate === true) {
        var [errorExist, setError] = useState(!validateInput(inputValue));
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
    return (createElement("div", { className: `text-input ${containerClassName}` },
        createElement("label", Object.assign({ htmlFor: inputID }, labelAttributes), label),
        createElement("input", Object.assign({ type: 'text', id: inputID, placeholder: placeholder, value: inputValue }, inputAttributes, { onChange: e => {
                onInputValueChange(e);
            } })),
        errorExist === true && (createElement("p", Object.assign({ className: 'errorMessage' }, errorMessageAttributes), errorMessage))));
};

export { RadioSelect, TextInput };
