import * as React from 'react';
import { Form } from './index'
import { Default as TextInput } from '../TextInput/TextInput.stories'
// import { Default as DefaultRadioSelect } from '../RadioSelect/RadioSelect.stories';
import { Story } from '@storybook/react'
import { FormPropsType } from './Form.types';

import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from '@storybook/addon-docs/blocks'

import '../../resources/storybookjs.scss'

export default {
    title: 'Form',
    component: Form,
    // subcomponents: { TextInput },
    argTypes: {
        formID: { control: 'text', table: { category: 'Form Props' } },
        initialFormState: { table: { category: 'Form Props' } },
        formAttributes: { table: { category: 'Form Props' } },
        onSubmit: { table: { disable: true } },
        errorMessage: { table: { category: 'Form Props' } },
        groupErrors: { table: { category: 'Form Props' } },
        children: { table: { disable: true } }
    },
    parameters: {
        docs: {
            description: { component: `The Form component is a customizable component that can automatically recognize when a component from the same library is a child of the form. If the Form recognizes the child components, it will automatically collect the data and run validation on submit. If there are errors, the form will not return any values. If the groupErrors prop is set to true, instead of each component rendering an individual error, the form will display one collective error. The default Form is empty with the exception of the submit button` },
            source: {
                code: `
                <Form formID = "personalInformation">
            <TextInput
            componentID="firstName"
            placeholder="Please Enter First Name"
            label="First Name"
            errorMessage="This input only accepts letters and hyphens"
            regexType="personName"
            containerClassName='customInputWrapper'
        />
            <TextInput
            componentID="LastName"
            placeholder="Please Enter Last Name"
            label="First Name"
            errorMessage="This input only accepts letters and hyphens"
            regexType="personName"
            containerClassName='customInputWrapper'
        />
            <TextInput
            componentID="email"
            placeholder="Please Enter Email Address"
            label="Email Address"
            errorMessage="Please Enter A Valid Email Address"
            regexType="email"
            optional={true}
            containerClassName="customInputWrapper"

        />
</Form>
            `,
                type: 'code'
            }
            // page: () => (
            //     <>
            //         <Title />
            //         <Subtitle />
            //         <Description />
            //         <Primary />
            //         <ArgsTable />
            //         <Stories />

            //     </>
            // )
        }
    }
}


export const FormWithAddedChildren: Story<FormPropsType> = (args): JSX.Element => {
    return <Form {...args}></Form>
}
FormWithAddedChildren.args = {
    formAttributes: {
        className: "customForm"
    },
    formID: 'personalInformation',
    onSubmit: (params) => {
        alert(`
        First Name: ${params.personalInformation.formValues.firstName}
        Last Name: ${params.personalInformation.formValues.lastName}
        Email: ${params.personalInformation.formValues.email}
        `)

    },
    children: [
        <TextInput
            key="test"
            componentID="firstName"
            placeholder="Please Enter First Name"
            label="First Name"
            errorMessage="This input only accepts letters and hyphens"
            containerClassName='customInputWrapper'

        />,
        <TextInput
            key="test2"
            componentID="lastName"
            placeholder="Please Enter Last Name"
            label="Last Name"
            errorMessage="This input only accepts letters and hyphens"
            containerClassName='customInputWrapper'

        />,
        <TextInput
            key="test3"
            componentID="email"
            placeholder="Please Enter Email Address"
            label="Email Address"
            errorMessage="Please Enter A Valid Email Address"
            regexType="email"
            optional={true}
            containerClassName="customInputWrapper"

        />

    ],

}
export const FormGroupingErrorsTogether: Story<FormPropsType> = (args): JSX.Element => {
    return <Form {...args}></Form>
}
FormGroupingErrorsTogether.args = {
    ...FormWithAddedChildren.args,
    groupErrors: true,
    initialFormState: {
        formValues: { firstName: 'John', lastName: 'Doe3', email: 'johndoe3@test' }
    }
}

export const DefaultForm: Story<FormPropsType> = (args): JSX.Element => <Form {...args} />

