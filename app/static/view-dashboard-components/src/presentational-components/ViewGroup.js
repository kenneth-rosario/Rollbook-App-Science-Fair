/**
 * Created by uncha_000 on 12/21/2016.
 */
import React, {Component} from 'react'
import groupManager from "../../../stores/groupStore"
import {Link} from 'react-router'
import StudentSearch from './filter-students-components/StudentSearch'
export default class ViewGroup extends Component {

    constructor(props){
        super(props);
        this.state = {
            group:groupManager.getGroupById(parseInt(this.props.params.id)),
            students: groupManager.filterStudentsFromGroupWithId(
                parseInt(this.props.params.id), ""
            ),
            value: ""
        }
    }

     onChange(evt){
        let toSet = groupManager.filterStudentsFromGroupWithId(
            parseInt(this.props.params.id), evt.target.value
        );
        this.setState({
            students: toSet,
            value: evt.target.value
        })
     }

    render(){
        const group = this.state.group;
        console.log(group);
        console.log(this.props.params.id);
        const students = this.state.students;

            return (
                <div className="row " style={{overflowY:"auto",marginTop:-10}}>
                    <div className="col-xs-12">
                        <h2>{group.name} information</h2>
                    </div>
                    <div className="col-xs-12">
                        <h4>
                            Number of Students:{students.length}
                        </h4>
                    </div>
                    {
                        students.length > 0?
                        <div className="col-xs-12">
                            <h4>
                                <Link
                                    to={"/groups/" + this.props.params.id + "/grades"}>
                                    View, Create, or Update Grades
                                </Link>
                            </h4>
                        </div>:""
                    }
                    <div className="col-xs-12">
                        <Link to="/" > Go Back </Link>
                        <hr />
                        <h3>Students in Group</h3>
                    </div>
                    <div className="col-xs-12">
                        <StudentSearch
                            value = {this.state.value}
                            onChange = {(event)=>{
                                this.onChange(event)
                            }}
                        />
                        <div style = {{height:250,overflowY:"auto"}}>
                            <ul>
                                {students.map((element, key)=>{
                                return(
                                    <li key={123456789+key} >
                                        <Link to={"/student-profile/"+element.id}>
                                            Name: {element.name}, Email:{element.email}
                                        </Link>
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
            );

        }
 }
