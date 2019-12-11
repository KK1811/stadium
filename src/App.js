import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import login from './components/auth/login'
import signup from './components/auth/signup'
import landingPage from './components/home/landingPage'
import gamestore from './components/store/gamestore'
import merchstore from './components/store/merchstore'
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      frame: null,
    }
  }

  componentDidMount(){
    this.connect();
    console.log("Frame")
  }

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

  render() {
    return (

      <div className="App">
        <BrowserRouter>
          <Navbar />
          <br></br><br></br><br></br>
          <Switch>
            <Route exact path='/friends' component={friends} />
            <Route exact path='/gamestore/:id' component={gamedetails} />
            <Route exact path='/profile' component={profile} />
            <Route exact path='/login' component={login} />
            <Route exact path='/loggedin' component={loggedin} />
            <Route exact path='/signup' component={signup} />
            <Route exact path='/' component={landingPage} />
            <Route exact path='/gamestore' component={gamestore} />
            <Route exact path='/merchstore' component={merchstore} />
            <Route exact path='/logout' component={logout} />
            <Route exact path='/library' component={Library} />
            <Route exact path='/gamestore/:id/buy' component={buygame} />
            <Route exact path='/gamestore/:id/play' render={(props) => <Playing {...props} ws={this.state.ws} frame={this.state.frame} />}/>
            <Route exact path='/test/:in' component={test} />
            <Route exact path='/store/:id' component={store} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
