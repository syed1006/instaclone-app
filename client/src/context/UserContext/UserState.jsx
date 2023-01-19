import { useState } from "react";
import UserContext from "./UserContext"

const UserState = (props)=>{
    const [state, setState] = useState({isLogged: false});
    const updateLogged = (val)=>{
        setState({...state, isLogged: val})
    }

    return(
        <UserContext.Provider value={{state, updateLogged}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;