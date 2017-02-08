/**
 * Created by uncha_000 on 12/15/2016.
 */
import Register from '../presentational-components/register'
import React, {Component} from 'react'
import * as Actions from '../../../actions/rollActions'

export default class RegisterContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            redirect : false
        }
    }
    submit() {

        console.log("Im inside register");
        const newUser = {
            "fullname": document.getElementById('fullname').value,
            "email": document.getElementById('email').value,
            "password": document.getElementById('password').value,
            "school": document.getElementById('school').value
        };
        console.log(newUser);
        for (let ii in newUser) {
            if (newUser[ii].length === 0) {
                alert("you left a blank input");
                return null;
            }
        }
        fetch("/create-new-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then((response) => {
            let elements = document.getElementsByTagName("input");
            for (let ii = 0; ii < elements.length; ii++) {
                elements[ii].value = "";
            }
            return response.json()
        }).then((JSON) => {
            alert("You have created the user: " + JSON.fullname);
        });
    }


    //TODO Continue Ajax Implementation in Register Component
    render(){
        return <Register submit = {()=>{this.submit()}}/>
    }

}