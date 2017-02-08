/**
 * Created by uncha_000 on 12/14/2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
export default class Register extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        return(
          <div className="container-fluid align-middle" style={{backgroundColor:"#89c1ff", padding:50, borderRadius:30, color:'white', maxWidth:650 }}>
          <div className="row ">
              <h1 className="text-center" >Register Now!!</h1>
              <div className="form-group">
                    <label htmlFor="fullname" >Full Name:</label>
                    <input id="fullname" type="text" className="form-control"/>
                    <label htmlFor="email" >Email:</label>
                    <input id="email" type="email" className="form-control"/>
                    <label htmlFor="password" >Password:</label>
                    <input id="password" type="password" className="form-control"/>
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