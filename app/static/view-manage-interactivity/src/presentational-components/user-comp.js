import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Student extends Component {
	constructor(props){
	    super(props);
    }
    render(){
	    return(
            <div className="row" style={{backgroundColor:this.props.color}}>
                <h4 className="col-xs-8">Name:{this.props.student.name}</h4>
                <h4 className="col-xs-4">Group:{this.props.student.group}</h4>
                <h4 className="col-xs-8">Email:{this.props.student.email}</h4>
                <h4 className="col-xs-4">Number:{this.props.student.registryNum}</h4>
            </div>
        );
    }
}