import { useState, useEffect, useContext } from 'react';
import {Form, Button, Alert} from 'react-bootstrap'
import {loginHandler, registerHandler} from '../services/service'
import UserContext from '../state/userContext'
import { setUserAction } from '../state/action'
import {loginFailed, regFailed, regSuccess} from './constants'
import {Redirect} from 'react-router-dom'

function LoginRegisterComponent(props) {
    const [login, setLogin] = useState(false)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [alertf, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState({})
    const { dispatch } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        return () => {

        }
    }, []);

    const changeMode = () =>{
        setLogin(!login)
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        if(login){
            if(username.length===0||password.length===0){
                alert("Please provide username and password")
            }
            else{
                let res = await loginHandler(username, password)
                if(!res){
                    setAlert(true)
                    setAlertMsg(loginFailed)
                } else {
                    dispatch(setUserAction(res))
                    setRedirect(true)
                }
            }
        } else {
            if(name.length===0||username.length===0||password.length===0){
                alert("Please provide name, username and password")
            }
            else{
                let res = await registerHandler(name, username, password)
                setAlert(true)
                if(!res){
                    setAlertMsg(regFailed)
                } else {
                    setAlertMsg(regSuccess)
                }
            }
        }
    }

    return (
        <div className="flexCenter">
            {redirect &&
                <Redirect to="/store"/>
            }
        <div className="customContainer xs-6">
             <Form>
                 <h4 className="shColor">ShopHere</h4>
                 {!login && 
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(event)=>{setName(event.target.value)}}/>
                    </Form.Group>
                 }
                 <Form.Group className="mb-3" controlId="username">
                     <Form.Label>Username</Form.Label>
                     <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
                 </Form.Group>

                 <Form.Group className="mb-3" controlId="password">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="Password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
                 </Form.Group>
                 <Button variant="primary" type="submit" onClick={event=>handleSubmit(event)}>
                     Submit
                 </Button>
                 <Form.Group className="m-2">
                    {login&&
                        <Button className="btn-light" onClick={changeMode}>
                            Register
                        </Button>
                    }
                    {!login&&
                        <Button className="btn-light" onClick={changeMode}>
                            Login
                        </Button>
                    }
                 </Form.Group>
             </Form>
            {alertf &&
                <Alert variant={alertMsg.variant} onClose={() => setAlert(false)} dismissible>
                    <p>
                        {alertMsg.msg}
                    </p>
                </Alert>
            } 
        </div>
     </div>
    )
}

export default LoginRegisterComponent;