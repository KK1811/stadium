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
      <div>
        <h4>Login</h4>
        <div className="flex flex-column">
          <input
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex mt3">
        <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ username, password }}
            onCompleted={data => this._confirm(data)}
        >
            {login => (
            <div className="pointer mr2 button" onClick={login}>
                {'Login'}
            </div>
            )}

        </Mutation>
        
        
        <p>Don't have an accout?</p>
        <Link to="/signup">Signup</Link> 
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
    localStorage.setItem(AUTH_TOKEN, token)
    console.log(AUTH_TOKEN)
    var aValue = localStorage.getItem(AUTH_TOKEN);
    console.log(aValue)

    // localStorage.setItem('bgcolor', 'red');
    // var currentColor = localStorage.getItem('bgcolor');
    // console.log(currentColor)
  }
}

export default Login
