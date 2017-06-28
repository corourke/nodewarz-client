import React, {Component} from "react"
import PropTypes from "prop-types"
import {Circle, Wedge, Group} from "react-konva"
import Color from "color"

export default class Node extends Component {

    static propTypes = {
        x: PropTypes.number,
        y: PropTypes.number,
        size: PropTypes.number,
        health: PropTypes.number,
        color: PropTypes.string
    }

    static defaultProps = {
        x: 100, y: 100, size: 50, health: 50, color: "grey"
    }

    constructor(...args) {
        super(...args)
        console.log("Node constructor (props):")
        console.log(JSON.stringify(this.props))
    }

    render() {
        // console.log("Node (props):")
        // console.log(JSON.stringify(this.props))
        // TODO: Temporary color assignment
        // TODO: Use colors from color table, not saturate, lighten
        var useColor = this.props.color
        switch(this.props.owner) {
            case 0:
                useColor = "#7BBC9B"
                break
            case 1:
                useColor = "#3497B5"
                break
            case 2:
                useColor = "#A43234"
                break
            default:
                useColor = "grey"
        }
        return (
            <Group onClick={this.props.onClick}>
                <Circle name="outerCircle"
                        x={this.props.x} y={this.props.y} radius={this.props.size}
                        fill={useColor}
                        shadowBlur={10} shadowColor={useColor}
                />
                <Wedge name="health"
                       x={this.props.x} y={this.props.y} radius={this.props.size}
                       angle={(1-(this.props.health / this.props.size)) * 360} fill={"grey"} rotation={-90}
                />
                <Circle name="innerCircle"
                        x={this.props.x} y={this.props.y} radius={this.props.size * 0.7}
                        fill={Color(useColor).saturate(0.2).lighten(0.4)}
                />
                <Wedge x={this.props.x} y={this.props.y} radius={this.props.size}
                       angle={180} rotation={125} fill={"black"} opacity={0.08}
                />
                <Circle name={"select"}
                        x={this.props.x} y={this.props.y} radius={this.props.size}
                        fillEnabled={false} strokeScaleEnabled={false}
                        stroke={"white"} strokeWidth={5} visible={this.props.selected}
                />
            </Group>
        )
    }
}


//
// function NodeGraphic(x, y, r, c) {
//
//     var w = 15; // border width
//     var _selectable = true;
//
//     // For blinking behavior
//     var blinking = false;
//     var brighter = false;
//     var glowing = false;
//     var blinkingColor = this.baseColor;
//     var originalColor = new Color(c);
//     var glowingColor = this.baseColor;
//
//
//     var outerNode = new Path.Circle({
//         center: new Point(x, y),
//         radius: r + w, // border width is 15px
//         shadowColor: c,
//         shadowBlur: 80,
//         shadowOffset: new Point(0, 0),
//         name: 'outerNode'
//     });
//
//     var innerNode = new Path.Circle({
//         center: new Point(x, y),
//         radius: r,
//         name: 'innerNode'
//     });
//
//     var arcNode = createArc(x, y, r + w, c);
//
//     // Make the shield icon
//     var shieldPathData = "M42.821,6.161L23.453,0.113c-0.486-0.151-1.006-0.151-1.492,0L2.593,6.161c-1.045,0.326-1.758,1.294-1.758,2.39"
//         + " c0,26.781,13.531,33.182,20.801,36.621c0.339,0.16,0.705,0.24,1.071,0.24s0.731-0.08,1.069-0.24"
//         + " c7.271-3.438,20.802-9.84,20.802-36.621C44.579,7.456,43.866,6.488,42.821,6.161z M22.707,40.137";
//     var shield = new Path({
//         pathData: shieldPathData,
//         fillColor: new Color(1.0, .8),
//         scale: 2.1,
//         position: new Point(x, y+2),
//         //strokeWidth: 3,
//         //strokeColor: new Color(1.0, .35),
//         //shadowColor: 'white',
//         //shadowBlur: 20,
//         shadowOffset: new Point(0, 0)
//     });
//     shield.visible = false;
//
//     // Make the damage indicator (text)
//     var damageText = new PointText({
//         point: new Point(x, y + 10),
//         //content: _health,
//         fillColor: 'white',
//         opacity: 0.5,
//         justification: 'center',
//         fontFamily: 'Gill Sans',
//         fontWeight: 'normal',
//         fontSize: 24
//     });
//
//     // Make a transparent circle over the node as a consistent target for mouse events
//     var mouseTarget = new Path.Circle({
//         center: new Point(x, y),
//         radius: r + w,
//         fillColor: new Color(1, 0.001),
//         name: 'mouseTarget'
//     });
//
//     setBaseColor(c);
//
//     // Make the select circle and hide it
//     var selectNode = new Path.Circle({
//         center: new Point(x, y),
//         radius: r + w,
//         strokeColor: 'white',
//         strokeWidth: 3,
//         shadowColor: 'white',
//         shadowBlur: 40,
//         shadowOffset: new Point(0, 0)
//     });
//     selectNode.visible = false;
//
//     // Make the targeting circle and hide it
//     var targetCircle = new Path.Circle({
//         center: new Point(x, y),
//         radius: r + w,
//         strokeColor: 'orange',
//         strokeWidth: 3,
//         shadowColor: 'orange',
//         shadowBlur: 40,
//         shadowOffset: new Point(0, 0)
//     });
//     targetCircle.visible = false;
//
//
//     Group.call(this, [outerNode, innerNode, arcNode, shield, damageText, selectNode, targetCircle, mouseTarget]);
//
//
//     // ACCESSORS
//     Object.defineProperty(this, "owner", {
//         get: function () {
//             return _owner;
//         },
//         set: function (owner) {
//             _owner = owner;
//             switch (_owner) {
//                 case 1:
//                     // Owner 1: set the node color to blue
//                     setBaseColor('#4286f4')
//                     break;
//                 case 2:
//                     // Owner 2: set the node color to red
//                     setBaseColor('#df5767')
//                     break;
//                 default:
//                     // Set the node color to green
//                     setBaseColor('green')
//             }
//         }
//     });
//     Object.defineProperty(this, "owned", {
//         // The notion of 'owned' is whether there is an owner
//         get: function () {
//             return _owner !== 0;
//         }
//     });
//     Object.defineProperty(this, "isSelectable", {
//         get: () => _selectable,
//         set: (b) => _selectable = b
//     });
//     Object.defineProperty(this, "selected", {
//         get: function () {
//             return selectNode.visible;
//         },
//         set: function (_selected) {
//             selectNode.visible = _selectable ? _selected : false;
//         }
//     });
//     Object.defineProperty(this, "targeted", {
//         get: function () {
//             return targetCircle.visible;
//         },
//         set: function (_targeted) {
//             targetCircle.visible = _targeted;
//         }
//     });
//     Object.defineProperty(this, "shielded", {
//         get: function () {
//             return shield.visible;
//         },
//         set: function (_shielded) {
//             shield.visible = _shielded;
//             damageText.fillColor = _shielded ? 'black' : 'white';
//         }
//     });
//     Object.defineProperty(this, "health", {
//         get: function () {
//             return _health;
//         },
//         set: function (amount) {
//             _health = amount;
//             if (_health <= 0) damageText.content = ""
//             else damageText.content = _health.toString();
//         }
//     });
//     Object.defineProperty(this, "baseColor", {
//         get: function () {
//             return outerNode.fillColor;
//         },
//         set: function (_color) {
//             setBaseColor(_color);
//         }
//     });
//
//     Object.defineProperty(this, "blinking", {
//         get: function () {
//             return blinking;
//         },
//         set: function (_blinking) {
//             blinking = _blinking;
//             if (blinking) {
//                 originalColor = this.baseColor;
//                 blinkingColor = this.baseColor;
//             } else {
//                 setBaseColor(originalColor)
//             }
//         }
//     });
//
//
//     Object.defineProperty(this, "glowing", {
//         get: function () {
//             return glowing;
//         },
//         set: function (_glowing) {
//             glowing = _glowing;
//             if (glowing) {
//                 glowingColor = new Color(this.baseColor);
//                 glowingColor.brightness = 1.0;
//                 setBaseColor(glowingColor);
//             } else {
//                 setBaseColor(originalColor);
//             }
//         }
//     });
//
//
//
//     // PRIVATE FUNCTIONS
//
//     function setBaseColor(c) {
//         outerNode.fillColor = c;
//         // If the node color is a shade of grey (no saturation) shadow color must be white
//         if (outerNode.fillColor.saturation == 0) {
//             outerNode.shadowColor = new Color(.7);
//         } else {
//             outerNode.shadowColor = c;
//             outerNode.shadowColor.brightness = 1; // Boost the shadow brightness to max
//             outerNode.shadowColor.saturation = 1; // Boost the shadow color saturation
//         }
//         innerNode.fillColor = c;
//         innerNode.fillColor.brightness += .07;
//         innerNode.fillColor.saturation -= .1;
//         arcNode.fillColor = c;
//         arcNode.fillColor.alpha = 0.3;
//         arcNode.blendMode = 'multiply';
//     };
//
//     // Draws the half circle
//     function createArc(x, y, r) {
//         // Draw the outside curve of a half-circle
//         var start = new Point(x, y - r);
//         var through = new Point(x - r, y);
//         var to = new Point(x, y + r);
//         var arcNode = Path.Arc(start, through, to);
//         // Draw the flat line
//         arcNode.add(new Point(x, y));
//         arcNode.add(new Point(x, y - r));
//         arcNode.rotate(45, new Point(x, y));
//         arcNode.name = 'arcNode';
//         return arcNode;
//     };
//
//     // Handles any Node animation
//     this.onFrame = function (event) {
//         if (this.blinking) {
//             if (blinkingColor.brightness <= 0.45) {
//                 brighter = true;
//             } else if (blinkingColor.brightness >= 0.80) {
//                 brighter = false;
//             }
//
//             if (brighter == false) {
//                 blinkingColor.brightness -= 0.01;
//             } else if (brighter == true) {
//                 blinkingColor.brightness += 0.01;
//             }
//             setBaseColor(blinkingColor);
//         }
//     };
// }
//
// NodeGraphic.prototype = Object.create(Group.prototype);
// NodeGraphic.prototype.constructor = Group;
