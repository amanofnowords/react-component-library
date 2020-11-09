import React, { useState } from 'react'

const TextInput = ({
  inputID,
  value = '',
  placeholder = 'Please Enter Value',
  label = 'Text Input: ',
  containerClassName = '',
  validate = false,
  regexType = 'personName',
  customRegex,
  errorMessage = 'Error: Please check value',
  onChangeCallBack = undefined,
  inputAttributes,
  labelAttributes,
  errorMessageAttributes
}) => {
  let onChangeCallback = onChangeCallBack || undefined
  let regexOptions = {
    // Used for validation
    
    personName: /^[a-zA-Z]+$/,
    // phoneNumber: undefined,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    postalCode: /^[a-zA-Z0-9äöüÄÖÜ]*$/
  }

  const validateInput = passedValue => {
    let regex = regexOptions[regexType]
    customRegex ? (regex = customRegex) : regex
    let isValid = regex.test(passedValue)

    return isValid
  }

  const onInputValueChange = e => {
    setInputValue(e.target.value)
    let isValid = validateInput(e.target.value)
    if (validate) {
      setError(!isValid)
    }
    if (onChangeCallback !== undefined) {
      let params = {
        event: e,
        value: e.target.value,
        validate: validate ? isValid : undefined
      }
      onChangeCallback(params)
    }
  }

  if (validate === true) {
    var [errorExist, setError] = useState(!validateInput(inputValue))
  }
  const [inputValue, setInputValue] = useState(value)
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

export default TextInput
