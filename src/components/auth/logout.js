import React from 'react'
import { NavLink } from 'react-router-dom'

const Logout = () => {
    return(
        <div className="float-right"><NavLink to='/'><button type="button" className="btn btn-primary right" onClick={() => _handleClick()}>Logout</button></NavLink></div>
    );
} 


const _handleClick = event => {
    // Navbar._changeAuthState()
    console.log("in Logout")
    localStorage.removeItem("token")
}

export default Logout