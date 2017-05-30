import React, {Component} from "react"
import {connect} from "react-redux"
import {Layer, Stage} from "react-konva"
import {List} from "immutable"
import Node from "./Node"

class Nodes extends Component {

    render() {
        console.log("Nodes (props)")
        console.log(JSON.stringify(this.props))
        return (
            <Layer>
                {
                    this.props.nodes.map(node => {
                        return <Node key={node.id} x={node.x} y={node.y} size={node.size} health={node.health}
                                     color={node.color}
                                     // onClick={() => this.props.onNodeClick(node.id)}
                                    onClick={ () => handleClick(node.id)}
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
        return {
            nodes: state.network.get('nodes', List()).toJS()
        }
    },
    (dispatch) => {
        return ({
            onNodeClick: (id) => { dispatch({type: 'SELECT_NODE', nodeId: id}) }
        })
    }
)(Nodes)

export default NodesContainer



