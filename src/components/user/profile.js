import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
<<<<<<< HEAD
 
const GET_PROFILE = gql`
   query {
       me{
           id
           DOB
           gender
           phoneNo
           bio
           joined
           avatar
           Customer{
               username
           }
       }
   }
`
 
class Profile extends Component{
   render(){
       return(
           <div>
               <Query query={GET_PROFILE}>
                   {({loading, error, data}) => {
                       if (loading) return 'Loading...';
                       if (error) return `Error! ${error.message}`;
 
                       console.log(data.me.avatar);
 
                       return(
                           <div className="container">
                               <h1>Profile</h1><br></br>                                  
                               <div className="card border-primary mb-3" key={data.me.id}>
                                   <h3 className="card-title"><b>Username: </b>{data.me.Customer.username}</h3>
                                   <h5 className="container"><b>Bio: </b>{data.me.bio}</h5>
                                   <h5 className="container"><b>DOB: </b>{data.me.DOB}</h5>
                                   <h5 className="container"><b>Phone Number: </b>{data.me.phoneNo}</h5>
                                   <h5 className="container"><b>Date joined: </b>{data.me.joined}</h5>
                                   <img src= {`http://10.0.34.205:8000${data.me.avatar}`} alt="" />
                               </div>
                           </div>
                       );          
                   }}
               </Query>
           </div>
       );
   }
}
 
=======

const GET_PROFILE = gql`
    query {
        me{
            id
            DOB
            gender
            phoneNo
            bio
            joined
            avatar
            Customer{
                username
            }
        }
    }
`

class Profile extends Component{
    render(){
        return(
            <div>
                <Query query={GET_PROFILE}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        console.log(data.me.avatar);

                        return(
                            <div className="container">
                                <h1>Profile</h1><br></br>                                   
                                <div className="card border-primary mb-3" key={data.me.id}>
                                    <h3 className="card-title"><b>Username: </b>{data.me.Customer.username}</h3>
                                    <h5 className="container"><b>Bio: </b>{data.me.bio}</h5>
                                    <h5 className="container"><b>DOB: </b>{data.me.DOB}</h5>
                                    <h5 className="container"><b>Phone Number: </b>{data.me.phoneNo}</h5>
                                    <h5 className="container"><b>Date joined: </b>{data.me.joined}</h5>
                                    <img src= {`http://10.0.34.205:8000${data.me.avatar}`} alt="" />
                                </div>
                            </div>
                        );           
                    }}
                </Query>
            </div>
        );
    }
}

>>>>>>> 8640fad553a6af75cebaccdb015cd82c37d8f0fb
export default Profile