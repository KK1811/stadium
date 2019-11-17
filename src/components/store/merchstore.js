import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import '../../styles/store.css';
// import Navbar from '../navigation/navbar';
import SignedInLinks from '../navigation/signedInLinks';

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
            {/*<Navbar /><br></br><br></br>   */}
            <SignedInLinks /><br></br><br></br>  
                <Query query={GET_MERCH}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        console.log(data);

                        return(
                            <div className="container">
                                <h1>Merch</h1><br></br>
                                {data.merchs.map(merch => (
                                <div className="card border-primary">
                                    <img src={`http://10.0.55.121:8000${merch.images[0].url}`} className="col-3" alt="" style={{top: '70px'}} />
                                    <center>
                                    <div className="col-3" style={{bottom: "100px"}}>
                                    <h3 className="card-title">{merch.name}</h3>
                                    <p className="container"><b>Description: </b>{merch.desc}</p>
                                    <h5>Price: ₹{merch.price}</h5>
                                    <br></br>
                                    </div>
                                    </center>
                                    
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