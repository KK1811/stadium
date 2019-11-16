import React, { Component } from 'react'
import ControlledCarousel from './slideShow'

class landingPage extends Component{
    _reload(){window.location.reload()}
    render(){
        return(
            <div className="container my-5">
            
            <ControlledCarousel />
            </div>
        )
    }
}

export default landingPage