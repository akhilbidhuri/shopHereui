import axios from 'axios'


const baseUrl = `http://localhost:${process.env.REACT_APP_SERVER_PORT||8040}`

export const INVALID_TOKEN ="Invalid Token"

export const registerHandler = async (name, username, password) => {
    try{
        let res = await axios.post(baseUrl+"/user/create", {name, username, password})
        if(res.status===200){
            return res.data.user
        }
    } catch{
        return null
    } return null
}

export const loginHandler = async (username, password) => {
    try{
        let res = await axios.post(baseUrl+"/user/login", {username, password})
        if(res.status===200){
            return res.data.user
        }
    } catch{    
        return null
    } return null
}

export const getItems = async(token) => {
    try{
        let res = await axios.get(baseUrl+"/item/list")
        if(res.status===200){
            return res.data.items
        }
        return null
    } catch {
        return null
    }
}

export const addItem = async(itemID, cartID, token) => {
    try{
        let headers = {headers:{"Authorization":"Bearer "+token}}
        let res = await axios.post(baseUrl + "/cart/add",{cart_id: cartID, item_id: itemID}, headers)
        if(res.status===200){
            if(res.data.message && res.data.message===INVALID_TOKEN){
                return INVALID_TOKEN
            }
            return res.data.cart_item
        }
        return null
    } catch {
        return null
    }
}

export const getCartItems = async(cartID, token) => {
    try{
        let headers = {headers:{"Authorization":"Bearer "+token}}
        let res = await axios.get(baseUrl+`/cart/${cartID}/list`, headers)
        if(res.status===200){
            if(res.data.message && res.data.message===INVALID_TOKEN){
                return INVALID_TOKEN
            }
            return res.data.cartItems
        }
        return null
    } catch{
        return null
    }
}

export const cartToOrder = async(cartID, token) => {
    let res
    try{
        let headers = {headers:{"Authorization":"Bearer "+token}}
        res = await axios.get(baseUrl+`/cart/${cartID}/complete`, headers)
        if(res.status===200){
            if(res.data.message && res.data.message===INVALID_TOKEN){
                return INVALID_TOKEN
            }
            return res.data
        } 
        return null
    } catch {
        return null
    }
}

export const orderHistory = async (username, token) => {
    try{
        let headers = {headers:{"Authorization":"Bearer "+token}}
        let res = await axios.get(baseUrl+`/order/${username}/list`, headers)
        if(res.status===200){
            if(res.data.message && res.data.message===INVALID_TOKEN){
                return INVALID_TOKEN
            }
            return res.data.orders
        }
        return null
    } catch {
        return null
    }
}