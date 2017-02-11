/**
 * Created by uncha_000 on 12/17/2016.
 */
import React, {Component} from 'react'
import sessionManager from '../../../stores/sessionStore'
import * as Actions from '../../../actions/rollActions'
import Login from '../presentational-components/login'
import DashBoard from '../../../view-dashboard-components/src/presentational-components/Dashboard'
export default class LoginContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Login submit = {
                (email,password)=>{
                    Actions.Login(email,password);
                }}
                />
            </div>
        )
    }
}