import React from 'react';
import './App.css';
import Navbar from './components/navigation/navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import login from './components/auth/login'
import signup from './components/auth/signup'
import landingPage from './components/home/landingPage'
import store from './components/store/store'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/login' component={login} />
        <Route exact path='/signup' component={signup} />
        <Route exact path='/' component={landingPage} />
        <Route exact path ='/store' component={store} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
