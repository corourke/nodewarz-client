import React, {Component} from "react"
import {connect} from "react-redux"
import {Layer} from "react-konva"
import {List} from "immutable"
import Attack from "./Attack"
import { getNode, setNodeSelected, toggleNodeSelected } from "../reducers/nodes"
import { removeAttack } from "../reducers/attacks"
import pf from "pretty-format"

class Connectors extends Component {

    render() {
        return (
            <Layer>
                {
                    this.props.attacks.map(attack => {
                        let attackNode = getNode(this.props.nodes, attack.attackNodeId)
                        let targetNode = getNode(this.props.nodes, attack.targetNodeId)
                        return <Attack key={attack.id} attackNode={attackNode} targetNode={targetNode}
                                    // onClick={ () => this.props.onNodeClick(attack.id) }
                        />
                    })
                }
            </Layer>
        )

    }
}

const LinesContainer = connect(
    (state) => {
        return {
            attacks: state.get('attacks', List()).toJS(),
            nodes: state.get('nodes')
        }
    },
    (dispatch) => {
        return ({
            onNodeClick: (attackId) =>
                { dispatch(removeAttack(attackId)) }
        })
    }
)(Connectors)

export default LinesContainer



