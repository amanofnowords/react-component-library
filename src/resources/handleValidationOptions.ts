// Add Logic to accept Arrays<string>


import {regexOptions} from './regExp'

export type isThisValueValidType = {
    default: Function,  
    acceptBlanks: Function,  
    doesAValueExist: Function,  
    returnTrue: Function;
}

export const returnTypeOfValidation: Function = (optionalBoolean: boolean, validateBoolean: boolean): keyof isThisValueValidType => {
        if (optionalBoolean === true && validateBoolean == false) {
            return 'returnTrue';
        } else if (optionalBoolean === true && validateBoolean == true) {
            // Allow Blanks
            // Validate if value is not blank
            return 'acceptBlanks'
        } else if (optionalBoolean === false && validateBoolean == false) {
            // Required value, 
            // Do not validate
            return 'doesAValueExist'
        }
        else {
            // Catch All - An input value is required & will be validated. 
            return 'default'
        }
    };
// Check value, let us know if is valid or not
export const isThisValueValid: isThisValueValidType = {
    returnTrue: (value: React.ReactText, regex: string | RegExp) => { return true },
    default: (value: React.ReactText, regex: string | RegExp):boolean => { 
        if(regex !== undefined){
            // Test that value passes regex
            let useRegex; 
            let regexOptionsKeys = Object.keys(regexOptions)
            let doesRegexOptionsInclude = regexOptionsKeys.includes(regex);
            doesRegexOptionsInclude ? useRegex = regexOptions[regex] : useRegex = regex;

            return useRegex.test(value)
        } else {
            return false
        }
    },
    acceptBlanks: (value: React.ReactText, regex: string | RegExp):boolean => {
        if(value === ''){
            return true
        } else {
            let useRegex; 
            let regexOptionsKeys = Object.keys(regexOptions)
            let doesRegexOptionsInclude = regexOptionsKeys.includes(regex);
            doesRegexOptionsInclude ? useRegex = regexOptions[regex] : useRegex = regex;
            return useRegex.test(value)
        }
    },
    doesAValueExist: (value: React.ReactText, regex?) => {
        if(value === '' || value === undefined || value === null){
            return false
        } else {
            return true
        }
    }
}