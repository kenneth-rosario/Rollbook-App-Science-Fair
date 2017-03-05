'use strict';
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ViewLogin from './view-login-components/src/wrapper-login'
import { Router, Route, IndexRoute, hashHistory, IndexRedirect, Redirect } from "react-router";
import RegisterContainer from './view-login-components/src/container-components/register-container.js'
import LoginContainer from './view-login-components/src/container-components/login-container'
import sessionManager from './stores/sessionStore'
import DashBoard from './view-dashboard-components/src/presentational-components/Dashboard'
import ViewInfo from './view-dashboard-components/src/presentational-components/view-info'
import Groups from './view-dashboard-components/src/presentational-components/groups'
import ViewGroup from "./view-dashboard-components/src/presentational-components/ViewGroup"
import GradesContainer from './view-grades-component/src/container-components/GradesContainer'
import StudentProfile from './view-student-interactivity/src/presentational-components/Profile'
import MainView from './view-statistics-interactivity/src/presentational-components/MainVIew'
import Assistance from './view-asistance-components/src/MainView'
import ImportGroups from './view-dashboard-components/src/presentational-components/Import-groups/ImportGroups'
import AllDangerStudents from './view-student-interactivity/src/presentational-components/AllDangerStudents'

class DashOrLog extends Component{
    constructor(){
        super();
        this.DashOrLogLis = this.DashOrLogLis.bind(this);
        this.state = {
            isLoggedIn:sessionManager.isLogedIn()
        };
    }
    DashOrLogLis(){
        this.setState({
                isLoggedIn:sessionManager.isLogedIn()
        });
    }
    componentWillMount(){
        sessionManager.on("change",this.DashOrLogLis);
    }
    componentWillUnmount(){
        sessionManager.removeListener("change", this.DashOrLogLis)
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
                    <Route path="/student-profile/:id" component={StudentProfile}/>
                    <Route path="/group-statistics" component={MainView}/>
                    <Route path="/take-assistance/:id" component={Assistance} />
                    <Route path="/import-group" component ={ImportGroups} />
                    <Route path="/view-danger-students" component={AllDangerStudents} />
                </Route>
                <Route path="register" component={RegisterContainer} />
                <Route path="groups/:id/grades" component={GradesContainer} >
                    {
                        sessionManager.isLogedIn()?"":<Redirect to="/index" />
                    }
                </Route>

                {/*<Route path="/add-grade/to-group/:id" component={}/>*/}
            </Route>
        </Router>
        )
    }
}


ReactDOM.render(<Routing />,
    document.getElementById('app'));


