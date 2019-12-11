import React, {Component} from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { BASE_URL } from '../../constants';
import {Link} from 'react-router-dom'; 
// import Navbar from '../navigation/navbar'; 

const GET_FRIENDS = gql`
query {
    me{
        id
        DOB
        gender
        phoneNo
        bio
        joined
        avatar{
            url
        }
        Customer{
            username
        }
        friends{
            id
            DOB
            gender
            phoneNo
            bio
            joined
            Customer{
                username
            }
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

class FriendDetails extends Component{
    state = {
        chatLink: ''
    }
    render(){
        var userId = this.props.match.params.id;
        var chatLink = this._chat();
        console.log(chatLink)
        return(
        <div>
            {/* <Navbar /> */}
            <Query query={GET_FRIENDS}>
                {({loading, error, data}) =>{
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return(
                        <div className="container">
                                {/* <h1>Friends</h1><br></br> */}
                                <div className="">
                                <br></br><br></br><br></br><br></br><br></br>
                                    {data.me.friends.map(friend => (
                                    <div>
                                        {friend.id === this.props.match.params.id && (
                                            <div className="container">
                                                <h1>Profile</h1><br></br>                                   
                                                <div className="card border-primary mb-3" key={friend.id}>

                                                    <img src= {`${BASE_URL}${data.me.avatar[0].url}`} alt="" className="col-3" style={{top: "60px"}} /> 
                                                    <center>
                                                        <div className="col-7" style={{bottom: "85px"}}>    
                                                            <h3 className="card-title"><b>Username: </b>{friend.Customer.username}</h3>
                                                            {/* <h5 className="container"><b>ID: </b>{data.me.id}</h5> */}
                                                            <h5 className="container"><b>Bio: </b>{friend.bio}</h5>
                                                            <h5 className="container"><b>DOB: </b>{friend.DOB}</h5>
                                                            <h5 className="container"><b>Phone Number: </b>{friend.phoneNo}</h5>
                                                            <h5 className="container"><b>Date joined: </b>{friend.joined}</h5>
                                                            {/* <button onClick={e => this._chat()}>Chat</button> */}
                                                            {/* <a href={chatLink} className="btn btn-primary">Chat</a>  */}
                                                            <Link to={`/friend/${userId}/${localStorage.getItem("uid")}/chat`}>Chat</Link>
                                                        </div>
                                                    </center>
                                                </div>
                                            </div>
                                        )}
                                    </div>                           
                                    ))}
                                </div>
                            </div>
                    )
                }}
            </Query>

            <Query query={GET_LIBRARY} variables={{ userId }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(data);

                    return(
                        <div className="container">
                            <h1>Games Owned</h1><br></br>
                                    {data.gameOwned.map(gameown =>
                                    <Link to={`/gamestore/${gameown.game.id}`} key={gameown.game.id}>
                                    <div className="card border-primary mb-3" key={gameown.game.id}>
                                    <img src={`${BASE_URL}${gameown.game.images[0].url}`} className="col-3" alt="" style={{top: "60px"}}/> 
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
        )
    }
    _chat = () => {
        const uid = parseInt(localStorage.getItem("uid"))
        const fid = parseInt(this.props.match.params.id)
        var chatLink = ''
        if (uid > fid){
            chatLink = BASE_URL+'/chat/'+fid+'_'+uid
            console.log(chatLink)
        }
        if (uid < fid){
            chatLink = BASE_URL+'/chat/'+uid+'_'+fid
            console.log(chatLink)
        }
        return chatLink
    }
}

export default FriendDetails