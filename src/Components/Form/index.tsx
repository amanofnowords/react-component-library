
// TODO: Having a componentID is must when using global context - Write errors for that
// Write a function that clears an error property if it is set to false. 





import * as React from 'react';
import { UserEvent } from '../../resources/types'
import { FormPropsType, stateType } from './Form.types';
import '../Form/Form.scss'

//Initialize Global Context
export const GlobalContext = React.createContext({})
const Reducer = (state: stateType, action: { payload: Object, type: String }): stateType => {
    switch (action.type) {
        case 'UPDATE_STATE':
            return { ...state, ...action.payload }
        default: return state;
    }
}

// Component
export const Form: React.FC<FormPropsType> = ({
    formAttributes,
    children,
    formID,
    initialFormState = {},
    onSubmit,
    groupErrors = false,
    errorMessage = 'Please check form for errors.'
}): JSX.Element => {
    const buildState: stateType = Object.assign(
        {},
        { ...initialFormState },
        {
            formValues: !initialFormState.formValues ? {} : initialFormState.formValues,
            errors: {},
            groupErrors
        }
    )

    // Global Context Work
    const [state, dispatch] = React.useReducer(Reducer, buildState)
    let updateState: Function = (object: Object): void => {
        dispatch({
            type: 'UPDATE_STATE',
            payload: object
        })
    }
    const returnRequiredChildrenArray = (): React.ReactElement[] => {
        // Filter For Smart Components
        let childrenArray = [];
        const pullReactElements = (array?: any[]) => {
            if (array) {
                return array.filter((child: any) =>
                    typeof child === 'object' &&
                    (child.props.componentID != undefined && child.props.optional !== true))
            } else {
                return children.filter((child: any) =>
                    typeof child === 'object' &&
                    (child.props.componentID != undefined && child.props.optional !== true))
            }
        }
        if (Array.isArray(children)) {
            childrenArray = pullReactElements()
        } else {
            childrenArray = pullReactElements([children])
        }

        return childrenArray

    }

    const checkRequiredValues = (childrenArray: React.ReactElement[]): boolean => {

        /** This object contains key value pairs of required components that are currently undefined.  */

        let errorObject: { [key: string]: boolean } = {}


        childrenArray.forEach((child: React.ReactElement) => {
            /** A variable containing either the required component's componentID or groupName */
            let key: string = child.props.componentID || child.props.groupName;

            // Use the key variable to check state for corresponding key & value. If the key does not return a truthy value then that means the input is empty or componentID / groupName has not been correctly set. 
            if (state.formValues[key] == (undefined || '' || null)) {
                errorObject[key] = true;
            }

        })
        let newState: Object = Object.assign({}, { ...errorObject }, { ...state.errors })
        updateState({ errors: newState })

        const doesStateContainErrors: Function = (): boolean => {
            if (Object.values(newState).includes(true)) {
                return true;
            } else {
                return false;
            }
        }

        return doesStateContainErrors();


    }

    const localOnSubmit: Function = (e: UserEvent): void => {
        e.preventDefault();
        if (onSubmit && !checkRequiredValues(returnRequiredChildrenArray())) {
            onSubmit({ [formID]: state })
        }
    }



    return <GlobalContext.Provider value={{ ...state, updateState }} >
        <form id={formID} {...formAttributes}>
            {children}
            {(groupErrors && Object.values(state.errors).includes(true)) &&
                <div>
                    <p className="ge-errorMessage">{errorMessage}</p>
                    {/* {renderErrors()} */}
                </div>
            }

            <button onClick={e => { localOnSubmit(e) }}>Submit</button>
        </form>
    </ GlobalContext.Provider >
}