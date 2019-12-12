import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
// import { request } from 'http';
import { Link } from 'react-router-dom';
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
    _reload(){window.location.reload()}
    render(){
        var toUserEmail = this.state.toUserEmail
        var fromUserEmail = this.state.fromUserEmail
        return(
            <div className="row">
                <div className="col-4 container">
                    <Query query={GET_FRIENDS}>
                            {({loading, error, data}) => {
                                if (loading) return 'Loading...';
                                if (error) return `Error! ${error.message}`;

                                console.log(data.me);

                                return(
                                    <div className="container">
                                        <h1>Friends</h1><br></br>
                                        <div className="container border-primary" style={{"padding":"5%"}}>
                                        <br></br><br></br><br></br><br></br><br></br>
                                            {data.me.friends.map(friend => (
                                            <Link to={`/friend/${friend.id}`}>    
                                            <div className="card border-primary text-decoration-none" style={{"backgroundColor":"#1b2a49"}}>
                                                <h3 className="text-decoration-none">{friend.Customer.username}</h3>
                                            </div><br/> 
                                            </Link>                           
                                            ))}
                                        </div>
                                    </div>
                                )              
                            }}
                        </Query>
                    </div>

                <div className="col-4 float-right border-primary" style={{ right:"100px","padding":"5%" }}>
                    <div className="">
                        <h3>Send Friend Request</h3><br/>
                        <div className="container">
                        <input
                            className="form-group container"
                            value={toUserEmail}
                            onChange={e => this.setState({ toUserEmail: e.target.value })}
                            type="string"
                            placeholder="Email"
                        />
                        </div>

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
                    
                    {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
                    
                    <div className="">   
                        <br/><br/><br/><br/>
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
                                                        <div key={friend.fromUser.Customer.username} className="border border-primary   ">
                                                            
                                                            <div style={{"font-size":"2em"}} className="">Email: {toUserEmail = friend.fromUser.Customer.email}</div><br/>
                                                            <div style={{"font-size":"2em"}} className="">Username: {friend.fromUser.Customer.username}</div>

                                                            <Mutation
                                                                mutation={FRIEND_REQUEST_MUTATION}
                                                                variables={{ toUserEmail }}
                                                                onCompleted={data=> this._confirm(data)}
                                                            >
                                                                {request => (
                                                                    <button className="btn btn-primary" onClick={request}>
                                                                    Accept Request<br/>
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