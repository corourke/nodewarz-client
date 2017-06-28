import thunk from "redux-thunk"
import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {fromJS, Map} from "immutable"
import {getNode, getSelectedNodes, toggleNodeSelected} from "../reducers/nodes"
import {sendAction} from "../index.js"


import rootReducer from "../reducers/root"

let store
export default () => {
    if (store) {
        return store
    }
    store = makeStore()
    return store
};

// To make a new store for testing
// TODO: should initial state have placeholders?
export function makeStore(initialState = new Map()) {
    return createStore(
        rootReducer,
        fromJS(initialState),
        composeWithDevTools(
            applyMiddleware(thunk, propagateActions)
        )
    )
}

const propagateActions = store => next => action => {
    // Before action.

    let result = next(action)
    // After action. To see result of the current action store.getState()

    switch(action.type) {
        case 'NEW_ATTACK':
            console.log('Propagating attack', action)
            sendAction(action)
    }

    return result
}

