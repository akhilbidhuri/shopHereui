import { useState, useEffect } from 'react';
import { getCartItems } from '../../services/service'
import { ListGroup, Modal } from 'react-bootstrap'
import {INVALID_TOKEN} from '../../services/service'

function Cart(props) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async function(){
            setLoading(true)
            let res = await getCartItems(props.state.cart_id, props.state.token)
            if(res==INVALID_TOKEN){
                alert("Invalid token, please login again you can have only one session running at a time.")
                props.dispatch(props.action())
                return
            }
            if(res){
                setItems(res)
            }
            setLoading(false)
        })()
    }, []);

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cart Items</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               {loading &&
                    <p>Loading...</p>
               }
               {items && items.length>0 &&
                    <ListGroup>
                        {
                            items.map(item=><ListGroup.Item key={item.item_id}>{item.item_id}</ListGroup.Item>)
                        }
                    </ListGroup>
               }
               {!loading && items.length===0&&
                    <p>No Items in Cart.</p>
               }
            </Modal.Body>
        </Modal>
    )
}

export default Cart;