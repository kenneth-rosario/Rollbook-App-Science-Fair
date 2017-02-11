/**
 * Created by uncha_000 on 1/15/2017.
 */
import React,{Component} from 'react'

export default class SearchStudentRow extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="row-search" className="form-group">
                <input
                    className="form-control"
                    onChange={(event)=>{
                        this.props.onChange(event)
                    }}
                    placeholder="Search for student by name"
                />
            </div>
        )
    }
}