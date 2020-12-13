# React Component Library

A simple Component Library

## Components

### Text Input

Controlled Text Input
| Props | Type | Description |
| --------- | ------- | --------------------|
| inputID | String | This will be used as the id of the input html element |
| value | String or Number | If a value for this input already exists then it should be placed here. Default will be an empty string. |
| placeholder | String or Number | Text that appears in input when it has no value set. |
| label | String or Number | Text that would display for the input's label. If you would like to remove this element pass in a value of `null` |
| containerClassName | String | The class name of the div element wrapping the entire component. |
| validate | Boolean | Set to `true` if you would like to validate the user's input. The user's input would can be validated using the component's built in Regex or utilize a customRegex. Default `false`. |
| regexType| String | The TextInput Component offers a couple of built in Regular Expressions that can be used to validate the user's input. The options are **personName**, **email** and **postalCode**. See below for more information about the available options. |
| customRegex | Regex | If you would like to use your own Regular Expression, you can use this prop to submit it here. This will override the value for RegexType|
| errorMessage | String | If the **validate** is set to true, then an error message will appear if the user's input value does not pass the Regular expression being used. |
| onChangeCallBack | Function | You can pass a function here. If you would like a function to be called with the input value's change. An example for this is passing the user input value on to a separate component. |
| inputAttributes | Object | If you have any html attributes you would like to pass on to the input element, they can be added as an object here. |
| labelAttributes | Object | If you have any html attributes you would like to pass on to the label element, they can be added as an object here. |
| errorMessageAttributes | Objects | If you have any html attributes you would like to pass on to the error message paragraph element, they can be added as an object here.|
