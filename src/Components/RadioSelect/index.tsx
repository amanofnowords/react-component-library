import * as React from 'react';
import { RadioSelectProps, Option } from './RadioSelect.types.js'
import '../../main.scss'
import './RadioSelect.scss'


const RadioSelect: React.FC<RadioSelectProps> = ({
    title = 'Select Option Below',
    options = [
        { name: 'Default Option 1', value: 'defaultOption1' },
        { name: 'Default Option 2', value: 'defaultOption2' },
        { name: 'Default Option 3', value: 'defaultOption3' }
    ],
    groupName,
    optionSelected,
    selectCallback,
    containerClassName = 'radioSelectWrapper'
}) => {

    // Initialize option selected state
    const [optionSelectedState, changeOptionSelectedState] = React.useState<string>(optionSelected)

    // Function to compare and check if an option has been selected
    const isThisSelected: Function = (value: string): boolean => {
        return value === optionSelectedState ? true : false
    }

    // Click Handler
    const handleClick: Function = (groupName: string, option: Option): void => {
        changeOptionSelectedState(option.value)
        selectCallback(groupName, option)
    }

    const renderOption: Function = () => {
        return options.map((option: Option, index: number): JSX.Element => {
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
    return <div className={containerClassName}>
        <p>{title}</p>
        {options ? renderOption(options) : undefined}
    </div>
}

export { RadioSelect }
