import {createGlobalState} from "react-hooks-global-state"

const { setGlobalState, useGlobalState} = createGlobalState({
    credentials:{
        email:"",
        password:""
    }
})

export {useGlobalState,setGlobalState}