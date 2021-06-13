import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { addItem } from '../../services/service'
import {INVALID_TOKEN} from '../../services/service'

function CatalogueCard(props) {
    const [disable, setDisable] = useState(false)

    const addToCart = async() => {
        setDisable(true)
        let res = await addItem(props.item.id, props.state.cart_id, props.state.token)
        if(res===INVALID_TOKEN){
            alert("Invalid token, please login again you can have only one session running at a time.")
            props.dispatch(props.action())
            return
        }
        if(!res)
            alert("Failed to add to Cart")
        else
            alert("Added to Cart")
        setDisable(false)
    }

    return (
        <Card key={props.item.id} style={{ width: '15rem' }} className="mb-2">
            <Card.Body>
                <Card.Title>{props.item.id}&nbsp;{props.item.name}</Card.Title>
                <Button disabled={disable} variant="primary" onClick={addToCart}>Add To Cart</Button>
            </Card.Body>
        </Card>
    )
}

export default CatalogueCard;