import React, {Component} from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DETAILS = gql`
    query Games($id: Int!){
        games(id: $id){
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
                <Query query={GET_DETAILS} variables={{ id }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(data);

                    return(
                        <div>
                            {data.games.name}
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