import React, {Component} from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Navbar from '../navigation/navbar'
import {Link} from 'react-router-dom'

const GET_LIBRARY = gql`
    query{
        gameOwned(userId: 1){
           game{
               id
               name
           }
           hoursPlayed
        }
    }
`

class Gamedetails extends Component{
    state = {
        id: parseInt(this.props.match.params.id),
    }
    render(){
        const {id} = this.state
        console.log({id})
        return(
            <div>
                <Navbar /><br></br><br></br><br></br>
                <Query query={GET_LIBRARY} variables={{ id }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(data);

                    return(
                        <div className="container">
                            <h1>Your Games</h1><br></br>
                        {data.gameOwned.map(gameown => (
                        <Link to={`/gamestore/${gameown.game.id}`}>
                        <div className="card border-primary" key={gameown.game.id}>
                        
                            {/* <img src={`http://10.0.34.205:8000${game.images[0].url}`} className="col-3" alt="" />  */}

                            <div className="col-3">                                    
                                <h3 className="card-title">{gameown.game.name}</h3>   
                                <h5>Hours Played: {gameown.hoursPlayed}</h5>                                     
                            </div>    
                                
                        </div>
                        </Link>
                            ))}
                    </div>
                    )                        
                }}
                </Query>
            </div>
            /*<div>
                <h1>{id}</h1>
            </div>*/
        )
    }
}

export default Gamedetails