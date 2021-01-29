import * as React from 'react';
import { Meta, Story } from '@storybook/react'
import { TextInput } from './index';
import { TextInputProps } from './TextInput.types.js';
import { regexOptions } from '../../resources/regExp';

export default {
    title: 'Text Input',
    component: TextInput,
    argTypes: {
        label: { table: { category: 'Label' } },
        labelAttributes: { table: { category: 'Label' } },
        componentID: { table: { category: 'Input' } },
        value: {
            table: { category: 'Input' },
            control: 'text',
        },
        placeholder: { table: { category: 'Input' } },
        onChangeCallback: { table: { category: 'Input' } },
        inputAttributes: { table: { category: 'Input' } },
        validate: { table: { category: 'Input Validation' } },
        regexType: {
            control: { type: 'select', options: Object.keys(regexOptions) },
            table: { category: 'Input Validation' }
        },

        customRegex: { table: { category: 'Input Validation' } },
        optional: {
            table: { category: 'Input Validation' },

        },
        errorMessage: { table: { category: 'Input Validation' } },
        errorMessageAttributes: { table: { category: 'Input Validation' } },
        containerClassName: { table: { category: 'Other' } },
        name: { table: { category: "Other" }, control: 'text' }
    },
    parameters: {
        docs: {
            description: {
                component: `The Text Input component can be used as quick way to get form text inputs up & running within your project. This component offers validation and comes with built in regular expressions to test the inputted value. It will function on it's own right out the box can be customized to fit your needs as a developer.`
            }
        }
    }
} as Meta;


const Template: Story<TextInputProps> = (args) => <TextInput {...args} />
export const Default = Template.bind({})
Default.args = {
    componentID: 'textInput'
}

export const ErrorState = Template.bind({})
ErrorState.args = {
    value: '123',
    ...Default.args
}

export const CustomInput = Template.bind({})

const CustomProps = {
    children: <span style={{
        fontSize: '16px',
        color: 'red',
        verticalAlign: 'top',
        margin: '0 0 0 5px'
    }}>*
    </span>,
    componentID: 'email',
    placeholder: 'Enter email address',
    label: 'Email:',
    errorMessage: 'Please enter a valid email address',
    regexType: 'email',
    containerClassName: 'customInputWrapper',
}
CustomInput.args = {
    ...CustomProps
}
