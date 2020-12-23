
import * as React from 'react';

const FormContext = React.createContext({ test: 'Test Object' })
const Form: React.FC = (props) => {
    let ReactChildrenArray = [];

    console.log('Props Children', props.children)
    React.Children.forEach(props.children, (child): void => {
        if (typeof child.type === 'function') {
            ReactChildrenArray.push(child);
        }

    })
    console.log('ReactChildrenArray', ReactChildrenArray)
    return <FormContext.Provider >
        <form>{props.children}</form>
    </FormContext.Provider>
}

export { Form }