import * as React from 'react';
import { RadioSelectProps, Option } from './RadioSelect.types.js'

export const RadioSelect: React.FC<RadioSelectProps> = ({ options, groupName, optionSelected, selectCallBack }) => {

    const [optionSelectedState, changeOptionSelectedState] = React.useState<string>(optionSelected)
    const isThisSelected: Function = (value: string): boolean => {
        return value === optionSelectedState ? true : false
    }

    const handleClick: Function = (groupName: string, option: Option): void => {
        changeOptionSelectedState(option.value)
        selectCallBack(groupName, option)
    }

    const renderOption: Function = () => {
        return options.map((option, index: number): JSX.Element => {
            return <div
                className={`radioSelectOption ${isThisSelected(option.value) ? 'selected' : ''}`}
                key={index}
                onClick={(e) => handleClick(groupName, option)}
            >
                <input type="radio"
                    id={option.value}
                    name={groupName}
                    checked={isThisSelected(option.value)}
                    onChange={() => { }}

                />
                <label htmlFor={option.value}>{option.name}</label>
            </div>

        })
    }
    return <div>{options ? renderOption(options) : undefined}</div>
}
