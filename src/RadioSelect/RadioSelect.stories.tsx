import * as React from 'react';
import { RadioSelect } from './index';
import { RadioSelectProps } from './RadioSelect.types.js';
import { Story } from '@storybook/react'

export default {
    title: 'Radio Select',
    component: RadioSelect,
    argTypes: {
    }
}

const Template: Story<RadioSelectProps> = (args) => <RadioSelect {...args} />
export const Default = Template.bind({})
export const OptionSelected = Template.bind({})
OptionSelected.args = {
    optionSelected: 'defaultOption2'
}