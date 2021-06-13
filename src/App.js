import './App.css';
import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginRegister from './LoginRegister/LoginRegister'
import EStore from './EStore/EStore'
import userContext from './state/userContext'

function PrivateRoute({ children, ...rest }) {
  const { state } = useContext(userContext)
  let auth = state.user!=null&&!state.logout;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
       <Switch>
          <Route exact path="/">
            <LoginRegister />
          </Route>
          <PrivateRoute exact path="/store">
            <EStore />
          </PrivateRoute>
        </Switch>
    </Router>
  );
}

export default App;
