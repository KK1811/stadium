import React from 'react'
import { NavLink } from 'react-router-dom'

const signedOutLinks = () => {
    return(
        <ul>
            <li><NavLink to='/'>Store</NavLink></li>
        </ul>
    )
}

export default signedOutLinks