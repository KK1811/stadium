import React, { Component } from 'react'

export default class Playing extends Component{
    render(){
        console.log(this.props.match.params.id)
        const userID = localStorage.getItem("uid")
        return(
            <div>
                <div>User Id: {userID}</div>
                <div>Game Id: {this.props.match.params.id}</div>
            </div>
        )
    }
}