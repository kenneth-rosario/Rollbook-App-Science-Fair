/**
 * Created by uncha_000 on 12/14/2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Login extends Component {
    constructor(props){
        super(props);
    }
    handleClick(){
        console.log(document.getElementById('email').value);
        console.log(document.getElementById('password').value);
        this.props.submit(document.getElementById('email').value, document.getElementById('password').value)
    }
    render(){
        return(

            <div className="container-fluid" style={{padding:50,backgroundColor:'#7aabef',borderRadius:20, maxWidth:650, color:'white',
            marginTop:100}}>
                <div className="row" >
                    <h1 className="text-center">The Roll Book App</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input id="email" ref="email" className="form-control" />
                        <label  htmlFor="password">Password:</label>
                        <input id="password" ref="password" className="form-control" type='password'/>
                        <button className="btn btn-success btn-md" onClick={()=>{this.handleClick()}} style={{margin:15}}>Login</button>
                        <p><Link to="register" >or Register</Link></p>
                    </div>
                </div>
            </div>

        )
    }
}