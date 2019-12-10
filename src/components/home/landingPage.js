import React, { Component} from 'react'
import ControlledCarousel from './slideShow'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';
// import Navbar from '../navigation/navbar'
import pacman from '../../assets/simple_pokeball.gif'

const GET_UID = gql`
query {
    me{
        id
        Customer{
            username
        }
    }
}`

class landingPage extends Component{
  state = {
      loading: true,
  }
  
  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 1000)
  }
    _reload(){window.location.reload()}
    
    render(){
        if (this.state.loading) return LoadingMessage();
        return(
            <div>
                <Query query={GET_UID}>
                    {({loading, error, data}) => {
                        if (loading) return '';
                        if (error) return '';

                        console.log(data.me.id);
                        console.log(data.me.Customer.username)
                        localStorage.setItem("uid", data.me.id)
                        localStorage.setItem("uname", data.me.Customer.username)

                        return(
                            <div className="container">
                            </div>
                        );           
                    }}
                </Query>
                <div className="container">
                    <ControlledCarousel />
                </div>
            </div>
        )
    }

    _splash = () => {
        console.log("in splash");
      };
}

function LoadingMessage() {
    return (
      <div className="splash-screen">
        <img
            className="col-lg-6"
            src={pacman}
            alt=""
        />
      </div>
    );
  }
export default landingPage