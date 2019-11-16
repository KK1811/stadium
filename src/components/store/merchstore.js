import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import '../../styles/store.css';

const GET_MERCH = gql`
    query {
        merchs{
            id
            name
            desc
            price
            game{
                id
                name
            }
            images{
                id
                image
                url
            }
        }
    }
`

class Merchstore extends Component{
    render(){
        return(
            <div>
                <Query query={GET_MERCH}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        console.log(data);

                        return(
                            <div className="container">
                                <h1>Merch</h1><br></br>
                                {data.merchs.map(merch => (
                                <div className="card border-primary mb-3">
                                    <h3 className="card-title">{merch.name}</h3>
                                    <p className="container"><b>Description: </b>{merch.desc}</p>
                                    <div className="container col-sm-5">
                                    <h5>Price: {merch.price}</h5>
                                    <button className="btn btn-primary">Buy</button>
                                    </div>
                                    <br></br>
                                    <img src={`http://10.0.34.205:8000${merch.images[0].url}`} className="itemIcon"/>
                                </div>
                        ))}
                            </div>
                        )                        
                    }}
                </Query>
            </div>
        );
    }
}

export default Merchstore