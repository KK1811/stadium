import React, {Component} from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Navbar from '../navigation/navbar';
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
            {/*<Navbar /><br></br><br></br>   */}
                <Query query={GET_DETAILS} variables={{ id }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(data);

                    return(
                        <div>
                            <img src={`http://10.0.34.205:8000${data.game.images[0].url}`} alt="" className="col-5" />
                            <br></br><br></br><br></br>
                            <h1>{data.game.name}</h1>
                            <h3><b>Description: </b>{data.game.description}</h3>
                            <br></br>
                            <h3><b>Price: </b>{data.game.price}</h3>
                            <br></br>
                            <Link to={`/gamestore/${data.game.id}/buy`}><button className="btn btn-primary">Buy</button></Link>
                            <br></br><br></br><br></br>
                            <h2>Merchandise</h2>
                            <div>
                                {data.game.merchandiseSet.map(merch => (
                                    <div>
                                        <img src={`http://10.0.34.205:8000${merch.images[0].url}`} alt="" className="col-3" ></img>
                                    </div>
                                )

                                )}
                            </div>
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