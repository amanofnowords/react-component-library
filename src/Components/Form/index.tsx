
// TODO: Having a componentID is must when using global context - Write errors for that
// Write a function that clears an error property if it is set to false. 





import * as React from 'react';
import { UserEvent } from '../../resources/types'
import { FormPropsType, stateType } from './Form.types';
import '../Form/Form.scss'

//Initialize Global Context
export const GlobalContext = React.createContext({})
const Reducer = (state: stateType, action: { payload: Object, type: String }): Object => {
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
    const returnRequiredChildrenArray = (): React.ReactNode[] => {
        // Filter For Smart Components
        let childrenArray: React.ReactNode[] = [];

        const filterChildren = (array: React.ReactNode[], arrayToPushTo: React.ReactNode[]) => {
            array.forEach((childElement: React.ReactNode): void => {
                if (typeof childElement === 'object' && (childElement.props.componentID != undefined && childElement.props.optional !== true)) { arrayToPushTo.push(childElement) };
            })
        }

        if (Array.isArray(children) === true) {
            filterChildren(children, childrenArray);
        } else {
            let newArray = [children];
            filterChildren(newArray, childrenArray)
        }
        return childrenArray;
    }

    const checkRequiredValues = (childrenArray: React.ReactNode[]) => {

        /** This object contains key value pairs of required components that are currently undefined.  */

        let errorObject: { [key: string]: boolean } = {}


        childrenArray.forEach((child: React.ReactNode) => {
            /** A variable containing either the required component's componentID or groupName */
            let key = child.props.componentID || child.props.groupName;

            // Use the key variable to check state for corresponding key & value. If the key does not return a truthy value then that means the input is empty or componentID / groupName has not been correctly set. 
            if (state.formValues[key] == (undefined || '' || null)) {
                errorObject[key] = true;
            }

        })
        let newState: stateType = Object.assign({}, { ...errorObject }, { ...state.errors })
        updateState({ errors: newState })

        const doesStateContainErrors: Function = (): boolean => {
            if (Object.values(newState).includes(true)) {
                return true;
            } else {
                return false;
            }
        }

        if (onSubmit && !doesStateContainErrors()) {
            onSubmit({ [formID]: state })
        }
    }

    const localOnSubmit: Function = (e: UserEvent): void => {
        e.preventDefault();
        let requiredChildrenArray: React.ReactNode[] = returnRequiredChildrenArray()
        if (requiredChildrenArray.length > 0) {
            checkRequiredValues(requiredChildrenArray)
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