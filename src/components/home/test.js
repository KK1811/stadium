import React,{Component} from 'react'

class Test extends Component{
    render(){
        return(
            <div>
                {console.log(this.props)}
            </div>
        )
    }
}

export default Test