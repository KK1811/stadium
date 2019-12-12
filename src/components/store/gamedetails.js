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
        url: null,
    }

    getData(data, user){
        console.log("Data: " + data)
        console.log("UserID: " + user)
        fetch(`${BASE_URL}/container/${data}/${user}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    url: result.url,
                });
                console.log("URL: "+this.state.url);
                this.props.history.push({
                    pathname: `/gamestore/${data}/play`,
                    state: { url: this.state.url }
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
            }
        ) 
    }
    render(){
        const {id} = this.state
        //console.log({id})
        return(
            <div>
            {/* <Navbar /><br></br><br></br>   */}
            {/* <SignedInLinks /><br></br><br></br>   */}
                <Query query={GET_DETAILS} variables={{ id }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    //console.log(data);

                    var isOwned = false
                    const username = localStorage.getItem("uname")
                    const userID = localStorage.getItem("uid")
                    
                    var i;
                    for (i=0; i<data.game.gameOwnedSet.length; i++){
                        if (username === data.game.gameOwnedSet[i].customer.Customer.username){
                            isOwned = true
                        }
                    }; 

                    return(
                        <div className="container">
                            <h1>{data.game.name}</h1>
                                <br/><br/><br/><br/><br/><br/>
                            <div className="container">  
                                <img src={`${BASE_URL}${data.game.images[0].url}`} alt="" className="col-6 float-left" />
                                <div className="float-right">
                                    <h3><b>Description: </b>{data.game.description}</h3>
                                    <br></br><br></br>
                                    <div>
                                        { isOwned === false && (<div>
                                            <h3><b>Price: </b>₹{data.game.price}</h3>
                                            <br></br>
                                            <Link to={`/gamestore/${data.game.id}/buy`}><button className="btn btn-primary">Buy</button></Link>
                                        </div>)}
                                    </div>
                                    <div>
                                            { isOwned === true && (<div>
                                                <button className="btn btn-primary" onClick={() => this.getData(`${data.game.id}`, `${userID}`)}>Play</button>
                                                {/* <br></br><br></br><br></br>
                                                <a href={`${BASE_URL}/chat/${data.game.name}`} className="btn btn-primary">Chat</a> */}
                                            </div>)}
                                    </div>
                                </div>
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