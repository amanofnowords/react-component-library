import * as React from 'react';
import { TextInput } from './index';
import { TextInputProps } from './TextInput.types.js';
import { Story } from '@storybook/react';
import { regexOptions } from '../resources/regExp';

export default {
    title: 'Text Input',
    component: TextInput,
    argTypes: {
        label: { table: { category: 'Label' } },
        labelAttributes: { table: { category: 'Label' } },
        value: {
            table: { category: 'Input' },
            control: 'text',
        },
        inputID: { table: { category: 'Input' } },
        placeholder: { table: { category: 'Input' } },
        onChangeCallback: { table: { category: 'Input' } },
        inputAttributes: { table: { category: 'Input' } },
        validate: { table: { category: 'Input Validation' } },
        regexType: {
            control: { type: 'select', options: Object.keys(regexOptions) },
            table: { category: 'Input Validation' }
        },
        customRegex: { table: { category: 'Input Validation' } },
        errorMessage: { table: { category: 'Input Validation' } },
        errorMessageAttributes: { table: { category: 'Input Validation' } },
        containerClassName: { table: { category: 'Other' } }
        // customRegex: { control: 'text' }
    },
    parameters: {
        docs: {
            description: {
                component: 'Description about Text Input'
            }
        }
    }
};


const Template: Story<TextInputProps> = (args) => <TextInput {...args} />
export const Default = Template.bind({})

export const ErrorState = Template.bind({})
ErrorState.args = {
    validate: true,
}

