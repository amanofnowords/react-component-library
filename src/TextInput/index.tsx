import * as React from "react";

const regexOptions: any = {
  personName: /^[a-zA-Z]+$/,
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  postalCode: /^[a-zA-Z0-9äöüÄÖÜ]*$/
}

type TextInputProps = {
  inputID?: string,
  value?: string | number,
  placeholder?: string,
  label?: string,
  containerClassName?: string,
  validate?: boolean,
  regexType?: string,
  customRegex?: string | RegExp,
  errorMessage?: string,
  onChangeCallback?: Function,
  inputAttributes?: object,
  labelAttributes?: object,
  errorMessageAttributes?: object
}
const TextInput: Function = ({
  inputID,
  value,
  placeholder = 'Please Enter Value Here',
  label = 'Text Input: ',
  containerClassName = '',
  validate = false,
  regexType = 'personName',
  customRegex,
  errorMessage = 'Error: Please check value',
  onChangeCallback = undefined,
  inputAttributes,
  labelAttributes,
  errorMessageAttributes
}: TextInputProps): JSX.Element => {
  type Event = {
    preventDefault: Function,
    target: Target
  }
  type Target = {
    value: string,
    id: string,
  }
  const [inputValue, setInputValue] = React.useState<string | number | undefined>(value)

  /** Takes in a value an checks to make sure it passes */
  const validateInput: Function = (passedValue: string | number): boolean => {
    let regex = regexOptions[regexType];
    customRegex ? (regex = customRegex) : regex;
    let isValid: boolean = regex.test(passedValue)
    return isValid
  };

  if (validate === true) {
    var [errorExist, setError] = React.useState<boolean>(!validateInput(inputValue))
  }
  const onInputValueChange: Function = (e: Event) => {
    setInputValue(e.target.value);
    let isValid: boolean = validateInput(e.target.value);

    // Validation check 
    if (validate === true) {
      setError(!isValid);
    }
    if (onChangeCallback !== undefined) {
      type Params = {
        event: object
        value: string | number
        validate: boolean | undefined
      }
      let params: Params = {
        event: e,
        value: e.target.value,
        validate: validate ? isValid : undefined,
      }
      onChangeCallback(params)
    }
  };

  return (
    <div className={`text-input ${containerClassName}`}>
      <label htmlFor={inputID} {...labelAttributes}>
        {label}
      </label>
      <input
        type='text'
        id={inputID}
        placeholder={placeholder}
        value={inputValue}
        {...inputAttributes}
        onChange={e => {
          onInputValueChange(e)
        }}
      />

      {errorExist === true && (
        <p className='errorMessage' {...errorMessageAttributes}>
          {errorMessage}
        </p>
      )}
    </div>
  )

}

export { TextInput }