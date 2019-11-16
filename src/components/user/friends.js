import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_FRIENDS = gql`
    query {
        me{
            friends{
                Customer{
                    username
                }
            }
        }
    }
`

class Friends extends Component{
    render(){
        return(
            <div>
                <Query query={GET_FRIENDS}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        console.log(data);

                        return(
                            <div className="container">
                                <h1>Friends</h1><br></br>
                                {data.me.friends.map(friend => (
                                <div className="card border-primary">
                                    <h3>{friend.Customer.username}</h3>
                                </div>
                        ))}
                            </div>
                        )              
                    }}
                </Query>
            </div>
        );
    }
}

export default Friends