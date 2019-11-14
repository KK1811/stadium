import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation {
    tokenAuth(username: "harshit", password: "1234") {
      token
    }
  }
`

class login extends Component {
  state = {
    login: true, // switch between login and SignUp
    email: '',
    password: '',
    name: '',
  }

  render() {
    const { login, email, password, name } = this.state
    return (
      <div>
        <form><fieldset>
          <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
          <div className="container">
            {!login && (
              
              

              <div class="form-group">
      <label for="">Username</label>
      <input
      className="form-control"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                type="text"
                placeholder="Username"
              />
    </div>

            )}

            <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
                  className="form-control"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                  type="email"
                  placeholder="Your email address"
                />
            </div>

            <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              placeholder="Choose a safe password"
            />
            </div>
            
          </div>


        </fieldset></form>
        <div className="flex mt3">
        <Mutation
    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
    variables={{ email, password, name }}
    onCompleted={data => this._confirm(data)}
  >
    {mutation => (
      <div className="pointer mr2 button" onClick={mutation}>
        {login ? 'Login' : 'Create Account'}
      </div>
    )}

    
  </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'Need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    console.log(data.login)
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
    return data.login
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default login
