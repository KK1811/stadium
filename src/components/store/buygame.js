import React, {Component} from 'react'
import gql from 'graphql-tag';
import { Mutation} from 'react-apollo';
import {Link} from 'react-router-dom'

const BUY_GAME=gql`
    mutation BuyGame($gameId: Int!){
        buyGame(gameId: $gameId){
            transaction{
                id
                amount
            }
            gameowned{
                id
                customer{
                    Customer{
                        id
                        username
                    }
                }
            }
        }
    }
`

// const GET_UID = gql`
//     query {
//         me{
//             id
//         }
//     }
// `

class Buygame extends Component{
    state = {
        gameId: parseInt(this.props.match.params.id),
    }
    render(){
        const {gameId} = this.state
        console.log({gameId})
        return(
            <div>
                <Mutation mutation={BUY_GAME} onCompleted={data => this._redirect(data)} variables={{ gameId }}>
                    {buy => (
                        <div>
                            <br></br><br></br><br></br>
                            <h3>Are you sure you want to buy this game?</h3>
                            <Link to="/store/1"><button className="btn btn-primary">No</button></Link>{'  '}
                            <Link to="/library"><button className="btn btn-primary" onClick={buy}>Yes</button></Link>
                        </div>
                    )}
                </Mutation>
            </div>
        )
    }

    _redirect = async data => {
        // return(
        // <Query query={GET_UID}>
        //     {({loading, error, data}) => {
        //                 if (loading) return 'Loading...';
        //                 if (error) return `Error! ${error.message}`;
        //                 const uid = data.me.id
        //                 return(
        //                     <div className="container">
        //                     {this.props.history.push({`/library/`})}
        //                     </div>
        //                 );           
        //             }}
        // </Query>
        // this.props.history.push('/library/' + uid)
        // )
    }
}

export default Buygame