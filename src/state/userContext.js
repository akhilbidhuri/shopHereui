import React from 'react'
const initial_context = {user: null, logout:false}
const getContext = () => {
    return localStorage.getItem('user')
}
const state = React.createContext({...initial_context, user: getContext()})
export default state