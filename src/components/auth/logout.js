import React, { Component } from 'react'
import { AUTH_TOKEN } from './constants'
// import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

// class Logout extends Component{
//     render(){
//         return(
//             <div>{ this._logout() }</div>
//         );
//     }

//     _logout = () => {
//         sessionStorage.removeItem(AUTH_TOKEN)
//         console.log(AUTH_TOKEN)
//         this.props.history.push(`/`)
//     }
// }

// const _logout = () => {
//     sessionStorage.removeItem(AUTH_TOKEN)
//     console.log(AUTH_TOKEN)
//     // this.props.history.push(`/`)
// }

const Logout = () => {
    // console.log('inside logout')
    // sessionStorage.removeItem(AUTH_TOKEN)
    return(
        <div className="float-right"><NavLink to='/'><button type="button" className="btn btn-primary right" onClick={localStorage.removeItem(AUTH_TOKEN)}>Logout</button></NavLink></div>
    );
} 



export default Logout