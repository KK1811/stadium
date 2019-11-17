import React from 'react'
import { NavLink } from 'react-router-dom'

const Logout = () => {
    return(
        <div className="float-right"><NavLink to='/'><button type="button" className="btn btn-primary right">Logout</button></NavLink></div>
    );
} 

export default Logout