import React, {Component} from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { BASE_URL } from '../../constants';
import {Link} from 'react-router-dom';  

const GET_DETAILS = gql`
    query Games($id: Int!){
        game(id: $id){
            id
            name
            description
            price
            images{
                url
            }
            merchandiseSet{
                id 
                name
                images{
                    id 
                    image
                    url
                }
            }
            gameOwnedSet{
                customer{Customer{
                    username
                }}
            }
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
                <Query query={GET_DETAILS} variables={{ id }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(data);

                    var isOwned = false
                    const username = localStorage.getItem("uname")
                    
                    var i;
                    for (i=0; i<data.game.gameOwnedSet.length; i++){
                        if (username === data.game.gameOwnedSet[i].customer.Customer.username){
                            isOwned = true
                        }
                    }; 


                    return(
                        <div>
                            <br></br><br></br><br></br>
                            <h1>{data.game.name}</h1>
                            <h3><b>Description: </b>{data.game.description}</h3>
                            <br></br>
                            <img src={`${BASE_URL}${data.game.images[0].url}`} alt="" className="col-5" />
                            <br></br>
                            <div>
                                { isOwned === false && (<div>
                                    <h3><b>Price: </b>₹{data.game.price}</h3>
                                    <br></br>
                                    <Link to={`/gamestore/${data.game.id}/buy`}><button className="btn btn-primary">Buy</button></Link>
                                </div>)}
                            </div>
                            <div>
                                { isOwned === true && (<div>
                                    <Link to={`/gamestore/${data.game.id}/play`}><button className="btn btn-primary">Play</button></Link>
                                </div>)}
                            </div>
                            <br></br><br></br><br></br>
                            <h2>Merchandise</h2>
                            <div>
                                {data.game.merchandiseSet.map(merch => (
                                    <div>
                                        <img src={`${BASE_URL}${merch.images[0].url}`} alt="" className="col-3" ></img>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )                        
                }}
                </Query>
            </div>
        )
    }
}

export default Gamedetails