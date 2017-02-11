/**
 * Created by uncha_000 on 1/13/2017.
 */
import Modal from '../../../../node_modules/react-bootstrap/lib/Modal'
import React, {Component} from 'react'

export default class ModalMarkup extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Modal show={this.props.show}>
                   <Modal.Header>
                        <Modal.Title>
                            Send Mail
                        </Modal.Title>
                   </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <h4>Add any Comments</h4>
                            <textarea
                                id="email-comment"
                                placeholder="Add comments" className="form-control" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                            <button className="btn btn-success"
                                onClick={()=>{
                                    this.props.onClick()
                                }}
                            >Send Email</button>
                            <button onClick={()=>{
                                this.props.hide()
                            }} className="btn btn-primary">
                                Close
                            </button>
                    </Modal.Footer>
            </Modal>
        )
    }
}