import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../auth/logout'

function updateNavbar(){
    if(localStorage.getItem('token') != null){
        this.setState({auth : true}); 
    }
    else{
        this.setState({auth : false});
    }
}

export class Navbar extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            auth : false,
            update : updateNavbar.bind(this),
        };
    }

    componentDidMount(){
        if(localStorage.getItem('token') != null){
            this.setState({auth : true}); 
        }
        else{
            this.setState({auth : false});
        }
    }

    componentDidUpdate(){
        if(localStorage.getItem('token') != null){
            if(!this.state.auth)
            this.setState({auth : true}); 
        }
        else{
            if(this.state.auth){
                this.setState({auth : false});
            }
        }
    }

    render(){
        console.log("Nav: " + this.state.update)
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link to='/' className="navbar-brand">STADIUM</Link>
                
            <div>
                { this.state.auth && (
                <div>
                <ul className="navbar-nav mr-auto float-left">
                    <li className="nav-item active"><NavLink to='/store/game'><div className="float-left"><button type="button" className="btn btn-primary right">Game Store</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/store/merch'><div className="float-left"><button type="button" className="btn btn-primary right">Merch Store</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/store/library '><div className="float-left"><button type="button" className="btn btn-primary right">Library</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/friends'><div className="float-right"><button type="button" className="btn btn-primary right">Friends</button></div></NavLink></li>
                </ul>
                <ul className="navbar-nav mr-auto float-right">                    
                    <li className="nav-item active"><NavLink to='/profile'><div className="float-right"><button type="button" className="btn btn-primary right">Profile</button></div></NavLink></li>
                    <li className="nav-item active"><Logout update={this.state.update} /></li>
                </ul>
                </div>
                )}
                
            </div>

            <div className="float-right container"> 
                { !this.state.auth && (
                <div className="container">
                <ul className="navbar-nav float-right">
                    <li className="nav-item active float-right"><NavLink to={{pathname: '/login', aboutProps:{update: this.state.update} }}><button className="btn btn-primary right">Login</button></NavLink></li>
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
