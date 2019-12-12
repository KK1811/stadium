import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../auth/logout'
import Searchbar from './searchbar'


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
                <Link to='/' className="navbar-brand" style={{ "fontSize":"2.2em" }}>STADIUM</Link>
                
            <div className="collapse navbar-collapse container">
                { this.state.auth && (
                <div>
                <ul className="navbar-nav mr-auto float-left">
                    <li className="nav-item active"><NavLink to='/store/1'><div className="float-left"><button type="button" className="btn btn-primary btn-lg right" style={{ "fontSize":"1.8em","width":"175px" }}>Game Store</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/store/2'><div className="float-left"><button type="button" className="btn btn-primary right" style={{ "fontSize":"1.8em","width":"180px" }}>Merch Store</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/library'><div className="float-left"><button type="button" className="btn btn-primary right" style={{ "fontSize":"1.8em","width":"120px" }}>Library</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/friends'><div className="float-right"><button type="button" className="btn btn-primary right" style={{ "fontSize":"1.8em","width":"120px" }}>Friends</button></div></NavLink></li>
                {/* </ul>
                <ul className="navbar-nav mr-auto float-right"> */}
                    <li className="nav-item active"><NavLink to='/profile'><div className="float-right"><button type="button" className="btn btn-primary right" style={{ "fontSize":"1.8em","width":"120px" }}>Profile</button></div></NavLink></li>
                    <li className="nav-item active"><Logout update={this.state.update} /></li>
                    <li><Searchbar /></li>
                </ul>
                
                </div>
                )}
                
            </div>

            <div className="float-right container"> 
                { !this.state.auth && (
                <div className="container">
                <ul className="navbar-nav float-right">
                    <li className="nav-item active float-right"><NavLink to={{pathname: '/login', aboutProps:{update: this.state.update} }}><button className="btn btn-primary btn-lg right" style={{"font-size":"1.8em"}} >Login</button></NavLink></li>
                    <li className="nav-item active float-right"><NavLink to='/signup'><button className="btn btn-primary right" style={{"font-size":"1.8em"}} >Signup</button></NavLink></li>
                </ul>
                </div>
                )}
            </div>   

           

            </div>
        )
    }

    _search = async tagName => {
        console.log(this.props)
    }

    // _changeAuthStatus = () =>{
    //     this.setState(this.state.isAuthenticated = true)
    //     console.log("incAS")
    //     console.log(this.state.isAuthenticated)
    // }
}

// export default Navbar
