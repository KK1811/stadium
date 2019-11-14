import React from 'react'
import { Link } from 'react-router-dom'
// import signedInLinks from './signedInLinks'
// import signedOutLinks from './signedOutLinks'

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to='/' className="navbar-brand">STADIUM</Link>
                <div className=""><ul className="navbar-nav mr-auto float-right">
                <li className="nav-item active"><Link to='/login' className=""><div className="float-right"><button type="button" class="btn btn-primary right">Login</button></div></Link></li>
                <div className="float-right"><li className="nav-item active"><Link to='/' className=""><button type="button" class="btn btn-primary">Signup</button></Link></li></div>
                </ul></div>
    
            </div>
        
        </nav>
    )
}

export default Navbar