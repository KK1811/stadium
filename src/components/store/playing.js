import React, { Component } from 'react';
import Gamepad from 'react-gamepad';

export default class Playing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: null,
            frame: null,
        };
    }

    componentDidMount() {
        this.connect();
    }

    timeout = 250;

    connect = () => {
        var ws = new WebSocket("ws://10.0.34.155:8000");
        let that = this;
        var connectInterval;

        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ ws: ws });

            that.timeout = 250;
            clearTimeout(connectInterval);
        };

        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout;
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout));
        };

        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };

        ws.onmessage = evt => {
            // Start reading the blob as text.
            this.setState({ frame: evt.data })
            //console.log("Blob: "+ this.state.frame);
        };
    };

    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect();
    };

    sendMessage = (data) => {
        const { websocket } = this.state.ws // websocket instance passed as props to the child component.

        try {
            websocket.send(data) //send data to the server
        } catch (error) {
            console.log(error) // catch error
        }
    };

    buttonMapping = ['A', 'B', 'Select', 'Start', 'Down', 'Up', 'Left', 'Right', 'L', 'R']

    clickA() {
        this.sendMessage(0);
    }

    clickB() {
        this.sendMessage(1);
    }

    clickSelect() {
        this.sendMessage(2);
    }

    clickStart() {
        this.sendMessage(3);
    }

    clickDown() {
        this.sendMessage(4);
    }

    clickUp() {
        this.sendMessage(5);
    }

    clickLeft() {
        this.sendMessage(6);
    }

    clickRight() {
        this.sendMessage(7);
    }

    clickL() {
        this.sendMessage(8);
    }

    clickR() {
        this.sendMessage(9);
    }

    connectHandler(gamepadIndex) {
        console.log(`Gamepad ${gamepadIndex} connected`);
    }

    disconnectHandler(gamepadIndex) {
        console.log(`Gamepad ${gamepadIndex} disconnected !`)
    }

    buttonChangeHandler(buttonName, down) {
        console.log(buttonName, down)
    }

    axisChangeHandler(axisName, value, previousValue) {
        console.log(axisName, value)
    }

    buttonDownHandler(buttonName) {
        console.log(buttonName, 'down')
    }

    buttonUpHandler(buttonName) {
        console.log(buttonName, 'up')
    }
    render() {
        //console.log(this.props.match.params.id)
        //console.log(this.state.frame)
        const userID = localStorage.getItem("uid")
        return (
            <div>
                {this.state.frame && (
                    <Canvas frame={this.state.frame} />
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
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={1280} />
            </div>
        )
    }
}