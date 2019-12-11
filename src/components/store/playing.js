import React, { Component } from 'react';
import Gamepad from 'react-gamepad';

export default class Playing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: null,
            frame: null,
        };

        this.focusRef = React.createRef();
        this.focus = this.focus.bind(this)

    }

    focus() {
        this.focusRef.current.focus()
    }

    componentDidMount() {
        //console.log("Socket: " + this.props.ws)
        document.addEventListener("keydown", this.handleKeyPress, false)
        this.focusRef.current.focus();
        //console.log(document.activeElement);
    }

    componentDidUpdate(){
        //console.log(document.activeElement);
        this.focusRef.current.focus();
        //console.log(document.activeElement);
    }

    timeout = 250;

    sendMessage = (data) => {
        const  websocket  = this.props.ws // websocket instance passed as props to the child component.

        try {
            websocket.send(data) //send data to the server
        } catch (error) {
            console.log(error) // catch error
        }
    };

    handleKeyPress = (event) => {
        if(event.key === 'z' || event.key === 'Z')
            this.sendMessage(0);
        if(event.key === 'x' || event.key === 'X')
            this.sendMessage(1);
        if(event.key === 'q' || event.key === 'Q')
            this.sendMessage(2);
        if(event.key === 'w' || event.key === 'W')
            this.sendMessage(3);
        if(event.key === 'ArrowDown')
            this.sendMessage(4);
        if(event.key === 'ArrowUp')
            this.sendMessage(5);
        if(event.key === 'ArrowLeft')
            this.sendMessage(6);
        if(event.key === 'ArrowRight')
            this.sendMessage(7);
        if(event.key === 'a' || event.key === 'A')
            this.sendMessage(8);
        if(event.key === 's' || event.key === 'S')
            this.sendMessage(9);
        console.log("Key: " + event.key);
    }
    render() {
        //console.log(this.props.match.params.id)
        //console.log(this.state.frame)
        const userID = localStorage.getItem("uid")
        return (
            <div ref={this.focusRef} onKeyDown={this.handleKeyPress}>
                {this.props.frame && (
                    <Canvas frame={this.props.frame} />
                )}
            </div>
        )
    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        //console.log("Mount: "+ this.props.frame);
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
        }
        img.src = URL.createObjectURL(this.props.frame);

        //console.log("Active: " + document.activeElement.id)
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={1280} />
            </div>
        )
    }
}