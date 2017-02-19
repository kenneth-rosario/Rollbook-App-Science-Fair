/**
 * Created by uncha_000 on 2/10/2017.
 */
import React,{Component} from 'react'
import groupManager from '../../stores/groupStore'
import StudentRow from './StudentRow'
import {addAssistance} from '../../actions/rollActions'
import sessionManager from '../../stores/sessionStore'
export default class Assistance extends Component{
    constructor(props){
        super(props);
        this.state = {
            group : groupManager.getGroupById(parseInt(this.props.params.id))
        }
    }
    submitTable(){
        let tableData = document.getElementById("assistance").children[1].children;
        let object_to_send = [];
        for(let i = 0 ; i < tableData.length; i++){
            console.log(tableData[i]);
            let toPush = {
                id:parseInt(tableData[i].children[0].innerHTML),
                checked:tableData[i].children[3].children[0].checked,
                teacher_id:sessionManager.getCurrentUser().id
            };
            object_to_send.push(toPush)
        }
        addAssistance(object_to_send);
    }
    render(){

        let students = this.state.group.students;
        let date = new Date();
        let style = {
            overflowY: "auto",
            height:window.innerHeight - 380
        };
        return(
            <div >
                <h3>Assistance For Group:{this.state.group.name}</h3>
                <h4>Date:</h4>
                   <blockquote> <p>m/d/y</p>
                    <h4>{date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear()}</h4>
                   </blockquote>
                <table id="assistance" className="table table-bordered table-responsive" style={style}>
                    <thead>
                        <tr>
                            <td>Student Id</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Check if absent</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        students.map((element, key)=>{
                            return <StudentRow object={element} key={key} />
                        })
                    }
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={()=>{
                    this.submitTable()
                }}>
                    Add Assistance
                </button>
            </div>
        )
    }
}