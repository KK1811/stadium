import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './signedInLinks'
import SignedOutLinks from './signedOutLinks'

const inNavbar = () => {
    var tokenValue = localStorage.getItem("token");
    const links = tokenValue === null ? <div className="float-right"><SignedOutLinks /></div> : <div className="container"><SignedInLinks /></div>
    console.log(tokenValue)
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to='/' className="navbar-brand">STADIUM</Link>
                {links}
            </div>
        
        </nav>
    )
}

export default inNavbar