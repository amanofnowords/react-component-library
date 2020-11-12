import React, {useState} from "react";

interface TextObject {
    message: string, 
    id: number
}

const text: TextObject = {
    message: 'Matthew fixing dev aye run both',
    id: 2
}


const SpecialFunction: Function = (): JSX.Element => {
    console.log('Message Here', text.message)
    return <p>{text.message}</p>
}




export {text, SpecialFunction}