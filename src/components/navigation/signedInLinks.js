import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../auth/logout'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_UID = gql`
    query {
        me{
            id
        }
    }
`

const SignedInLinks = () => {
    return(
        <div>
            <Query query={GET_UID}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                console.log(data);
            return(
                <div>
                    <ul className="navbar-nav mr-auto float-left">
                        <li className="nav-item active"><NavLink to='/gamestore'><div className="float-left"><button type="button" className="btn btn-primary right">Game Store</button></div></NavLink></li>
                        <li className="nav-item active"><NavLink to='/merchstore'><div className="float-left"><button type="button" className="btn btn-primary right">Merch Store</button></div></NavLink></li>
                        <li className="nav-item active"><NavLink to={`/library/${data.me.id}`}><div className="float-left"><button type="button" className="btn btn-primary right">Library</button></div></NavLink></li>
                        <li className="nav-item active"><NavLink to='/friends'><div className="float-right"><button type="button" className="btn btn-primary right">Friends</button></div></NavLink></li>
                    
                    {/* <li className="nav-item active"><NavLink to='/logout'><div className="float-right"><button type="button" className="btn btn-primary right">Logout</button></div></NavLink></li> */}
                    
                    </ul>

                    <ul className="navbar-nav mr-auto float-right">
                        
                        <li className="nav-item active"><NavLink to='/profile'><div className="float-right"><button type="button" className="btn btn-primary right">Profile</button></div></NavLink></li>
                        <li className="nav-item active"><Logout /></li>
                    </ul>
                </div>
            )
            }}
            </Query>
        </div>
    )
}

export default SignedInLinks