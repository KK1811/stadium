import React from 'react';
import './styles/App.css';
import Navbar from './components/navigation/navbar';
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
// import logout from './components/auth/logout'

function App() {
  // _reload = () => {window.location.reload()}
  return (
    
    <div className="App">
    <BrowserRouter>
      {/*<Navbar /> */}
      {/* <br></br><br></br><br></br> */}
      <Switch>
        <Route exact path = '/friends' component={friends} />
        <Route exact path = '/gamestore/:id' component={gamedetails} />
        <Route exact path = '/profile' component={profile} />
        <Route exact path='/login' component={login} />
        <Route exact path='/loggedin' component={loggedin} />
        <Route exact path='/signup' component={signup} />
        <Route exact path='/' component={landingPage} />
        <Route exact path ='/gamestore' component={gamestore} />
        <Route exact path ='/merchstore' component={merchstore} />
        {/* <Route exact path='/logout' component={logout} /> */}
      </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
