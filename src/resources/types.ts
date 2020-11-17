/** This represents the event object that gets emitted when an event fires  */
type UserEvent = {
    preventDefault: Function,
    target: Target
}

/** The target of an event */
type Target = {
    value: string, 
    id: string
}

export {UserEvent}