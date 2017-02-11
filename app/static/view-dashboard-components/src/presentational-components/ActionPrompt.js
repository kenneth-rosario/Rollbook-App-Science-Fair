/**
 * Created by uncha_000 on 12/19/2016.
 */
import React, {Component} from 'react'
import {Modal, Button, ButtonGroup} from 'react-bootstrap'
import * as Actions from '../../../actions/rollActions'
import {hashHistory} from 'react-router'
export default class ActionPrompt extends Component {
    constructor(props){
        super(props);
    }
    handleClick(href){
        hashHistory.push(href);
    }
    deleteClick(group_id){
        let Confirm = confirm("Are You sure you wish to delete the group "+this.props.name+" ?");
        if(Confirm) {
            Actions.deleteGroup(group_id);
            this.props.onHide()
        }else{
            return null;
        }
    }
    render(){
        return(
        <Modal show={this.props.show} onHide={()=>{this.props.onHide()}}>
          <Modal.Header closeButton>
            <Modal.Title>What Action Will you take with Group:{this.props.name}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <ButtonGroup vertical block>
                 <Button bsStyle="default" onClick={
                     ()=>{this.handleClick(this.props.href)}
                 } >View Group Information</Button>
                 <Button bsStyle="danger" onClick ={()=>{
                     this.deleteClick(this.props.id)
                 }} >Delete Group</Button>
             </ButtonGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.props.onHide()}}>Close</Button>
          </Modal.Footer>
        </Modal>
        );
    }
}