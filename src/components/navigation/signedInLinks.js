import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../auth/logout'

const SignedInLinks = () => {
    return(
        <div>
        <ul className="navbar-nav mr-auto float-left">
            <li className="nav-item active"><NavLink to='/gamestore'><div className="float-left"><button type="button" className="btn btn-primary right">Game Store</button></div></NavLink></li>
            <li className="nav-item active"><NavLink to='/merchstore'><div className="float-left"><button type="button" className="btn btn-primary right">Merch Store</button></div></NavLink></li>
            <li className="nav-item active"><NavLink to='/'><div className="float-left"><button type="button" className="btn btn-primary right">Library</button></div></NavLink></li>
            <li className="nav-item active"><NavLink to='/'><div className="float-right"><button type="button" className="btn btn-primary right">Friends</button></div></NavLink></li>
            
            {/* <li className="nav-item active"><NavLink to='/logout'><div className="float-right"><button type="button" className="btn btn-primary right">Logout</button></div></NavLink></li> */}
            
        </ul>

        <ul className="navbar-nav mr-auto float-right">
            
            <li className="nav-item active"><NavLink to='/'><div className="float-right"><button type="button" className="btn btn-primary right">Profile</button></div></NavLink></li>
            <li className="nav-item active"><Logout /></li>
        </ul>
        </div>
    )
}

export default SignedInLinks