import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_GAMES = gql`
    query {
        games{
            id
            name
            description
            price
            tags{
                tName
            }
        }
    }
`

class Store extends Component{
    render(){
        return(
            <div>
                <Query query={GET_GAMES}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        console.log(data);

                        return(
                            <div>
                                {data.games.map(game => (
                                <div>
                                    <h1>{game.name}</h1>
                                    <h2>{game.price}</h2>
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

export default Store