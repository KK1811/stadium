import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
// import { request } from 'http';
// import { Link } from 'react-router-dom';
// import Navbar from '../navigation/navbar';   

const GET_FRIENDS = gql`
query {
    me{
        id
        DOB
        gender
        phoneNo
        bio
        joined
        Customer{
            username
        }
        friends{
            id
            DOB
            gender
            phoneNo
            bio
            joined
            Customer{
                username
            }
        }
    }
}
`

const PENDING_REQUESTS = gql`
query {
    pendingRequests {
        id
        fromUser{
            Customer{
                username
                email
            }
        }
    }
}
`

const FRIEND_REQUEST_MUTATION = gql`
  mutation FriendRequestMutation($toUserEmail: String!) {
    sendFriendRequest(toUserEmail: $toUserEmail) {
      fromUser{id}
    }
  }
`

class Friends extends Component{
    state = {
        toUserEmail: '',
        fromUserEmail: ''
    }
    render(){
        const toUserEmail = this.state.toUserEmail
        var fromUserEmail = this.state.fromUserEmail
        return(
            <div>
                <Query query={GET_FRIENDS}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        console.log(data.me);

                        return(
                            <div className="container">
                                <h1>Friends</h1><br></br>
                                <div className="col-lg-5 float-left border-primary">
                                <br></br><br></br><br></br><br></br><br></br>
                                    {data.me.friends.map(friend => (
                                    <div className="card border-primary mb-3">
                                        <h3>{friend.Customer.username}</h3>
                                    </div>                            
                                    ))}
                                </div>
                            </div>
                        )              
                    }}
                </Query>

                <div className="col-lg-3 float-right border-primary">
                    <div className="border border-primary">
                        <h3>Send Friend Request</h3>
                        <input
                            className="form-group container"
                            value={toUserEmail}
                            onChange={e => this.setState({ toUserEmail: e.target.value })}
                            type="string"
                            placeholder="Email"
                        />

                        <Mutation
                            mutation={FRIEND_REQUEST_MUTATION}
                            variables={{ toUserEmail }}
                            onCompleted={data => this._confirm(data)}
                        >
                            {request => (
                                <button className="btn btn-primary" onClick={request}>
                                    Send Request
                                </button>
                            )}
                                    
                        </Mutation>
                    </div>
                    
                    <br></br><br></br><br></br><br></br><br></br>
                    
                    <div className="border border-10 border-primary">              
                        <h3>Pending Requests</h3>
                            <Query query={PENDING_REQUESTS}>
                                {({loading, error, data}) => {
                                    if (loading) return 'Loading...';
                                    if (error) return `Error! ${error.message}`;
                                    console.log(data)
                                    return(
                                        <div>
                                            {data.pendingRequests &&(
                                                <div>
                                                    {data.pendingRequests.map(friend =>(
                                                        <div key={friend.fromUser.Customer.username}>
                                                            <div>{fromUserEmail = friend.fromUser.Customer.email}</div>
                                                            <div>{console.log("+++"+fromUserEmail)}</div>
                                                            <div>{friend.fromUser.Customer.username}</div>
                                                            <Mutation
                                                                mutation={FRIEND_REQUEST_MUTATION}
                                                                variables={{ fromUserEmail }}
                                                                onCompleted={data=> this._confirm(data)}
                                                            >
                                                                {request => (
                                                                    <button className="btn btn-primary" onClick={request}>
                                                                    Accept Request
                                                                </button>
                                                                )}
                                                            </Mutation>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        );           
                                    }}
                                </Query>        
                            </div>  
                        </div>
            </div>
        );
    }

    _confirm = async data => {
        console.log(data)
        this.props.history.push(`/`)
      }
}

export default Friends