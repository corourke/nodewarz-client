import React, {Component} from 'react'
import {Provider} from "react-redux"
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import configureStore from "../store/configureStore"
import Game from "./Game"
import LoginPage from "./LoginPage"
import './App.css'

const store = configureStore()

class App extends Component {

    render() {
        // TODO: If user not logged (no clientID) we need to go to login page
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute path="/game" component={Game} />
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App


const Links = () => (
    <nav id="nav_link">
        <Link id="home_link" to="/">Home</Link>
        <Link id="login_link" replace to="/login">Login</Link>
    </nav>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        store.getState().getIn(['game','userId']) !== null ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)
