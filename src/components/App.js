import React, {Component} from 'react';
import {Provider} from "react-redux"
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import configureStore from "../store/configureStore"
import Game from "./Game"
import LoginPage from "./LoginPage"


import './App.css';

const store = configureStore();

class App extends Component {
    render() {
        // TODO: If user not logged (no clientID) we need to go to login page
        return (
            <BrowserRouter>

                    <Switch>
                        <Route exact path="/" render={ () => (
                            <Provider store={store}>
                                <Game />
                            </Provider>
                        )} />
                        <Route path="/login" component={LoginPage}/>
                    </Switch>

            </BrowserRouter>
        );
    }
}

export default App;


const Links = () => (
    <nav id="nav_link">
        <Link id="home_link" to="/">Home</Link>
        <Link id="login_link" replace to="/login">Login</Link>
    </nav>
);
