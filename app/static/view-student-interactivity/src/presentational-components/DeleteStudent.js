/**
 * Created by uncha_000 on 1/10/2017.
 */
import React, {Component} from 'react'
import * as Actions from '../../../actions/rollActions'
export default class DeleteStudent extends Component{
    constructor(props){
        super(props);
    }
    DeleteRequest(){
        let Check = confirm("Are you Sure you wish to Delete this student?");
        if(Check){
            Actions.deleteStudent(this.props.id);
        }
    }
    render(){
        return(
            <div className="col-xs-offset-2 col-xs-3">
                <button className="btn btn-danger btn-lg"
                    onClick={()=>{
                        this.DeleteRequest()
                    }}
                >
                    Delete Student
                </button>
            </div>
        )
    }
}