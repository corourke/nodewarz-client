import {Map, List, fromJS} from "immutable"

const INITIAL_STATE = fromJS(new List());

const DEFAULT_NODE = fromJS({
    id: 0,
    size: 30,
    health: 0,
    power: 3,
    owner: 0,
    x: 100,
    y: 100
});

export default function reducer(state = INITIAL_STATE, action) {
    // eslint-disable-next-line
    switch (action.type) {
        case 'ADD_NODE':
            const node = DEFAULT_NODE.merge(action.node)
            const node2 = (node.get('id') === 0) ? node.set('id', nextNodeId(state)) : node
            return state.push(Map(node2))

        case 'SELECT_NODE':
            console.log('SELECT_NODE: ' + action.nodeId)
            return state

        case 'SET_NODE_PROPS':
            const nodeId = action.nodeProps.id
            const nodeIndex = state.findIndex(
                (node) => node.get('id') === nodeId)
            return state.mergeDeepIn(['nodes', nodeIndex], action.nodeProps)

    }
    return state
}

/* ACTION CREATORS */


export function addNode(_node) {
    return {type: 'ADD_NODE', node: _node}
}

export function setNodeProps(_np) {
    return {type: 'SET_NODE_PROPS', nodeProps: _np}
}


/* SELECTORS */

export function selectNodeList(state) {
    if (List.isList(state)) {
        return state                // Assume a list of nodes
    } else if (Map.isMap(state)) {
        return state.get('nodes')   // Assume redux state
    } else {                        // Assume redux store
        return state.getState().get('nodes')
    }
}

export function getNode(state, nodeId) {
    const nodeList = selectNodeList(state)
    return nodeList.find((node) => node.get('id') === nodeId)
}

export function nextNodeId(state) {
    const nodeList = selectNodeList(state)
    let maxNode = nodeList.max( (_a, _b) => {
            const a = _a.get('id'), b = _b.get('id')
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            if (a === b) { return 0; }
        })

    return maxNode.get('id')+1
}
