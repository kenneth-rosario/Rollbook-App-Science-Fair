'use strict';
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ViewManage from './view-manage-interactivity/src/wrapper-manage.js'
import ViewLogin from './view-login-components/src/wrapper-login'
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from "react-router";
import RegisterContainer from './view-login-components/src/container-components/register-container.js'
import LoginContainer from './view-login-components/src/container-components/login-container'
import sessionManager from './stores/sessionStore'
import DashBoard from './view-dashboard-components/src/presentational-components/Dashboard'
//use react-route here to divide them in routes'
import ViewInfo from './view-dashboard-components/src/presentational-components/view-info'
import Groups from './view-dashboard-components/src/presentational-components/groups'
import ViewGroup from "./view-dashboard-components/src/presentational-components/ViewGroup"
class DashOrLog extends Component{
    constructor(){
        super();
        this.state = {
            isLoggedIn:sessionManager.isLogedIn()
        };
    }
    componentWillMount(){
        sessionManager.on("change",()=>{
            this.setState({
                isLoggedIn:sessionManager.isLogedIn()
            });
        });
    }
    render(){
        return(
            <div>
                {
                    this.state.isLoggedIn?<DashBoard data = {this.props.children} />:<LoginContainer />
                }
            </div>
        )
    }
}

class Routing extends Component {
    constructor(){
        super();
    }
    componentWillMount(){

    }
    render() {
        return(
        <Router history={hashHistory}>
            <Route path="/" component={ViewLogin}>
                <IndexRedirect to="/index"/>
                <Route history={hashHistory} component={DashOrLog} path="index">
                    <IndexRedirect to="/groups/1"/>
                    <Route history={hashHistory} path="/groups/:page" components={Groups} />
                    {/*<Route path="/view-group-info/:id" component={ViewGroup}/>*/}
                    <Route path="view-info" component={ViewInfo}/>
                    <Route path="/view-group-info/:id" component={ViewGroup} />
                </Route>
                <Route path="register" component={RegisterContainer}>
                </Route>
            </Route>
        </Router>
        )
    }
}


ReactDOM.render(<Routing />,
    document.getElementById('app'));


