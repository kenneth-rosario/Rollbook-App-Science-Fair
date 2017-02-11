/**
 * Created by uncha_000 on 12/30/2016.
 */
import React, {Component} from 'react'
import {Modal} from 'react-bootstrap'
// TODO:work on updating options when something is deleted
export default class DialogSimplified extends Component{
    constructor(props){
        super(props);
    }
    linking(evt){
        this.props.change(evt.target.value)
    }
    render(){
        console.log(this.props.grades);
        return(
            <Modal show={this.props.show} onHide={()=>{this.props.onHide()}}>
          <Modal.Header closeButton>
            <Modal.Title>What Action Will you take with Group:{this.props.name}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <h3>Which grade will you delete</h3>
              <div className="form-group">
                <select className="form-control"
                        value={this.props.value} onChange={(event)=>{
                    this.linking(event)
                }}>
                    {
                        !(this.props.grades === null||this.props.grades === undefined)
                            ? this.props.grades.map((element,key)=>{
                           return(
                            <option value={element.test} key={7102030405+key}>
                                {element.test}
                            </option>
                           )
                        }):""
                    }
                </select>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={()=>{this.props.onHide()}}>Close</button>
              <button onClick={()=>{this.props.removeGrade(this.props.value); this.props.onHide()}} className = "btn btn-danger"> Remove Grade</button>
          </Modal.Footer>
        </Modal>
        )
    }
}