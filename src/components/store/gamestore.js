import React, { Component } from 'react'
import Img from 'react-image'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const BASE_URL = "10.0.35.200:8000"
let Imgg = require('react-image')
const GET_GAMES = gql`
    query {
        games{
            id
            name
            description
            price
            images{
                url
            }
        }
    }
`

class Gamestore extends Component{
    render(){
        return(
            <div>
                <Query query={GET_GAMES}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        console.log(data);

                        return(
                            <div className="container">
                                <h1>Games</h1><br></br>
                                {data.games.map(game => (
                                    
                                <div className="card border-primary mb-3" key={game.id}>
                                    <h3 className="card-title">{game.name}</h3>
                                    <p className="container"><b>Description: </b>{game.description}</p>
                                    <div className="container col-sm-5">
                                    <h5>Price: {game.price}</h5>
                                    <button className="btn btn-primary">Buy</button>
                                    
                                    </div>
                                    <br></br>
                                    <img src={'10.0.35.200:8000${game.images[0].url}'}/>
                                </div>
                        ))}
                            </div>
                                    
                    }}
                </Query>
            </div>
        );
    }
}

export default Gamestore