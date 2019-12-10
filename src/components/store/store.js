import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants';

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

const GET_MERCH = gql`
    query {
        merchs{
            id
            name
            desc
            price
            game{
                id
                name
            }
            images{
                id
                image
                url
            }
        }
    }
`

const GET_LIBRARY = gql`
    query GameOwned($userId: Int!){
        gameOwned(userId: $userId){
            game{
            id
            name
            images{
                url
            }
            }
            hoursPlayed
        }
    }
`

class Store extends Component{
    state = {
        id: 1
    }
    render(){
        const id = parseInt(this.props.match.params.id)
        return(
            <div>
                <div>
                    {id === 1 && (
                        <div>
                            <Query query={GET_GAMES}>
                                {({loading, error, data}) => {
                                    if (loading) return 'Loading...';
                                    if (error) return `Error! ${error.message}`;

                                    console.log(data);
                                    var tokenValue = localStorage.getItem("token")
                                    console.log(tokenValue)

                                    return(
                                        <div className="container">
                                            <h1>Games</h1><br></br>
                                            {data.games.map(game => (
                                            <Link to={`/gamestore/${game.id}`}>
                                            <div className="card border-primary" key={game.id}>
                                            
                                                <img src={`${BASE_URL}${game.images[0].url}`} className="col-3" alt="" style={{top: "60px"}} /> 
                                                <center>
                                                <div className="col-3" style={{bottom: "85px"}}>                                    
                                                    <h3 className="card-title">{game.name}</h3>                                        
                                                    <h5>Price: ₹{game.price}</h5>
                                                </div>    
                                                </center>
                                            </div>
                                            </Link>
                                    ))}
                                        </div>
                                    );           
                                }}
                            </Query>
                        </div>
                    )}
                </div>

                <div>
                    {id === 2 && (
                        <div>
                            <Query query={GET_MERCH}>
                                {({loading, error, data}) => {
                                    if (loading) return 'Loading...';
                                    if (error) return `Error! ${error.message}`;

                                    console.log(data);

                                    return(
                                        <div className="container">
                                            <h1>Merch</h1><br></br>
                                            {data.merchs.map(merch => (
                                            <div className="card border-primary">
                                                <img src={`${BASE_URL}${merch.images[0].url}`} className="col-3" alt="" style={{top: '70px'}} />
                                                <center>
                                                <div className="col-3" style={{bottom: "100px"}}>
                                                <h3 className="card-title">{merch.name}</h3>
                                                <p className="container"><b>Description: </b>{merch.desc}</p>
                                                <h5>Price: ₹{merch.price}</h5>
                                                <br></br>
                                                </div>
                                                </center>
                                                
                                            </div>
                                    ))}
                                        </div>
                                    )                        
                                }}
                            </Query>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Store