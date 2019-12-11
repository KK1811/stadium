import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Search extends Component{
    state = {
        tagName: ''
    }
    render(){
        const tagName = this.state.tagName
        return(
            <div>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" value={tagName} onChange={e => this.setState({tagName: e.target.value})} />
                    <Link to={`/search/${tagName}`}><button className   ="btn btn-secondary my-2 my-sm-0" type="submit">Search</button></Link>
                </form>
            </div>
        )
    }
}

export default Search