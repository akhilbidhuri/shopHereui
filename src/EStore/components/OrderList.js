import { useState, useEffect } from 'react'
import { orderHistory } from '../../services/service'
import { ListGroup, Modal } from 'react-bootstrap' 
import {INVALID_TOKEN} from '../../services/service'

function App(props) {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async function(){
            setLoading(true)
            let res = await orderHistory(props.state.username, props.state.token)
            if(res===INVALID_TOKEN){
                alert("Invalid token, please login again you can have only one session running at a time.")
                props.dispatch(props.action())
                return
            }
            if(res){
                setOrders(res)
            }
            setLoading(false)
        })()
    }, []);

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Orders History</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {loading &&
                    <p>Loading...</p>
                }
                {orders && orders.length>0 &&
                    <ListGroup>
                        {
                            orders.map(order=><ListGroup.Item key={order.id}>{order.id}&nbsp;{order.created_at}</ListGroup.Item>)
                        }
                    </ListGroup>
                }
                {!loading && orders.length===0&&
                    <p>No Orders.</p>
                }
            </Modal.Body>
        </Modal>
    )
}

export default App;