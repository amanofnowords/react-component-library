# React Component Library

A simple Component Library

## Components

### Text Input

`import {TextInput} from @amanofnowords/react-component-library.`

The Text Input component can be used as quick way to get form text inputs up & running within your project. This component offers validation and comes with built in regular expressions to test the inputted value. It will function on it's own right out the box can be customized to fit your needs as a developer.

<details><summary><h3 style="display: inline-block"> TextInput Props</summary>

| Props                  | Type                     | Description                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| label                  | `String, Number or null` | Text that would display for the input's label. If you would like to remove this element pass in a value of `null`                                                                                                                                |
| labelAttributes        | `Object`                 | If you have any html attributes you would like to pass on to the label element, they can be added as an object here.                                                                                                                             |
| value                  | `String`                 | If a value for this input already exists then it should be placed here. Default will be an empty string.                                                                                                                                         |
| inputID                | `String`                 | This will be used as the id of the input html element                                                                                                                                                                                            |
| placeholder            | `String`                 | Text that appears in input when it has no value set.                                                                                                                                                                                             |
| onChangeCallBack       | `Function`               | You can pass a function here. If you would like a function to be called with the input value's change. An example for this is passing the user input value on to a separate component.                                                           |
| inputAttributes        | `Object`                 | If you have any html attributes you would like to pass on to the input element, they can be added as an object here.                                                                                                                             |
| validate               | `Boolean`                | Set to `true` if you would like to validate the user's input. The user's input would can be validated using the component's built in Regex or utilize a customRegex. Default `false`.                                                            |
| regexType              | `String`                 | The TextInput Component offers a couple of built in Regular Expressions that can be used to validate the user's input. The options are **personName**, **email** and **postalCode**. See below for more information about the available options. |
| customRegex            | `Regex`                  | If you would like to use your own Regular Expression, you can use this prop to submit it here. This will override the value for RegexType                                                                                                        |
| errorMessage           | `String`                 | If the **validate** is set to true, then an error message will appear if the user's input value does not pass the Regular expression being used.                                                                                                 |
| errorMessageAttributes | `Object`                 | If you have any html attributes you would like to pass on to the error message paragraph element, they can be added as an object here.                                                                                                           |
| containerClassName     | `String`                 | The class name of the div element wrapping the entire component.                                                                                                                                                                                 |

</details>

<hr>

### Radio Select

`import {RadioSelect} from @amanofnowords/react-component-library.`

The Text Input component can be used as quick way to get form text inputs up & running within your project. This component offers validation and comes with built in regular expressions to test the inputted value. It will function on it's own right out the box can be customized to fit your needs as a developer.

<details><summary><h3 style="display: inline-block"> RadioSelect Props</summary>

| Props              | Type       | Description                                                                                                                                                                                                   |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| groupName          | `String`   | This gets mapped to the input's `name` attribute. It allows the component to know that the option belong to the same group.                                                                                   |
| title              | `String`   | Essentially the title or question for the RadioSelect component                                                                                                                                               |
| options            | `Array`    | The options that the user will select from must be passed into this component using an Array of objects. The object's shape must follow the following format. `{name: String, value: String}`                 |
| optionSelected     | `String`   | If there is an option that was previously selected, you can pass a `String` of the value and the component will highlight the option.                                                                         |
| selectCallback     | `Function` | This option gets called when an option is selected. You can use it to pass information outside of the RadioSelect Component. The values being returned will be the RadioSelect's groupName and option object. |
| containerClassName | `String`   | The class name of the div element wrapping the entire component.                                                                                                                                              |

</details>
