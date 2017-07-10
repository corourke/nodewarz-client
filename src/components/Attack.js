import React, {Component} from "react"
import PropTypes from "prop-types"
import {Line, Circle, Wedge, Group} from "react-konva"
import Color from "color"

export default class Attack extends Component {

    constructor(...args) {
        super(...args)
    }

    render() {
        let a = this.props.attackNode
        let t = this.props.targetNode

        return (
            <Line
                points={[a.get('x'), a.get('y'), t.get('x'), t.get('y')]}
                stroke={"#CC7832"}
                strokeWidth={10}
                />
        )
    }
}