/**
 * Created by uncha_000 on 12/17/2016.
 */
import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import * as Actions from '../../../actions/rollActions'
import sessionManager from '../../../stores/sessionStore'
import groupManager from '../../../stores/groupStore'
import CreateGroup from './dialog-components/createGroup'
import CreateStudent from './dialog-components/createStudent'

export default class Dialog extends Component {
    constructor(props){
        super(props);
        this.state={
            showMultiple:false
        }
    }
    showMultiple(){
        this.setState({
            showMultiple:!this.state.showMultiple
        })
    }
    handleClick(action, multipleSelect=false ) {
        switch (action) {
            case "CREATE_NEW_GROUP":
                let name = document.getElementById('name').value;
                if (name.length > 0) {
                    console.log(name);
                    Actions.createGroup(name, sessionManager.getCurrentUser().id)
                } else {
                    alert("You left name field blank")
                }
                break;
            case "CREATE_NEW_STUDENT":
                if(!multipleSelect) {
                    const selectedGroup = document.getElementById("group");
                    console.log(selectedGroup);

                    const Info = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        toGroup: selectedGroup.options[selectedGroup.selectedIndex].value
                    };

                    for(let i in Info){if(Info[i].length===0){alert("you left a blank field"); return null}}
                    Actions.createStudent(Info.name, Info.email, Info.toGroup);
                }else{
                   const form = document.getElementById("groups").children;
                   console.log(form);
                   const selectedItems = groupManager.getCheckedItemsFrom(form);
                   const Info={
                       multipleSelect:true,
                       toGroup:selectedItems,
                       name: document.getElementById('name').value,
                       email: document.getElementById('email').value,
                   }
                   for(let i in Info){if(Info[i].length===0){alert("you left a blank field"); return null}}
                    Actions.createStudent(Info.name,Info.email,Info.toGroup,Info.multipleSelect)
                }
                break;
            default:
                console.log("Check your switch for errors");
        }
    }
    render(){
        const selected = this.props.selected;
        const cases = ["CREATE_NEW_GROUP", "CREATE_NEW_STUDENT"];
        return(
        <Modal show={this.props.show} onHide={()=>{this.props.onHide()}}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*<div className="form-group">*/}
                {/*<label htmlFor="name" >Name:</label>*/}
                {/*<input id="name" className="form-control" placeholder="Create new Group"/>*/}
            {/*</div>*/}
              {selected===cases[0]?<CreateGroup />:
              <CreateStudent showMultiple={this.state.showMultiple} handleClick={()=>{this.showMultiple()}
              } />}
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={()=>{
                  this.handleClick(this.props.selected,this.state.showMultiple);
                  this.props.onHide();}} className="btn btn-primary">Create</Button>
            <Button onClick={()=>{this.props.onHide()}}>Close</Button>
          </Modal.Footer>
        </Modal>

        )
    }
}


