/**
 * Created by uncha_000 on 12/21/2016.
 */
import React, {Component} from 'react'
export default class CreateGroup extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="form-group">
                <label htmlFor="name" >Name:</label>
                <input id="name" className="form-control" placeholder="Name"/>
            </div>
        )
    }
}