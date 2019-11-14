import React from 'react';
import './App.css';
import Navbar from './components/navigation/navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import login from './components/auth/login'
import landingPage from './components/home/landingPage'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/login' component={login} />
        <Route exact path='/signup' component={login} />
        <Route exact path='/' component={landingPage} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
