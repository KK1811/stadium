import React, { Component } from 'react'
import ControlledCarousel from './slideShow'
// import Navbar from '../navigation/navbar'
import SignedInLinks from '../navigation/signedInLinks'

class landingPage extends Component{
    _reload(){window.location.reload()}
    render(){
        return(
            <div>
        {/*<Navbar /><br></br><br></br>*/}  
        <SignedInLinks /> 
        <br></br><br></br><br></br><br></br>
            <div className="container my-5">
            
            <ControlledCarousel />
            </div>
            </div>
        )
    }
}

export default landingPage