import React, { Component } from 'react'
import { BASE_URL } from '../../constants'
import { isFunctionParent } from '@babel/types';
import './chat.css';

class Chat extends Component {
    state = {
        chatLink: '',
        roomName: null,
        userName: null,
        cs: null,
    }

//     connect = () => {
//         var host = BASE_URL;
//         var chatSocket = new WebSocket(
//             'ws://' + host +
//             '/ws/chat/' + this.state.roomName + '/');
//         this.setState({ cs: chatSocket });

//         chatSocket.onmessage = function (e) {
//             var data = JSON.parse(e.data);
//             var message = data['message'];
//             this.refs.log.value += (message + '\n');
//         };

//         chatSocket.onclose = function (e) {
//             console.error('Chat socket closed unexpectedly');
//         };
//     }

//     handleKey(event) {
//         if (event.key === 'Enter') {  // enter, return
//             this.refs.submit.click();
//         }
//     }

//     handleClick(event) {
//         console.log(this);
//         var inputDOM = this.refs.input;
//         var inp = inputDOM.value;
//         if (inp) {
//             var message = this.state.userName.concat(" : ", inp);
//             this.state.cs.send(JSON.stringify({
//                 'message': message
//             }));

//             inputDOM.value = '';
//         };
//     }

    // this.state.chatLink = this._chat() 
    createLink = (a, b) => {
        if (a > b){
            return a + '_' + b;
        }
        else{
            return b + '_' + a;
        }
    }
    websocURL = 'ws://' + '10.0.35.200:8000' + '/ws/chat/' + this.createLink(this.props.match.params.fid, this.props.match.params.uid).toString() + '/';
    ws = new WebSocket(this.websocURL);

    componentDidMount = () => {
        this.ws.onopen = () => {
            console.log("connected to " + this.websocURL);
        }
        this.ws.onmessage = (e) =>{
            var data = JSON.parse(e.data);
            var message = data['message'];
            console.log(message);
            var comp = document.createElement("DIV");
            if (message.startsWith(localStorage.getItem("uname") + ' :')){
                comp.setAttribute("class", "response col col-4 align-self-end"); 
                message = message.substring(localStorage.getItem("uname").length + 2);
            }
            else{
                comp.setAttribute("class", "reply col col-4 align-self-start");
                message = message.substring(message.indexOf(':') + 1);
            }
            comp.innerHTML = message;
            this.refs.log.appendChild(comp);
        }
        this.ws.onclose = (e) =>{
            console.error('Channel closed unexpectedly');
            
        }

    }
    handleClick = (e) =>{
        var messageInputDom = this.refs.input;
        var inp = messageInputDom.value;
        if (inp.length == 0){
            return;
        }
        var currUser = localStorage.getItem("uname").toString();
        var mess = currUser.concat(" : ", inp);
        this.ws.send(JSON.stringify({
            'message' : mess
        }));
        messageInputDom.value = '';
    }

    handleKey = (e) => {
        if(e.keyCode == 13){
           this.handleClick(' ');
        }
     }
render(){
    var { chatLink } = this.state
    // chatLink = this._chat()
    console.log(chatLink)
    return (
        <div className="container">
            {/* <textarea ref="log" cols="100" rows="20" className="container"></textarea><br/><br/> */}
            <div ref="log" className="container border border-primary col" style={{"padding":"5%"}}></div><br/><br/>
            <input autoFocus ref="input" type="text" size="100" onKeyUp={this.handleKey} placeholder="Enter Message" className="form-control container" /><br /><br/>
            <input ref="submit" type="button" value="Send" onClick={this.handleClick} className="btn btn-primary" />
        </div>
    )
}
    


    // _chat = () => {
    //     var fid = this.props.match.params.fid
    //     var uid = this.props.match.params.uid
    //     var chatLink = ''
    //     if (uid > fid) {
    //         chatLink = fid + '_' + uid
    //         console.log(chatLink)
    //     }
    //     if (uid < fid) {
    //         chatLink = uid + '_' + fid
    //         console.log(chatLink)
    //     }
    //     return chatLink
    // }
}

export default Chat