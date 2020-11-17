/** This represents the event object that gets emitted when an event fires  */
declare type UserEvent = {
    preventDefault: Function;
    target: Target;
};
/** The target of an event */
declare type Target = {
    value: string;
    id: string;
};
export { UserEvent };
