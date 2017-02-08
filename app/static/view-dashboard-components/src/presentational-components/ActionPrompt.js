/**
 * Created by uncha_000 on 12/19/2016.
 */
import React, {Component} from 'react'
import {Modal, Button, ButtonGroup} from 'react-bootstrap'
import {hashHistory} from 'react-router'
export default class ActionPrompt extends Component {
    constructor(props){
        super(props);
    }
    handleClick(href){
        hashHistory.push(href);
    }
    render(){
        return(
        <Modal show={this.props.show} onHide={()=>{this.props.onHide()}}>
          <Modal.Header closeButton>
            <Modal.Title>What Action Will you take with Group:{this.props.name}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <ButtonGroup vertical block>
                <Button bsStyle="primary">Add Student</Button>
                 <Button bsStyle="default" onClick={
                     ()=>{this.handleClick(this.props.href)}
                 } >View Group Information</Button>
                 <Button bsStyle="danger" >Delete Group</Button>
             </ButtonGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.props.onHide()}}>Close</Button>
          </Modal.Footer>
        </Modal>
        );
    }
}