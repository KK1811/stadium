import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './signedInLinks'
import SignedOutLinks from './signedOutLinks'
import { AUTH_TOKEN } from '../auth/constants'

const Navbar = () => {
    var tokenValue = localStorage.getItem(AUTH_TOKEN);
    const links = tokenValue==='auth-token' ? <SignedOutLinks /> : <SignedInLinks />
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to='/' className="navbar-brand">STADIUM</Link>
                {/* <div className=""><ul className="navbar-nav mr-auto float-right">
                <li className="nav-item active"><Link to='/login' className=""><div className="float-right"><button type="button" className="btn btn-primary right">Login</button></div></Link></li>
                <div className="float-right"><li className="nav-item active"><Link to='/signup' className=""><button type="button" className="btn btn-primary">Signup</button></Link></li></div>
                </ul></div> */}
                {links}
            </div>
        
        </nav>
    )
}

export default Navbar