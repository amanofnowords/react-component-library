import { createContext, useReducer, createElement, useContext, useState, useEffect } from 'react';

const regexOptions = {
    personName: /^[a-zA-Z-]+$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    postalCode: /^[a-zA-Z0-9äöüÄÖÜ]*$/,
};

// Add Logic to accept Arrays<string>
const returnTypeOfValidation = (optionalBoolean, validateBoolean) => {
    if (optionalBoolean === true && validateBoolean == false) {
        return 'returnTrue';
    }
    else if (optionalBoolean === true && validateBoolean == true) {
        // Allow Blanks
        // Validate if value is not blank
        return 'acceptBlanks';
    }
    else if (optionalBoolean === false && validateBoolean == false) {
        // Required value, 
        // Do not validate
        return 'doesAValueExist';
    }
    else {
        // Catch All - An input value is required & will be validated. 
        return 'default';
    }
};
// Check value, let us know if is valid or not
const isThisValueValid = {
    returnTrue: (value, regex) => { return true; },
    default: (value, regex) => {
        if (regex !== undefined) {
            // Test that value passes regex
            let useRegex;
            let regexOptionsKeys = Object.keys(regexOptions);
            if (typeof regex === 'string') {
                let doesRegexOptionsInclude = regexOptionsKeys.includes(regex);
                doesRegexOptionsInclude ? useRegex = regexOptions[regex] : console.warn('regex option does not exist. Please review');
            }
            else {
                useRegex = regex;
            }
            return useRegex.test(value);
        }
        else {
            return false;
        }
    },
    acceptBlanks: (value, regex) => {
        if (value === '') {
            return true;
        }
        else {
            let useRegex;
            let regexOptionsKeys = Object.keys(regexOptions);
            if (typeof regex === 'string') {
                let doesRegexOptionsInclude = regexOptionsKeys.includes(regex);
                doesRegexOptionsInclude ? useRegex = regexOptions[regex] : console.warn('regex option does not exist. Please review');
            }
            else {
                useRegex = regex;
            }
            return useRegex.test(value);
        }
    },
    doesAValueExist: (value) => {
        if (value === '' || value === undefined || value === null) {
            return false;
        }
        else {
            return true;
        }
    }
};

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

var css_248z = ".ge-errorMessage {\n  color: red; }\n";
styleInject(css_248z);

// TODO: Having a componentID is must when using global context - Write errors for that
//Initialize Global Context
const GlobalContext = createContext({});
const Reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_STATE':
            return Object.assign(Object.assign({}, state), action.payload);
        default: return state;
    }
};
// Component
const Form = ({ formAttributes, children, formID, initialFormState = {}, onSubmit, groupErrors = false, errorMessage = 'Please check form for errors.' }) => {
    const buildState = Object.assign({}, Object.assign({}, initialFormState), {
        formValues: !initialFormState.formValues ? {} : initialFormState.formValues,
        errors: {},
        groupErrors
    });
    // Global Context Work
    const [state, dispatch] = useReducer(Reducer, buildState);
    let updateState = (object) => {
        dispatch({
            type: 'UPDATE_STATE',
            payload: object
        });
    };
    const returnRequiredChildrenArray = () => {
        // Filter For Smart Components
        let childrenArray = [];
        const pullReactElements = (array) => {
            if (array) {
                return array.filter((child) => typeof child === 'object' &&
                    (child.props.componentID != undefined && child.props.optional !== true));
            }
            else {
                return children.filter((child) => typeof child === 'object' &&
                    (child.props.componentID != undefined && child.props.optional !== true));
            }
        };
        if (Array.isArray(children)) {
            childrenArray = pullReactElements();
        }
        else {
            childrenArray = pullReactElements([children]);
        }
        return childrenArray;
    };
    const checkRequiredValues = (childrenArray) => {
        /** This object contains key value pairs of required components that are currently undefined.  */
        let errorObject = {};
        childrenArray.forEach((child) => {
            /** A variable containing either the required component's componentID or groupName */
            let key = child.props.componentID || child.props.groupName;
            // Use the key variable to check state for corresponding key & value. If the key does not return a truthy value then that means the input is empty or componentID / groupName has not been correctly set. 
            if (state.formValues[key] == ( null)) {
                errorObject[key] = true;
            }
        });
        let newState = Object.assign({}, Object.assign({}, errorObject), Object.assign({}, state.errors));
        updateState({ errors: newState });
        const doesStateContainErrors = () => {
            if (Object.values(newState).includes(true)) {
                return true;
            }
            else {
                return false;
            }
        };
        return doesStateContainErrors();
    };
    const localOnSubmit = (e) => {
        e.preventDefault();
        if (onSubmit && !checkRequiredValues(returnRequiredChildrenArray())) {
            onSubmit({ [formID]: state });
        }
    };
    return createElement(GlobalContext.Provider, { value: Object.assign(Object.assign({}, state), { updateState }) },
        createElement("form", Object.assign({ id: formID }, formAttributes),
            children,
            (groupErrors && Object.values(state.errors).includes(true)) &&
                createElement("div", null,
                    createElement("p", { className: "ge-errorMessage" }, errorMessage)),
            createElement("button", { onClick: e => { localOnSubmit(e); } }, "Submit")));
};

var css_248z$1 = "* {\n  box-sizing: border-box;\n  font-family: Arial, sans-serif;\n  font-size: 16px; }\n";
styleInject(css_248z$1);

var css_248z$2 = ".text-input {\n  position: relative;\n  width: fit-content; }\n  .text-input label {\n    margin-right: 5px; }\n  .text-input input {\n    background-color: white;\n    border: none;\n    border-bottom: 1px solid black;\n    padding: 5px; }\n    .text-input input:focus {\n      border: 1px solid black;\n      outline: none; }\n  .text-input.error input {\n    border: 1px solid red; }\n  .text-input .errorMessage {\n    color: red;\n    text-align: left; }\n";
styleInject(css_248z$2);

const TextInput = ({ componentID, children, value = '', placeholder = 'Please Enter Value', label = "Text Input:", name = label, containerClassName = '', regexType = 'personName', customRegex, errorMessage = 'Error: Please Check Value', onChangeCallback = undefined, inputAttributes, labelAttributes, errorMessageAttributes, validate = true, optional = false, }) => {
    if (componentID == '' || componentID == undefined) {
        console.warn('componentID for TextInput component should be set. Without it data may not be tracked correctly');
    }
    // Initialization 
    /** If GlobalContext (Form State) has been initiated, this represents the GlobalContext Object. Default is empty object */
    const Context = useContext(GlobalContext);
    /** An IFFE is ran to check if the component exists within a context. The result is stored in the variable */
    const isThisASmartComponent = (() => {
        return Object.keys(Context).length >= 1 ? true : false;
    })();
    const [renderCount, setRenderCount] = useState(1);
    let regex = regexType;
    customRegex ? (regex = customRegex) : regex;
    let typeOfValidation = returnTypeOfValidation(optional, validate);
    // Functions
    const handleUpdatingState = (value, isThisValid) => {
        if (isThisASmartComponent) {
            // if this is a smart component update Global Context
            let passedValues = {
                errors: Object.assign(Object.assign({}, Context.errors), { [componentID]: !isThisValid }),
                formValues: Object.assign(Object.assign({}, Context.formValues), { [componentID]: value })
            };
            Context.updateState(Object.assign({}, passedValues));
        }
        else {
            setInputValue(value);
            setError(!isThisValid);
        }
    };
    if (isThisASmartComponent) {
        /** The value for this input. It's default is set to an empty string. Relies on internal state as source of truth unless the component is placed within a form's Context. If a Context exist then that would be the source of truth. */
        var inputValue = Context.formValues[componentID] === undefined ? value : Context.formValues[componentID];
        if (renderCount === 1) {
            typeOfValidation = 'acceptBlanks';
        }
        let doesTheParentHaveAnError = Context.errors[componentID] === true ? Context.errors[componentID] : false;
        let isCurrentValueValid = isThisValueValid[typeOfValidation](inputValue, regex);
        useEffect(() => {
            if (!isCurrentValueValid && !doesTheParentHaveAnError) {
                handleUpdatingState(inputValue, isCurrentValueValid);
            }
        });
        /** Boolean that let's the component know if an error exists based on the current validation settings. If a Context exists then that would be the source of truth */
        var errorExist;
        if (doesTheParentHaveAnError || !isCurrentValueValid) {
            errorExist = true;
        }
        else {
            errorExist = false;
        }
    }
    else {
        var [inputValue, setInputValue] = useState(value);
        if (validate === true && (renderCount <= 1 && inputValue === '')) {
            var [errorExist, setError] = useState(false);
        }
        else if (validate === true) {
            var [errorExist, setError] = useState(!isThisValueValid.default(inputValue, regex));
        }
    }
    const onInputValueChange = (e) => {
        if ((e.target.value !== inputValue) || inputValue == '') {
            setRenderCount(renderCount + 1);
            handleUpdatingState(e.target.value, isThisValueValid[typeOfValidation](e.target.value, regex));
            // If user provides onChangeCallback function, we pass information to their function.
            if (onChangeCallback !== undefined) {
                let params = {
                    event: e,
                    value: e.target.value,
                    validate: validate ? isThisValueValid[typeOfValidation](e.target.value, regex) : undefined,
                };
                onChangeCallback(params);
            }
        }
    };
    return (createElement("div", { className: `text-input ${containerClassName} ${errorExist ? 'error' : ''}`, onBlur: e => onInputValueChange(e) },
        label !== null && createElement("label", Object.assign({ htmlFor: componentID }, labelAttributes), label),
        createElement("input", Object.assign({ type: "text", id: componentID, placeholder: placeholder, value: inputValue }, inputAttributes, { onChange: (e) => {
                onInputValueChange(e);
            } })),
        children,
        (errorExist === true && !Context.groupErrors) && (createElement("p", Object.assign({ className: "errorMessage" }, errorMessageAttributes), errorMessage))));
};

export { Form, TextInput };
