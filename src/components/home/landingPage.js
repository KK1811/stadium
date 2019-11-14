import React, { Component } from 'react'
import ControlledCarousel from './slideShow'

class landingPage extends Component{
    render(){
        return(
            <div className="container my-5">
            
            <ControlledCarousel />
            </div>
        )
    }
}

export default landingPage