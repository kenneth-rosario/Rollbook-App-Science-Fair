import React, {Component} from 'react'

export default class Search extends Component {

    render(){
	    return (
	    	<div className="row jumbotron" >
				<div className="input-group">
					<input className="form-control" placeholder="Search for students" type="text" />
					<div className="input-group-btn">
						<button className="btn btn-default"><span className="glyphicon-search"></span></button>
					</div>
				</div>
			</div>
		);
	}
}