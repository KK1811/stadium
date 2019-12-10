import React, { Component } from 'react'
import ControlledCarousel from './slideShow'
// import Navbar from '../navigation/navbar'
// import SignedOutLinks from '../navigation/signedOutLinks'

class landingPage extends Component{
    _reload(){window.location.reload()}
    render(){
        return(
            <div>
                <div className="container">
                    <ControlledCarousel />
                </div>
            </div>
        )
    }
}

export default landingPage