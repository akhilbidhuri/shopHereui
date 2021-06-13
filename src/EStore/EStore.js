import { useState, useEffect, useContext } from 'react';
import TopBar from './components/TopBar'
import UserContext from '../state/userContext'
import { getItems } from '../services/service'
import Catalouge from './components/Catalouge';
import { Redirect } from 'react-router-dom'

function EStore(props) {
    const { state } = useContext(UserContext);
    const [items, setItems] = useState([])
    const [redirect, setRedirect] = useState(false)

    useEffect(async() => {
        if(state.logout){
            setRedirect(true)
        }
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
            {redirect &&
                <Redirect to="/"/>
            }
            <TopBar/>
            <Catalouge items={items}/>
        </>
    )
}

export default EStore;