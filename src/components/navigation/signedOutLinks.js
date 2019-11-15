import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return(
        <ul className="navbar-nav mr-auto float-right">
            <li className="nav-item active"><NavLink to='/login'><div className="float-right"><button type="button" className="btn btn-primary right">Login</button></div></NavLink></li>
            <li className="nav-item active"><NavLink to='/signup'><div className="float-right"><button type="button" className="btn btn-primary right">Signup</button></div></NavLink></li>
        </ul>
    )
}

export default SignedOutLinks