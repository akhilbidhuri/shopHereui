import { useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import Cart from './Cart'
import OrderList from './OrderList'
import UserContext from '../../state/userContext'
import { INVALID_TOKEN, cartToOrder } from '../../services/service'
import { setUserAction, removeUserAction } from '../../state/action'

function TopBar(props) {
    const [cart, setCart] = useState(false)
    const [orderList, setOrderList] = useState(false)
    const {state, dispatch} = useContext(UserContext)

    const checkout = async() => {
        let res = await cartToOrder(state.user.cart_id, state.user.token)
        if(res){
            if(res===INVALID_TOKEN){
                alert("Invalid token, please login again you can have only one session running at a time.")
                dispatch(removeUserAction())
            } else {
                dispatch(setUserAction(res.user))
                alert("Checkout done")
            }
        } else {
            alert("Checkout Failed")
        }
    }

    const toggleCart = () => {
        setCart(!cart)
    }

    const toggleOrderList = () => {
        setOrderList(!orderList)
    }

    return (
        <>
        <div className="topBar">
            <h5 className="shColor">shopHere</h5>
            <div style={{width:"50%"}}>
            </div>
            <Button variant={"success"} onClick={checkout}>
                Checkout
            </Button>
            <Button variant={"warning"} onClick={toggleCart}>
                Cart
            </Button>
            <Button variant={"info"} onClick={toggleOrderList}>
                Order History
            </Button>
        </div>
        {cart &&
            <Cart show={cart} handleClose={toggleCart} state={state.user} dispatch={dispatch} action={removeUserAction}/>
        }
        {orderList &&
            <OrderList show={orderList} handleClose={toggleOrderList} state={state.user} dispatch={dispatch} action={removeUserAction}/>
        }      
        </>
    )
}

export default TopBar;