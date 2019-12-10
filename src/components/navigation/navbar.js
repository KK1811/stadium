import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../auth/logout'

export class Navbar extends Component{
    render(){
        const {isAuthenticated} = localStorage.getItem("token") ? true : false
        console.log(this.context);
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link to='/' className="navbar-brand">STADIUM</Link>
                
            <div>
                { isAuthenticated && (
                <div>
                <ul className="navbar-nav mr-auto float-left">
                    <li className="nav-item active"><NavLink to='/store/game'><div className="float-left"><button type="button" className="btn btn-primary right">Game Store</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/store/merch'><div className="float-left"><button type="button" className="btn btn-primary right">Merch Store</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/store/library '><div className="float-left"><button type="button" className="btn btn-primary right">Library</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/friends'><div className="float-right"><button type="button" className="btn btn-primary right">Friends</button></div></NavLink></li>
                </ul>
                <ul className="navbar-nav mr-auto float-right">                    
                    <li className="nav-item active"><NavLink to='/profile'><div className="float-right"><button type="button" className="btn btn-primary right">Profile</button></div></NavLink></li>
                    <li className="nav-item active"><Logout /></li>
                </ul>
                </div>
                )}
                
            </div>

            <div className="float-right container"> 
                { !isAuthenticated && (
                <div className="container">
                <ul className="navbar-nav float-right">
                    <li className="nav-item active float-right"><NavLink to='/login'><button className="btn btn-primary right">Login</button></NavLink></li>
                    <li className="nav-item active float-right"><NavLink to='/signup'><button className="btn btn-primary right">Signup</button></NavLink></li>
                </ul>
                </div>
                )}
            </div>   

            </div>
        )
    }

    // _changeAuthStatus = () =>{
    //     this.setState(this.state.isAuthenticated = true)
    //     console.log("incAS")
    //     console.log(this.state.isAuthenticated)
    // }
}

// export default Navbar
