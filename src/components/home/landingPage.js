import React, { Component } from 'react'
import ControlledCarousel from './slideShow'
import Navbar from '../navigation/navbar'

class landingPage extends Component{
    _reload(){window.location.reload()}
    render(){
        return(
            <div>
            <div className="container my-5">
            
            <ControlledCarousel />
            </div>
            </div>
        )
    }
}

export default landingPage