import {getSelectedNodes, setNodeSelected} from "../reducers/nodes"
import {newAttack} from "../reducers/attacks"

export function checkForAttack(state, dispatch) {
    let selectedNodes = getSelectedNodes(state)
    let userId = state.getIn(['game', 'userId'])

    if (selectedNodes.size === 1) {
        let node = selectedNodes.get(0)
        if (node.get('owner') !== userId) {
            // console.log("Stopping node selection because I don't own it")
            dispatch(setNodeSelected(node.get('id'), false))
        }
    }

    if (selectedNodes.size == 2) {

        console.log('attack!')
        // Figure out which of the selected nodes is the attacking node
        let attackNodeIndex = selectedNodes.findIndex((node) => node.get('owner') === userId)
        let targetNodeIndex = attackNodeIndex === 0 ? 1 : 0

        if(selectedNodes.get(targetNodeIndex).get('owner') === userId) {
            console.log("assist!!!")
        }

        let attackNodeId = selectedNodes.getIn([attackNodeIndex, 'id'])
        let targetNodeId = selectedNodes.getIn([targetNodeIndex, 'id'])

        dispatch(newAttack(attackNodeId, targetNodeId))
        dispatch(setNodeSelected(targetNodeId, false))
    }
}