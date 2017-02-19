/**
 * Created by uncha_000 on 12/19/2016.
 */
import React, {Component} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import ActionPrompt from './ActionPrompt'
import {Link} from 'react-router'


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
//Changed col-xs-offset-2 from parent div
            /*className={
                !(this.props.keytwo%2===0)?"toStyle col-sm-offset-1 col-sm-5":
                "toStyle col-sm-5 col-sm-offset-1"
            }*/
            <div onClick={()=>{this.open()}} className="col-sm-6"  >
                 <div style={{height:150}}className="panel panel-info group">
                        <div className="panel-heading head">{this.props.groupObject.name}</div>
                        <div className="panel-body">
                            Number of Students:{numberOfStudents}
                            <div>
                                {
                                    numberOfStudents>0?
                                    <Link to={"/take-assistance/"+this.props.groupObject.id}>
                                        Take today's assistance</Link>:""
                                }
                            </div>
                        </div>
                 </div>

{/*                <OverlayTrigger placement="top" overlay={toolTip}>
                    <h1 className="text-center">{this.props.groupObject.name}</h1>
                </OverlayTrigger>*/}
                <ActionPrompt name={groupName} show={this.state.showModal}
                              onHide={()=>{this.close()}} id={groupId}
                              href={"/view-group-info/"+groupId}/>
            </div>

        )
    }
}