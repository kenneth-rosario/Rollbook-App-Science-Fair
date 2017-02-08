import React, {Component} from 'react'

export default class InfoPart extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="col-xs-6" style={{marginTop:20}}>
                <h5>{this.props.title} :{this.props.attribute}</h5>
            </div>
        )
    }
}