import React, {Component} from "react"
import {connect} from "react-redux"
import {Layer} from "react-konva"
import {List} from "immutable"
import Node from "./Node"
import { setNodeSelected, toggleNodeSelected } from "../reducers/nodes"
import pf from "pretty-format"

class Nodes extends Component {

    render() {
        // console.log("Nodes (props)")
        // console.log(JSON.stringify(this.props))
        return (
            <Layer>
                {
                    this.props.nodes.map(node => {
                        return <Node key={node.id} x={node.x} y={node.y} size={node.size} health={node.health}
                                     color={node.color} selected={node.selected || false}
                                     onClick={ () => this.props.onNodeClick(node.id) }
                                     // onClick={ () => handleClick(node.id)}
                        />
                    })
                }
            </Layer>
        )

    }
}

function handleClick(nodeId) {
    console.log('CLICK: ' + nodeId)
}

const NodesContainer = connect(
    (state) => {
        // console.log("Nodes (state)")
        // console.log(pf(state));
        return {
            nodes: state.get('nodes', List()).toJS()
        }
    },
    (dispatch) => {
        return ({
            onNodeClick: (id) => { dispatch(toggleNodeSelected(id)) }
        })
    }
)(Nodes)

export default NodesContainer



