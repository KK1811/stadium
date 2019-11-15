import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return(
        <ul className="navbar-nav mr-auto float-right">
            <li className="nav-item active"><NavLink to='/store'><div className="float-right"><button type="button" className="btn btn-primary right">Store</button></div></NavLink></li>
            <li className="nav-item active"><NavLink to='/'><div className="float-right"><button type="button" className="btn btn-primary right">Library</button></div></NavLink></li>
            <li className="nav-item active"><NavLink to='/'><div className="float-right"><button type="button" className="btn btn-primary right">Friends</button></div></NavLink></li>
            <li className="nav-item active"><NavLink to='/'><div className="float-right"><button type="button" className="btn btn-primary right">Profile</button></div></NavLink></li>
            <li className="nav-item active"><NavLink to='/'><div className="float-right"><button type="button" className="btn btn-primary right">Logout</button></div></NavLink></li>
        </ul>
    )
}

export default SignedInLinks