import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root';
import { INITIAL_STATE } from "../reducers/constants"

let store;
export default () => {
    if (store) {
        return store;
    }
    store = makeStore();
    return store;
};

// To make a new store for testing
export function makeStore(initialState = INITIAL_STATE) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension()
        )
    )
}
