/**
 * Created by uncha_000 on 1/2/2017.
 */
import React, {Component} from 'react'
import studentManager from '../../../stores/studentStore'
import groupManager from '../../../stores/groupStore'
import Performance from './Performance'
import DataTable from './DataTable'
import ScoreNeeded from './ScoreNeeded'
import EmailParent from './EmailParent'
import DeleteStudent from './DeleteStudent'
import sessionManager from '../../../stores/sessionStore'
import Accordion from '../../../node_modules/react-bootstrap/lib/Accordion'
import Panel from '../../../node_modules/react-bootstrap/lib/Panel'
import {deleteAssistance} from '../../../actions/rollActions'
export default class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.studentListen = this.studentListen.bind(this);
        this.state = {
           student : studentManager.getStudentById(parseInt(this.props.params.id)),
            performance: studentManager.performanceFunction(studentManager.getAvgGradeForStudentWithId(parseInt(
                this.props.params.id)))
        }
    }
    studentListen(){
        this.setState({
            student : studentManager.getStudentById(parseInt(this.props.params.id)),
            performance: studentManager.performanceFunction(studentManager.getAvgGradeForStudentWithId(parseInt(
                this.props.params.id)))
        })
    }
    componentWillMount(){
        sessionManager.on("change",this.studentListen)
    }
    componentWillUnmount(){
        sessionManager.removeListener("change",this.studentListen)
    }
    deleteAssistance(id){
        deleteAssistance({
            id:parseInt(id),
            user_id:parseInt(this.state.student.teacher_id)
        })
    }
    render(){
        let group = groupManager.getGroupById(parseInt(this.state.student.group_id));
        const currentUser = sessionManager.getCurrentUser().fullname;
        let table_style={
            border:"none", borderCollapse:"collapsed",
            padding:15
        };
        return(
            <div className="row"
                 style={{overflowY:"auto", paddingBottom:5,
            fontFamily: "'Roboto Condensed', sans-serif",
                     height:window.innerHeight - 80
            }}>

                <div className = "col-xs-12">
                    <div className="col-sm-7 ">
                        <h3 >
                            {this.state.student.name}
                        </h3>
                    </div>
                    <div className="col-sm-5">
                        <h4>
                            Group: {group.name}
                        </h4>
                    </div>
                </div>
                <div className="col-xs-12">
                    <hr />
                </div>
                <div className="col-xs-12">
                    <Accordion>
                        <Panel header ="Student's Performance" bsStyle={
                            (this.state.performance==="F"||this.state.performance==="D")?"danger":"info"}
                               eventKey="1">
                                <Performance
                            id = {parseInt(this.props.params.id)}/>
                            <div className="col-xs-12">
                                <ScoreNeeded
                                    id = {parseInt(this.props.params.id)}
                                />
                            </div>
                        </Panel>
                        <Panel header="Legal Guardian's Information" eventKey="2">
                            <ul>
                                <li>Name: {this.state.student.parents.name}</li>
                                <li>Email: {this.state.student.parents.email}</li>
                                <li>Telephone: {this.state.student.parents.telephone}</li>
                            </ul>
                        </Panel>
                         <Panel header="Days Missed" bsStyle="danger" eventKey="3">
                        <table className="table table-responsive"
                        style={table_style}>
                        {
                            this.state.student.days_missed.map((element,key)=>{
                                return (

                                        <tr style={{padding:14}}>

                                            <td
                                                style={table_style}
                                            >Date(year-month-day): {element.date}</td>
                                            <td
                                                style={table_style}
                                            ><button
                                                onClick={()=>{this.deleteAssistance(element.id)}}
                                                className="btn btn-danger">Delete</button></td>
                                        </tr>
                                )
                            })
                        }
                        </table>
                    </Panel>
                    </Accordion>
                </div>
                <div className="col-xs-12">
                            <DataTable
                                id = {parseInt(this.props.params.id)}
                            />
                </div>
                <br />
                <div className="col-xs-12">
                    <br />
                </div>
                <div className="col-xs-12">
                    <EmailParent
                        group={group.name}
                        teacher={currentUser}
                        student = {this.state.student}
                    />
                    <DeleteStudent
                        id = {parseInt(this.props.params.id)}
                    />
                </div>
            </div>
        )
    }
}