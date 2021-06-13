export default function reducer(state, action){
    switch(action.type){
        case 'SET_USER':
                        let user = {...action.payload}
                        localStorage.setItem("user", user)
                        return {...state, user: user, logout: false}
        case 'REMOVE_USER':
                            localStorage.removeItem('user')
                            return {...state, user:null, logout: true}
        default: return state
    }
}