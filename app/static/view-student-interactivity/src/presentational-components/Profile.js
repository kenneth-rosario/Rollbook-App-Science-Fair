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
export default class StudentProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
           student : studentManager.getStudentById(parseInt(this.props.params.id)),
        }
    }
    render(){
        let group = groupManager.getGroupById(parseInt(this.state.student.group_id));
        const currentUser = sessionManager.getCurrentUser().fullname;
        return(
            <div className="row info-window" style={{overflowX:"unset", paddingBottom:5,
            fontFamily: "'Roboto Condensed', sans-serif"
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
                    <Performance
                        id = {parseInt(this.props.params.id)}
                    />
                <br />
                <div className="col-xs-12">
                    <DataTable
                        id = {parseInt(this.props.params.id)}
                    />
                </div>
                <br />
                <div className="col-xs-12">
                    <ScoreNeeded
                        id = {parseInt(this.props.params.id)}
                    />
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