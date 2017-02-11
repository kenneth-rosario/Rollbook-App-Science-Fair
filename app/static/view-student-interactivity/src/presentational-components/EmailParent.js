/**
 * Created by uncha_000 on 1/8/2017.
 */
import React, {Component} from 'react'
import studentManager from '../../../stores/studentStore'
import * as Actions from '../../../actions/rollActions'
import ModalMarkup from './email-modal/ModalMarkup'
export default class EmailParent extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal : false
        }
    }
    open(){
        this.setState({
            showModal: true
        })
    }
    close(){
        this.setState({
            showModal: false
        })
    }
    sendEmail(){
        console.log(this.props.teacher);
        console.log(this.props.group);
        let info_object = {
            student:this.props.student.name,
            email:this.props.student.email,
            performance:studentManager.performanceFunction(studentManager.getAvgGradeForStudentWithId(
                parseInt(this.props.student.id)
            )),
            grades:this.props.student.grades,
            parents:this.props.student.parents,
            comments:document.getElementById("email-comment").value,
            teacher:this.props.teacher,
            group:this.props.group
        };
        this.close();
        Actions.emailParent(info_object)
    }
    render(){
        return(
          <div className="col-xs-offset-2 col-xs-3 ">
            <button className="btn btn-info btn-lg" onClick={()=>{
                this.open()
            }}>
                Email Parent
            </button>
            <ModalMarkup
                onClick={()=>{this.sendEmail()}}
                show={this.state.showModal}
                hide={()=>{this.close()}} />
          </div>
        )
    }
}