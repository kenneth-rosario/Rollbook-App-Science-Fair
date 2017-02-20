/**
 * Created by uncha_000 on 12/29/2016.
 */
import React, {Component} from 'react'
import sessionManager from '../../../stores/sessionStore'
import RemoveColumn from './Grades'
export default class IndividualGrade extends Component{
    constructor(props){
        super(props);
        this.indiListen=this.indiListen.bind(this);
        this.state = {
            toInput:false
        }
    }
    toInput(){
        this.setState({
            toInput:true
        })
    }
    back(){
        this.setState({
            toInput:false
        })
    }
    indiListen(){
        this.setState({
                toInput:false
            })
    }
     componentWillMount(){
        sessionManager.on("change", this.indiListen)
    }
    componentWillUnmount(){
         sessionManager.removeListener("change", this.indiListen)
    }
    render(){
        let toInput = this.state.toInput;
        return(
           <div>
            {
                (!toInput)?
                <button style={{
                    color:"white"
                }} className="btn btn-link" onClick={() => {
                    this.toInput()
                }}>
                    {this.props.grade}
                </button>:<input onDoubleClick={()=>{
                    this.back()
                }} type="numeric" placeholder="Double Click to Exit input"
                                 className="input-sm"/>

            }
           </div>
        )
    }
}