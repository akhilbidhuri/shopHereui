import { useContext } from 'react'
import userContext from '../../state/userContext'
import { Container, Row, Col } from 'react-bootstrap'
import CatalogueCard from './CatalogueCard'
import { removeUserAction } from '../../state/action'

function Catalouge(props) {
    const {state, dispatch } = useContext(userContext)

    return (
        <Container className="mt-4">
            <Row>
                {
                    props.items.map(item=><Col key={item.id}><CatalogueCard key={item.id} item={item} state={state.user}
                         dispatch={dispatch} action={removeUserAction}/></Col>)
                }
            </Row>
        </Container>
    )
}

export default Catalouge;