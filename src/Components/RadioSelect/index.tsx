import * as React from 'react';
import { RadioSelectProps, Option } from './RadioSelect.types.js'
import { GlobalContext } from '../Form/index';
import '../../main.scss'
import './RadioSelect.scss'


const RadioSelect: React.FC<RadioSelectProps> = ({
    title = 'Select Option: ',
    options = [
        { name: 'Default Option 1', value: 'defaultOption1' },
        { name: 'Default Option 2', value: 'defaultOption2' },
        { name: 'Default Option 3', value: 'defaultOption3' }
    ],
    groupName,
    optionSelected,
    selectCallback,
    containerClassName = 'radioSelectWrapper',
    smartForm = false,
    required = true
}) => {

    if (smartForm) {
        var Context: Record<string, any> = React.useContext(GlobalContext);
        var optionSelectedState: string = Context.formValues[groupName] == undefined ? optionSelected : Context.formValues[groupName]
    } else {
        // Initialize option selected state
        var [optionSelectedState, changeOptionSelectedState] = React.useState<string>(optionSelected)
    }

    // pass value from form state to component. 


    // Function to compare and check if an option has been selected
    const isThisSelected: Function = (value: string): boolean => {
        return value === optionSelectedState ? true : false
    }

    // Click Handler
    const handleClick: Function = (groupName: string, option: Option): void => {
        if (smartForm && (option.value !== optionSelectedState)) {
            Context.updateState({ [groupName]: option.value })
        } else if (!smartForm) {
            changeOptionSelectedState(option.value)
            if (selectCallback) { selectCallback(groupName, option) }
        }
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
