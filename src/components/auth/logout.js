import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'


class Logout extends Component{
    constructor(props){
        super(props);
    }

    _handleClick = event => {
        // Navbar._changeAuthState()
        //console.log("in Logout: " + this.props.update())
        localStorage.removeItem("token")
        this.props.update()
    }

    render(){
        return(
            <div className="float-right"><NavLink to='/'><button type="button" className="btn btn-primary right"  style={{ "fontSize":"1.8em","width":"120px" }} onClick={() => this._handleClick() }>Logout</button></NavLink></div>
        );
    }
}


export default Logout