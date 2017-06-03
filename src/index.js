import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import registerServiceWorker from "./registerServiceWorker"

import "./index.css"
import configureStore from "./store/configureStore"
import {addNode} from "./reducers/nodes"
import * as C from "./__test__/constants"

import App from "./components/App"
import Game from "./components/Game"


const store = configureStore()

// TODO: re-enable sockets

// const socket = io('http://localhost:7000');
//
// socket.on('action', function(action) {
//     console.log('action: ' + JSON.stringify(action))
//     store.dispatch(action)
// });
//
// socket.on('chat', function(msg) {
//     console.log('chat: ' + msg);
// });
//
// [
//     'connect',
//     'connect_error',
//     'connect_timeout',
//     'reconnect',
//     'reconnecting',
//     'reconnect_error',
//     'reconnect_failed'
// ].forEach(ev =>
//     socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
// );

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>
    , document.getElementById('gameCanvas')
)

store.dispatch(addNode(C.blue_node))
store.dispatch(addNode(C.blue_node2))
store.dispatch(addNode(C.green_node))
store.dispatch(addNode(C.red_node))
store.dispatch(addNode(C.red_node2))
