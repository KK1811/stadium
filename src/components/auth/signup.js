import React, { Component } from 'react'
// import { AUTH_TOKEN } from './constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';


const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $email: String!, $password: String!, $DOB: Date!, $phoneNo: Int!, $gender: Int!) {
    createUser(username: $username, email: $email, password: $password, DOB: $DOB, phoneNo: $phoneNo, gender: $gender) {
      user{username},
    }
  }
`

// const LOGIN_MUTATION = gql`
//   mutation LoginMutation($username: String!, $password: String!) {
//     tokenAuth(username: $username, password: $password) {
//       token
//     }
//   }
// `

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


class Signup extends Component {
  state = {
    username: '',
    email:'',
    password: '',
    DOB:"2000-01-01",
    phoneNo: 9870,
    gender: 1,
  }

  render() {
    const { username, email, password, DOB, phoneNo, gender} = this.state
    return (
      <div className="container col-sm-5 card border-primary">
        <br></br><h4>Signup</h4><br></br>
        <div className="form-group">
          <br></br>
          <label htmlFor="exampleTextarea">Username</label>
          <br></br>
          <input
            className="form-group"
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Username"
          />
          <br></br>
          <label htmlFor="exampleInputEmail1">Email</label>
          <br></br>
          <input
            className="form-group"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="email"
            placeholder="Email"
          />
          <br></br>
          <label htmlFor="exampleInputPassword1">Password</label>
          <br></br>
          <input
            className="form-group"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <br></br>
          <input
            className="form-group"
            value={DOB}
            onChange={e => this.setState({ DOB: e.target.value })}
            type="date"
            placeholder="Date of Birth"
          />
          <br></br>
          <input
            className="form-group"
            value={phoneNo}
            onChange={e => this.setState({ phoneNo: e.target.value })}
            type="int"
            placeholder="phoneNo"
          />
          <br></br>
          <input
            className="form-group"
            value={gender}
            onChange={e => this.setState({ gender: e.target.value })}
            type="int"
            placeholder="gender"
          />
        </div>
        <div className="flex mt3">
        <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ username, email, password, DOB, phoneNo, gender }}
            onCompleted={data => this._confirm(data)}
        >
            {signup => (
            <button className="btn btn-primary" onClick={signup}>
                {'Signup'}
            </button>
            )}

        </Mutation>
        
        <br></br><br></br>
        <p>Already have an accout? <Link to="/login">Login</Link></p>
        
        
        </div>

      </div>
    )
  }

  _confirm = async data => {
    console.log(data)
    // const { token } = data.tokenAuth.token
    // console.log(token)
    // this._saveUserData(token)
    this.props.history.push(`/login`)
  }
  

//   _saveUserData = token => {
//     localStorage.setItem(AUTH_TOKEN, token)
//   }
}

export default Signup
