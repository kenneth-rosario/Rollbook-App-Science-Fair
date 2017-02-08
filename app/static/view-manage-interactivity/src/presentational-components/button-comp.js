import React, {Component} from 'react'
// import {ButtonGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap'
export default class BtnComponent extends Component {
	constructor(props,context){
	    super(props,context);
	    this.state = {

        }
	}
    render(){
	    return (
            <div className="row" style={{marginTop:-30}}>
				<ul className="nav nav-pills nav-justified">
                    <li id="Add"><a href="#" >Add Student</a></li>
                    <li ><a href="#" >Manage Grades</a></li>
                </ul>
            </div>
		);
	}
}