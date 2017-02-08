import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Student from './user-comp.js'

export default class Display extends Component {
	constructor(props,context){
		super(props,context);

	}

	render(){
	    let students = this.props.students;
	    return (
	        <div>
                {
                    students.map((alumn, i)=>{
                        return <Student student={alumn} color={i%2===0?"#ffffcc":"#99ccff"} />
                    })
                }
            </div>
		);
	}
}