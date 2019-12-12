import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Search extends Component{
    state = {
        tagName: ''
    }
    render(){
        const tagName = this.state.tagName
        return(
            <div style={{ "width":"500px", "padding":"1.5%" }}>
            
                    <input className="form-control float-left" type="text" placeholder="Search" value={tagName} onChange={e => this.setState({tagName: e.target.value})} style={{ "width":"350px","padding":"4%" }} />
                    <Link to={`/search/${tagName}`}><button className="btn btn-secondary" type="submit" >Search</button></Link>
                
            </div>
            // <nav class="navbar navbar-light bg-light">
            //     <form class="form-inline">
            //         <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            //         <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            //     </form>
            // </nav>
        )
    }
}

export default Search