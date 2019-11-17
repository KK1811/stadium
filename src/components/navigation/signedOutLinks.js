import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const SignedOutLinks = () => {
    return(
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to='/' className="navbar-brand">STADIUM</Link>
        <ul className="navbar-nav mr-auto float-right">
            <li className="nav-item active float-right"><NavLink to='/login'><div className="float-right"><button type="button" className="btn btn-primary right">Login</button></div></NavLink></li>
            <li className="nav-item active float-right"><NavLink to='/signup'><div className="float-right"><button type="button" className="btn btn-primary right">Signup</button></div></NavLink></li>
        </ul>
        </div>
    )
}

export default SignedOutLinks