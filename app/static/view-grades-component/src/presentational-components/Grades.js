/**
 * Created by uncha_000 on 12/26/2016.
 */
import React, {Component} from 'react'
import groupManager from '../../../stores/groupStore'
import StudentRow from './StudentRow'
import sessionManager from '../../../stores/sessionStore'
import RemovePrompt from './grade-dialog/RemoveGradeModal'
import {hashHistory} from 'react-router'
import CalcWrapper from '../container-components/CalcWrapper'
import SearchStudentRow from './SearchStudentRow'

export default class Grades extends Component {
    constructor(props) {
        super(props);
        this.GradeListener = this.GradeListener.bind(this);
        this.state = {
            group: groupManager.getGroupById(parseInt(this.props.id)),
            additionalColumns: 0,
            value : "",
            students: groupManager.filterStudentsFromGroupWithId(
                parseInt(this.props.id),""
            ),
            disable:false
        };
    }
    onChange(evt){
        const toSet = groupManager.filterStudentsFromGroupWithId(
                parseInt(this.props.id),evt.target.value
            );
        this.setState({
            value:evt.target.value,
            students:toSet,
            disable:evt.target.value.length > 0,
            additionalColumns:0
        })
    }
    GradeListener(){
        console.log("I am here");
        this.setState({
                    group: groupManager.getGroupById(parseInt(this.props.id)),
                    students:groupManager.filterStudentsFromGroupWithId(
                        parseInt(this.props.id),this.state.value),
                    additionalColumns:0
                });

    }
        componentWillMount()
        {
            alert("Test names are unique. If you try to add" +
                " an existing grade it will update the test with that name");
            console.log(this.props.id);
            console.log(groupManager.getGroupById(parseInt(this.props.id)));
            sessionManager.on("change", this.GradeListener);
        }
        componentWillUnmount(){
            sessionManager.removeListener("change", this.GradeListener)
        }
    addColumn(){
        this.setState({
            additionalColumns:this.state.additionalColumns + 1
        })
    }
    removeColumn(){
        this.setState({
            additionalColumns:this.state.additionalColumns - 1
        })
    }
    returnHeaderOrder(){
        console.log(this.state.group.students[0].grades);
        let numCol = this.state.group.students[0].grades;
        console.log(numCol);
        let header = [];
        if(numCol.length>0) {
            for (let i=0; i<numCol.length; i++) {
                console.log(numCol[i].test);
                let dimelo = numCol[i].test;
                header.push(dimelo);
            }
        }
        return header
    }
    returnNumberOfColumns(){
        console.log(this.state.group);
        let numberOfGrades = this.state.group.students[0].grades;
        let jsx = [];
        if(numberOfGrades.length>0) {
            for (let i = 0; i < numberOfGrades.length; i++) {
                console.log(numberOfGrades[i]);
                jsx.push(numberOfGrades[i].test)
            }
            for(let i=0; i<this.state.additionalColumns; i++){
                jsx.push((
                    <div>
                        <input className="grades-names" type="text" placeholder="new test name" />

                        <br />
                        {
                            (i === this.state.additionalColumns - 1)?
                            <button onClick={()=>{
                                this.removeColumn()
                            }} className="btn btn-link">Remove Column</button>:""
                        }
                    </div>
                ))
            }
        }else{
            for(let i=0; i<this.state.additionalColumns; i++){
                jsx.push(
                    (
                        <div >
                            <input type="text" className="grades-name" placeholder="new test name" /><br />
                            {
                                (i===this.state.additionalColumns - 1)?
                                <button onClick={() => {
                                    this.removeColumn()
                                }} className="btn btn-link">
                                    Remove Column</button>:""
                            }
                        </div>
                    )
                )
            }
        }
        return jsx
    }

    render(){
        let style = {
            height: window.innerHeight - 90,
            overflowY:"auto"
        }
        let numCol = this.returnNumberOfColumns();
        let students = this.state.students;
        let header = this.returnHeaderOrder();
        return(
            <div style={style}>
                <CalcWrapper />
                <h1>Grades for group: {this.state.group.name}</h1>
                <button  onClick={()=>{
                    !this.state.disable&&this.addColumn()
                }} className={ !this.state.disable?
                    "btn btn-primary col-xs-2":"btn btn-primary disabled"
                }>Add new Column</button>
                <RemovePrompt
                    grades={this.state.group.students[0].grades}
                    id={this.props.id}
                />

                <SearchStudentRow
                    onChange={(evt)=>{this.onChange(evt)}}
                    value={this.state.value}
                />

                <div id="the-table" className="col-xs-12">
                    <table id="grade-table" className="table table-sm  table-bordered table-responsive ">
                        <thead id="head">
                            <tr className="info">
                                <td>
                                    Student
                                </td>
                                <td>
                                    Email
                                </td>
                                {
                                    numCol.map((element,key)=>{
                                        return <td   key={98765+key}>{element}
                                            {/*<RemoveColumn id={this.props.id} name={element} />*/}
                                        </td>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                        {
                            students.map((element,key)=>{
                                return(
                                        <StudentRow  student={element} key={1234343434+key}
                                            emptyColumns = {this.state.additionalColumns}
                                            orderBy = {()=>{this.returnHeaderOrder()}}
                                            header = {header}
                                                     group_id={this.props.id}
                                                     id={element.id}
                                        />
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <button onClick={()=>{
                    this.props.ajaxCall()
                }} className="btn btn-success col-xs-4"
                >Add New Grades</button>

            </div>
        )
    }
}