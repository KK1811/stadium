import React from 'react'
import { NavLink } from 'react-router-dom'

const signedInLinks = () => {
    return(
        <ul>
            <li><NavLink to='/'>Store</NavLink></li>
            <li><NavLink to='/'>Library</NavLink></li>
            <li><NavLink to='/'>Friends</NavLink></li>
            <li><NavLink to='/'>Profile</NavLink></li>
        </ul>
    )
}

export default signedInLinks