import { useState, useEffect, useContext } from 'react';
import TopBar from './components/TopBar'
import UserContext from '../state/userContext'
import { getItems } from '../services/service'
import Catalouge from './components/Catalouge';

function EStore(props) {
    const { state } = useContext(UserContext);
    const [items, setItems] = useState([])

    useEffect(async() => {
        (async function () {
            let res = await getItems(state.user.token)
            if(res){
                setItems(res)
            }
        })()
        return () => {

        }
    }, []);

    return (
        <>
            <TopBar/>
            <Catalouge items={items}/>
        </>
    )
}

export default EStore;