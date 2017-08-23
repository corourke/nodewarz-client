import React, {Component, PropTypes} from "react"
import Nodes from "./Nodes"
import Connectors from './Connectors'
import {Stage} from "react-konva"

class Game extends Component {

    // componentWillMount() {
    //     if(this.context.store.getState().getIn(['game','clientId']) === 0) {
    //         this.props.history.push('/login')
    //     }
    // }

    render() {
        console.log("Game: props: ", this.props)
        console.log("Game: clientId: ", this.context.store.getState().toString())

        return (
            <Stage width={700} height={700}>
                <Connectors />
                <Nodes/>
            </Stage>
        )
    }

    static contextTypes = {
        store: PropTypes.object.isRequired
    }
}

// Note: Connectors will render underneath Nodes

export default Game
