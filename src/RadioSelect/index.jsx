import React, { useState } from 'react'
// import styles from './stylesheet.css'

// TODO: Figure out how to handle default choices and also after the user selects

const RadioSelect = ({ options, groupName, selectCallBack }) => {
  const returnValueOfOptionSelected = options => {
    let found = options.find(option => option.selected === true)
    return found !== undefined ? found.value : undefined
  }

  const [optionSelected, changeOptionSelected] = useState(
    optionSelected || returnValueOfOptionSelected(options) || undefined
  )
  const handleClick = e => {
    if (selectCallBack !== undefined) {
      selectCallBack(groupName, e.target.id)
    } else {
      changeOptionSelected(e.target.id)
    }
  }

  const renderOptions = options => {
    let optionArray = []
    options.map((option, index) => {
      optionArray.push(
        <p
          className={`radioSelectOption ${
            optionSelected === option.value ? 'selected' : ''
          }`}
          key={index}
          id={option.value}
          onClick={e => handleClick(e)}
          name={groupName}
        >
          {option.name}
        </p>
      )
    })
    return optionArray
  }
  return options ? renderOptions(options) : undefined
}

export default RadioSelect
