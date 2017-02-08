/**
 * Created by uncha_000 on 12/19/2016.
 */
import React, {Component} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import ActionPrompt from './ActionPrompt'


export default class Groups extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal:false
        }
    }
    open(){
        this.setState({
            showModal:true
        })
    }close(){
        this.setState({
            showModal:false
        })
    }
    render(){
        let numberOfStudents = this.props.groupObject.students.length;
        let groupName = this.props.groupObject.name;
        let groupId = this.props.groupObject.id;
        const toolTip =(
            <Tooltip id="tooltip"><strong>Number of Students:{numberOfStudents}</strong></Tooltip>
        );
        return (

            <div onClick={()=>{this.open()}} className="toStyle col-xs-offset-2 col-xs-8" >
                <OverlayTrigger placement="top" overlay={toolTip}>
                    <h1 className="text-center">{this.props.groupObject.name}</h1>
                </OverlayTrigger>
                <ActionPrompt name={groupName} show={this.state.showModal}
                              onHide={()=>{this.close()}} id={groupId}
                              href={"/view-group-info/"+groupId}/>
            </div>

        )
    }
}