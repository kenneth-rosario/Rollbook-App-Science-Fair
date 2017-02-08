/**
 * Created by uncha_000 on 12/21/2016.
 */
import React, {Component} from 'react'
import groupManager from "../../../stores/groupStore"
import {Link} from 'react-router'
export default class ViewGroup extends Component {

    constructor(props){
        super(props);
    }

    render(){
        const group = groupManager.getGroupById(parseInt(this.props.params.id));
        console.log(group);
        console.log(this.props.params.id);


            return (
                <div className="row info-window">
                    <div className="col-xs-12">
                        <h2>{group.name} information</h2>
                    </div>
                    <div className="col-xs-12">
                        <h4>
                            Number of Students:{group.students.length}
                        </h4>
                    </div>
                    <div className="col-xs-12">
                        <h4>
                            View Student List with Overall Grades
                        </h4>
                    </div>
                    <div className="col-xs-12">
                        <Link to="/" > Go Back </Link>
                    </div>
                </div>
            );

        }
 }
