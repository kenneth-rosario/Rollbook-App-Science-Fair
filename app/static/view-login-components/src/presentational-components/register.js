/**
 * Created by uncha_000 on 12/14/2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import PassWordWrapper from './PassWordWrapper'
export default class Register extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        return(
          <div className="container-fluid" style={{backgroundColor:"#89c1ff", padding:30, borderRadius:30, color:'white', maxWidth:650,
          marginTop:10}}>
          <div className="row ">
              <h1 className="text-center" >Register Now!!</h1>
              <div className="form-group">
                    <label htmlFor="fullname" >Full Name:</label>
                    <input id="fullname" type="text" className="form-control"/>
                    <label htmlFor="email" >Email:</label>
                    <input id="email" type="email" className="form-control"/>
              </div>
              <PassWordWrapper />
              <div className="form-group">
                    <label htmlFor="school">School:</label>
                    <input id="school" type="text" className="form-control" />
              </div>
              <Link to="/"><button className="btn btn-primary" onClick={()=>{this.props.submit()}}>Register</button></Link>
              <Link to="/" >Go Back</Link>
          </div>
          </div>
        );
    }
}