/**
 * Created by uncha_000 on 12/17/2016.
 */
import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import * as Actions from '../../../actions/rollActions'
import sessionManager from '../../../stores/sessionStore'
import CreateGroup from './dialog-components/createGroup'
import CreateStudent from './dialog-components/createStudent'
export default class Dialog extends Component {
    constructor(props){
        super(props);
    }

    handleClick(action) {
        switch (action) {
            case "CREATE_NEW_GROUP":
                let name = document.getElementById('name').value;
                if (name.length > 0) {
                    console.log(name);
                    Actions.createGroup(name, sessionManager.getCurrentUser().id);
                    this.props.onHide()
                } else {
                    alert("You left name field blank")
                }
                break;
            case "CREATE_NEW_STUDENT":
                    const selectedGroup = document.getElementById("group");
                    console.log(selectedGroup);
                    const Info = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        toGroup: selectedGroup.options[selectedGroup.selectedIndex].value,
                        father_name : document.getElementById('Father').value,
                        mother_name : document.getElementById('Mother').value,
                        pemail: document.getElementById('Pemail').value,
                        tel: document.getElementById("Telephone").value
                    };
                    for(let i in Info){
                        if(""+i !== "toGroup") {
                            if (Info[i].length<4) {
                                alert("some fields are Invalid");
                                return null
                            }
                        }
                    }
                    Actions.createStudent(Info.name,Info.email,Info.toGroup,Info.father_name,Info.mother_name,Info.pemail,Info.tel);
                    this.props.onHide();
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
              {selected===cases[0]?<CreateGroup />:
              <CreateStudent />}
          </Modal.Body>
          <Modal.Footer>

              <Button onClick={()=>{
                      this.handleClick(this.props.selected);
                  }}
                      className="btn btn-primary">Create</Button>
            <Button onClick={()=>{this.props.onHide()}}>Close</Button>
          </Modal.Footer>
        </Modal>

        )
    }
}


