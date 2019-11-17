import React, {Component} from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
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
                            <Link to="/gamestore"><button className="btn btn-primary">No</button></Link>
                            <button className="btn btn-primary" onClick={buy}>Yes</button>
                        </div>
                    )}
                </Mutation>
            </div>
        )
    }

    _redirect = async data => {
        const uid = data.buyGame.gameowned.customer.Customer.id
        this.props.history.push('/library/' + uid)
    }
}

export default Buygame