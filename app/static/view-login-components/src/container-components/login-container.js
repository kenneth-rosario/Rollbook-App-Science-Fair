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
        this.state ={
            loggedIn : sessionManager.isLogedIn(),
            currentUser : sessionManager.getCurrentUser()
        }
    }
    setNewState(loggedIn, currentUser){
        this.setState({
            loggedIn:loggedIn,
            currentUser:currentUser
        })
    }
    componentWillMount(){
        sessionManager.on("change",()=>{
            this.setNewState(
                sessionManager.isLogedIn(),
                sessionManager.getCurrentUser()
            );
        });
    }
    componentWillUnmount(){
        sessionManager.removeListener("change",this.setNewState);
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