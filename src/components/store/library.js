import React,{Component} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
// import Navbar from '../navigation/navbar';
// import SignedInLinks from '../navigation/signedInLinks';
// import inNavbar from '../navigation/inNav'

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

class Library extends Component{
    state = {
        userId: parseInt(this.props.match.params.id),
    }
    render(){
        const {userId} = this.state
        console.log({userId})
        return(
            <div>
            {/*<Navbar /><br></br><br></br>   */}
            {/* <SignedInLinks /> */}
            <inNavbar />
                <Query query={GET_LIBRARY} variables={{ userId }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(data);

                    return(
                        <div className="container">
                            <h1>Your Games</h1><br></br>
                                    {data.gameOwned.map(gameown =>
                                    <Link to={`/gamestore/${gameown.game.id}`}>
                                    <div className="card border-primary" key={gameown.game.id}>
                            
                                        <img src={`http://10.0.34.205:8000${gameown.game.images[0].url}`} className="col-3" alt="" style={{top: "60px"}}/> 
                                        <center>
                                        <div className="col-3" style={{bottom: "85px"}}>                                    
                                            <h3 className="card-title">{gameown.game.name}</h3>   
                                            <h5>Hours Played: {gameown.hoursPlayed}</h5>                                     
                                        </div>
                                        </center>    
                                    
                                    </div>
                                    </Link>
                                )}
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

export default Library
