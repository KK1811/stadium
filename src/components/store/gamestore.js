import React, { Component } from 'react'
// import Img from 'react-image'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import '../../styles/store.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants';
// import Navbar from '../navigation/navbar';
// import SignedInLinks from '../navigation/signedInLinks';

// const BASE_URL = "10.0.34.205:8000"
// let Imgg = require('react-image')
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
            {/*<Navbar /><br></br><br></br>   */}
            {/* <SignedInLinks /><br></br><br></br>   */}  
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
        );
    }
}

export default Gamestore