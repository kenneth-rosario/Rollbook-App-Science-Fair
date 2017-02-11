/**
 * Created by uncha_000 on 12/30/2016.
 */
import React, {Component} from 'react'
import DialogSimplified from './DialogSimplified'
import {removeGrade} from '../../../../actions/rollActions'
import sessionManager from '../../../../stores/sessionStore'
import gradeManager from '../../../../stores/gradeStore'
export default class RemovePrompt extends Component{

    constructor(props){
        super(props);
        this.removeListen = this.removeListen.bind(this);
        this.state = {
            showModal : false,
            grades: this.props.grades,
            valueSelected : !(this.props.grades===null||this.props.grades===undefined||
                this.props.grades.length===0
            )?this.props.grades[0].test:""
        }
    }
    removeGrade(name){
        removeGrade(this.props.id, name)
    }
    removeListen(){
        let grades = gradeManager.getGradesFromGroupWithId(parseInt(this.props.id));
        this.setState({
            grades:gradeManager.getGradesFromGroupWithId(parseInt(this.props.id)),
            valueSelected:(!(grades === null))?grades[0].test:""
        })
    }
    componentWillMount(){
        sessionManager.on("change", this.removeListen)
    }componentWillUnmount(){
        sessionManager.removeListener("change", this.removeListen)
    }
    change(value){
        this.setState({
            valueSelected:value
        })
    }
    open(){
        this.setState({
            showModal: true
        })
    }close(){
        this.setState({
            showModal: false
        })
    }

    render(){
        return(
            <div>
                <button className="btn btn-danger col-xs-2 " onClick={()=>{
                    this.open()
                }}>Remove a Grade</button>
                <DialogSimplified show = {this.state.showModal}
                    grades={this.state.grades}
                    value = {this.state.valueSelected}
                    onHide = {()=>{
                        this.close()
                    }}
                    change={(value)=>{
                        this.change(value)
                    }}
                    removeGrade={(id)=>{
                        this.removeGrade(id)
                    }}
                />
            </div>
        )
    }

}