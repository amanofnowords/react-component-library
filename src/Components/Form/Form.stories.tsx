import * as React from 'react';
import { Form } from './index'
import { TextInput } from '../TextInput'
import { Story } from '@storybook/react'


export default {
    title: 'Form',
    component: Form,
    argTypes: {

    }
}

const Template: Story<Form> = (args) => <Form {...args}>
    <TextInput id="test"></TextInput>
    <p>Whats up?</p>
</Form>
export const Default = Template.bind({});