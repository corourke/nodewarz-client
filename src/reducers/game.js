import {fromJS, List, Map} from 'immutable'
import * as C from './constants'

export default function reducer(state = C.INITIAL_GAME_STATE, action) {

    // eslint-disable-next-line
    switch (action.type) {
        case 'SET_CLIENT_ID':
            return state.set('clientId', action.clientId)

        case 'SET_CONNECTION_STATE':
            let newState = state.set('connection', Map({
                event: action.event,
                connected: action.connected,
                socket: action.socket
            }))
            if (action.event === 'disconnect') {
                return newState.set('clientId', 0)
            } else {
                return newState
            }

        case 'SET_USER_ID':
            return state.set('userId', action.userId)

    }
    return state
}

/* ACTION CREATORS */

export function setClientId(clientId) {
    return {type: 'SET_CLIENT_ID', clientId}
}

export function setConnectionState(event, connected, socket) {
    return {type: 'SET_CONNECTION_STATE', event, connected, socket}
}

export function setUserId(userId) {
    return {type: 'SET_USER_ID', userId}
}

