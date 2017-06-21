import thunk from "redux-thunk"
import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

import {fromJS, Map} from "immutable"
import {getSelectedNodes, toggleNodeSelected} from "../reducers/nodes"


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
            applyMiddleware(thunk, attackChecker)
        )
    )
}

const attackChecker = store => next => action => {
    // console.log('dispatching', action.type)
    if(action.type === 'TOGGLE_NODE_SELECTED') {
        let selectedNodes = getSelectedNodes(store)
        // TODO: This won't work because the nodes won't be selected until after the action is dispatched
        // The way this needs to happen is:
        // If we already have 1 node selected
        //   Is the new node we are trying to select valid? That is, it is a neutral or enemy node
        //     If so dispatch an attack and ignore the selection action (keeping one selected)
        //   Otherwise ignore the invalid selection action
        // Otherwise, pass through the selection action
        if (selectedNodes.size > 1) console.log('attack!')
        // TODO: clear all selected without using toggleNodeSelected!
        //selectedNodes.forEach((node) => store.dispatch(toggleNodeSelected(node.get('id'))));
    }
    let result = next(action)
    return result
}

