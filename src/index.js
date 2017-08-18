import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import registerServiceWorker from "./registerServiceWorker"
import io from 'socket.io-client'

import "./index.css"
import configureStore from "./store/configureStore"
import {checkForAttack} from "./store/actors"
import {addNode} from "./reducers/nodes"
import { setConnectionState } from "./reducers/game"


import App from "./components/App"
import Game from "./components/Game"


const store = configureStore()


// TODO: I don't like this here
// An array of actor functions taking a `state` object and `dispatch` function
// See: http://jamesknelson.com/join-the-dark-side-of-the-flux-responding-to-actions-with-actors/
var actors = [checkForAttack]

var acting = false
store.subscribe(function() {
    // Ensure that any action dispatched by actors do not result in a new
    // actor run, allowing actors to dispatch with impunity.
    if (!acting) {
        acting = true
        actors.forEach(function(actor) {
            actor(store.getState(), store.dispatch)
        })
        acting = false
    }
})

const socket = io('http://localhost:7000');

socket.on('action', function(action) {
    console.log('Received action: ' + JSON.stringify(action))
    store.dispatch(action)
});

socket.on('state', function(state) {
    console.log("Received state (IGNORING)"
        // + pf(state)
    )
})

socket.on('chat', function(msg) {
    console.log('chat: ' + msg);
});

[
    'connect',
    'disconnect',
    'connect_error',
    'connect_timeout',
    // 'reconnect',
    // 'reconnecting',
    // 'reconnect_error',
    'reconnect_failed'
].forEach(ev =>
    socket.on(ev, () => {
        store.dispatch(setConnectionState(ev, socket.connected))
        if (ev === 'connect') {
            // TODO: This needs to be moved to the login page
            socket.emit('login', 'dummy_user_info')
        }
    })
);


export function sendAction(action) {
    socket.emit('action', action);
}


ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()



// store.dispatch(addNode(C.blue_node))
// store.dispatch(addNode(C.blue_node2))
// store.dispatch(addNode(C.green_node))
// store.dispatch(addNode(C.red_node))
// store.dispatch(addNode(C.red_node2))
