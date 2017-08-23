/**
 * Created by oliver on 8/13/17.
 */
import React  from 'react';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {setUserId} from "../reducers/game"

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="loginpage_div">
                <p id="login_title">GlowBitz Login</p>
                <p id="usernameText">username:</p>
                <input id="usernameInput" type="text"/>
                <p id="passwordText">password:</p>
                <input id="passwordInput" type="text"/>
                <button id="loginButton" onClick={this.handleLogin.bind(this)}>Submit</button>
            </div>
        )
    }

    handleLogin(event) {
        let username = document.getElementById('usernameInput').value
        if (username !== '' && this.props.connection.get('connected') === true) {
            this.props.connection.get('socket').emit('login', username)
            // TODO: set a loginState to 'loggingIn' rather than setting username
            this.props.dispatch(setUserId(username))
            this.props.history.push('/game')
        }
    }
}

export default connect( (state) => {
    console.log("LoginPage state: ", state.getIn(['game','connection']).toJSON())
    return {connection: state.getIn(['game','connection']) }
})(LoginPage)


