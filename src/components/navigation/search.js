import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
// import { BASE_URL } from '../../constants';

const SEARCH_TAGS = gql`
    query Tags($tagName: String!){
        tags(tagName: $tagName){
        tName
        gameSet{
            name
            id
            price
        }
    }
}    
`
const SEARCH_GAMES = gql`
    query Games($gameName: String!){
        games(gameName: $gameName){
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

class Search extends Component{
    state = {
        tagName: '',
        gameName: '',
    }
    render(){
        const tagName = this.props.match.params.id
        const gameName = this.props.match.params.id
        return(
            <div>
                {/* {this.props.match.params.id} */}
                <Query query={SEARCH_TAGS} variables={{ tagName }}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
    
                        console.log(data);
                        return(
                            <div className="container">
                               <div>
                                    {data.tags.length !==0 && (
                                    <div>
                                        <h1>Games Related to Tag {this.props.match.params.id}</h1><br></br>
                                        {data.tags[0].gameSet.map(game =>(
                                            <Link to={`/gamestore/${game.id}`} key={game.id} className="text-decoration-none">
                                                <br></br><br></br>
                                                <div className="card border-primary" key={game.id}>                                 
                                                    <h3 className="card-title">{game.name}</h3>   
                                                </div>
                                            </Link>                                        
                                        ))}
                                    </div>
                               )}
                               </div>
                               <div>
                                   {data.tags.length === 0 && (
                                       <div>
                                            <h3>No Games Related to Tag {this.props.match.params.id}</h3>
                                       </div>
                                   )}
                               </div>
                            </div>
                        )
                    }}
                </Query>

                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

                <Query query={SEARCH_GAMES} variables={{ gameName }}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
    
                        console.log(data);
                        return(
                            <div className="container">
                               <div>
                                    {data.games.length !==0 && (
                                    <div>
                                        <h1>Games named {this.props.match.params.id}</h1><br></br>
                                        {data.games.map(game =>(
                                            <Link to={`/gamestore/${game.id}`} key={game.id} className="text-decoration-none">
                                                <br></br><br></br><br></br><br></br><br></br><br></br>
                                                <div className="card border-primary" key={game.id}>                                 
                                                    <h3 className="card-title">{game.name}</h3>   
                                                </div>
                                            </Link>                                        
                                        ))}
                                    </div>
                               )}
                               </div>
                               <div>
                                   {data.games.length === 0 && (
                                       <div>
                                           <h3>No Game Named {this.props.match.params.id} Found</h3>
                                           {/* {this.state.isGameFound = false} */}
                                       </div>
                                   )}
                               </div>
                            </div>
                        )
                    }}
                </Query>
                {/* <div>
                    {this.state.isTagFound === false  && (
                        // <div>{this.state.isGameFound === false && (
                            <div><h3>No Related Games Found</h3></div>
                        // )}</div>
                    )}
                </div> */}
            </div>
        )
    }
}

export default Search