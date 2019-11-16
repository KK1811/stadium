import React, { Component } from 'react'
import { AUTH_TOKEN } from './constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(email: $username, password: $password) {
      token
    }
  }
`


class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  render() {
    const { username, password} = this.state
    return (
      <div className="container col-sm-5 card border-primary" >
        <br></br><h4>Login</h4><br></br>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            className="form-control"
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="email"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
          <br></br>
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            className="form-control"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </div>
        <br></br>
        <div className="flex mt3">
        <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ username, password }}
            onCompleted={data => this._confirm(data)}
        >
            {login => (
            <button className="btn btn-primary" onClick={login}>
                {'Login'}
            </button>
            )}

        </Mutation>
        <br></br><br></br>
        
        <p>Dont have an accout? <Link to="/signup">Signup</Link> </p>
        
        </div>
      </div>
    )
  }

  _confirm = async data => {
    console.log(data.tokenAuth.token)
    const token = data.tokenAuth.token
    console.log(token)
    this._saveUserData(token)
    this.props.history.push(`/`)
  }
  

  _saveUserData = token => {
    localStorage.setItem("token", token)
<<<<<<< HEAD
    console.log(localStorage["token"])
    var aValue = localStorage.getItem("token");
    console.log(aValue)
    // localStorage.removeItem(AUTH_TOKEN)
    // console.log(AUTH_TOKEN)

    // localStorage.setItem('bgcolor', 'red');
    // var currentColor = localStorage.getItem('bgcolor');
    // console.log(currentColor)
=======
    console.log("Token: "+localStorage["token"])
    var aValue = localStorage.getItem("token");
    console.log("Token: "+aValue)
>>>>>>> 8640fad553a6af75cebaccdb015cd82c37d8f0fb
  }
}

export default Login
