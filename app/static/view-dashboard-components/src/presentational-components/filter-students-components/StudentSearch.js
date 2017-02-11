/**
 * Created by uncha_000 on 1/13/2017.
 */
import React, {Component} from 'react'

export default class StudentSearch extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="form-group">
                <h5>{this.props.value}</h5>
                <input
                    placeholder="Search by Name"
                    className="form-control"
                    onChange={(event)=>{this.props.onChange(event)}}
                    value={this.props.value}
                />
            </div>
        )
    }
}