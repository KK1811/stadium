import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import login from './components/auth/login'
import signup from './components/auth/signup'
import landingPage from './components/home/landingPage'
import friends from './components/user/friends'
import gamedetails from './components/store/gamedetails'
import profile from './components/user/profile'
import loggedin from './components/auth/loggedin'
import logout from './components/auth/logout'
import Library from './components/store/library'
import buygame from './components/store/buygame'
import { Navbar } from './components/navigation/navbar'
// import logout from './components/auth/logout'
import test from './components/home/test'
import store from './components/store/store'
import Playing from './components/store/playing';
import friendDetails from './components/user/friendDetails';
import search from './components/navigation/search';
import chat from './components/user/chat';

function updateState(url){
  //console.log("Update: "+ url);
  this.setState({url: url, active: !this.state.active});
}

function closeConn(){
  this.state.ws.close();  
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null, 
      ws: null,
      frame: null,
      update: updateState.bind(this),
      close: closeConn.bind(this),
      active: true,
    }
  }

  componentDidMount(){
    //console.log("init: " + this.state.url);
    this.connect();
    //console.log("Frame")
  }

  componentDidUpdate(){
    if(this.state.ws === null){
      //console.log("init: " + this.state.url);
      this.connect();
    }
  }

  connect = () => {
    //console.log("WS: " + this.state.url);
    if(this.state.url === null)
      return
    var ws = new WebSocket(`${this.state.url}`);
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
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect();
  };

  sendMessage = (data) => {
    const { websocket } = this.state.ws // websocket instance passed as props to the child component.

    try {
      websocket.send(data) //send data to the server
    } catch (error) {
      console.log(error) // catch error
    }
  };

  timeout = 250;

  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <Navbar />
          <br></br><br></br><br></br>
          <Switch>
            <Route exact path='/friends' component={friends} />
            <Route exact path='/friend/:id' component={friendDetails} />
            <Route exact path='/search/:id' component={search} />
            <Route exact path='/friend/:fid/:uid/chat' component={chat} />
            <Route exact path='/gamestore/:id' component={gamedetails} />
            <Route exact path='/profile' component={profile} />
            <Route exact path='/login' component={login} />
            <Route exact path='/loggedin' component={loggedin} />
            <Route exact path='/signup' component={signup} />
            <Route exact path='/' component={landingPage} />
            <Route exact path='/logout' component={logout} />
            <Route exact path='/library' component={Library} />
            <Route exact path='/gamestore/:id/buy' component={buygame} />
            <Route exact path='/gamestore/:id/play' render={(props) => <Playing {...props} ws={this.state.ws} frame={this.state.frame} url={this.state.url} update={this.state.update} active={this.state.active} close={this.state.close}/>}/>
            <Route exact path='/test/:in' component={test} />
            <Route exact path='/store/:id' component={store} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
