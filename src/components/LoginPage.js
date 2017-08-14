/**
 * Created by oliver on 8/13/17.
 */
import React, {Component}  from 'react';

export default () => {
    console.log("LoginPage")
    return (
        <div id="loginpage_div">
            <p id="login_title">GlowBitz Login</p>
            <p id="usernameText">username:</p>
            <input id="usernameInput" type="text"/>
            <p id="passwordText">password:</p>
            <input id="passwordInput" type="text"/>
            <button id="loginButton" onClick={null}>Submit</button>
        </div>
    )
}
