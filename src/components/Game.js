import React, {Component} from "react"
import Nodes from "./Nodes"
import Connectors from './Connectors'
import {Stage} from "react-konva"

class Game extends Component {

    render() {
        console.log("Game")
        console.log(JSON.stringify(this.props))
        return (
            <Stage width={700} height={700}>
                <Connectors />
                <Nodes/>
            </Stage>
        )
    }
}

// Note: Connectors will render underneath Nodes

export default Game
