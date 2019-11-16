import React, { Component } from 'react'
import { AUTH_TOKEN } from './constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';

// import { Link } from 'react-router-dom'


// const SIGNUP_MUTATION = gql`
//   mutation SignupMutation($username: String!, $password: String!) {
//     signup(username: $username, password: $password) {
//       token
//     }
//   }
// `

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(email: $username, password: $password) {
      token
    }
  }
`

// const LOGIN_MUTATION = gql`
//   mutation {
//     tokenAuth(username: $username, password: $password) {
//       token
//     }
//   } 
// `

// const LOGIN_MUTATION = gql`
//   mutation {
//     tokenAuth(username: "kartik", password: "1234") {
//       token
//     }
//   }
// `


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
        
        <p>Don't have an accout? <Link to="/signup">Signup</Link> </p>
        
        </div>

      </div>
    )
  }

  _confirm = async data => {
    // console.log(data.tokenAuth.token)
    const token = data.tokenAuth.token
    // console.log(token)
    this._saveUserData(token)
    this.props.history.push(`/`)
  }
  

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
    console.log(AUTH_TOKEN)
    var aValue = localStorage.getItem(AUTH_TOKEN);
    console.log(aValue)
    // localStorage.removeItem(AUTH_TOKEN)
    // console.log(AUTH_TOKEN)

    // localStorage.setItem('bgcolor', 'red');
    // var currentColor = localStorage.getItem('bgcolor');
    // console.log(currentColor)
  }
}

export default Login
