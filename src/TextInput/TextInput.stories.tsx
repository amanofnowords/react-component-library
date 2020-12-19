import * as React from 'react';
import { TextInput } from './index';
import { TextInputProps } from './TextInput.types.js';
import { Story } from '@storybook/react';

export default {
    title: 'TextInput',
    component: TextInput,
    argTypes: {
        value: { control: 'text', },
        // customRegex: { control: 'text' }
    }
};


const Template: Story<TextInputProps> = (args) => <TextInput {...args} />
export const Default = Template.bind({})

export const ErrorState = Template.bind({})
ErrorState.args = {
    validate: true,
}

