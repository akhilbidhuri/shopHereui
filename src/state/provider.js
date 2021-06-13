import React, {useContext, useReducer} from 'react'
import UserContext from './userContext'
import reducer from './reducer'

//Exporatable consumer which can be injected into components
export const StateConsumer = UserContext.Consumer
//Provider 
function StateProvider(props){
    const AppContext = useContext(UserContext)
    const [state, dispatch] = useReducer(reducer, AppContext)
    return (
        <UserContext.Provider value={{state, dispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default StateProvider