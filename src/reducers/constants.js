import {fromJS} from 'immutable';

/* What the store should look like:

client: { // Local game client state
    connection: {
            state: "unknown",
            connected: false
    },
    clientId: 0,
    userId: 0
},
state: {  // Shared stated across all game clients
    gameId: 0,
    nodes: [],
    connections: [],
    attacks: [],
    users: []
},
map: {
    mapId: 0,
    nameName: null,
    nodes: [],
    connections: []
}

Server Side:
users: [],
maps: [],
games: []

 */

export const INITIAL_GAME_STATE = fromJS({
    clientId: 0,
    connection: {
        event: "unknown",
        connected: false,
        socket: null
    },
    userId: null
})

export const INITIAL_STATE = fromJS({
    game: INITIAL_GAME_STATE,
    nodes: [],
    connections: [],
    attacks: []
});

export const DEFAULT_NODE = fromJS({
    id: 0,
    size: 30,
    health: 0,
    power: 3,
    owner: 0,
    x: 100,
    y: 100,
    color: "#999999",
    selected: false
});
