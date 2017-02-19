/**
 * Created by uncha_000 on 12/15/2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import sessionManager from '../../../stores/sessionStore'
import * as Actions from '../../../actions/rollActions'
export default class Navigation extends Component{
    constructor(props){
        super(props);
        this.navListen = this.navListen.bind(this);
        this.state ={
            isLoggedIn:sessionManager.isLogedIn()
        }
    }
    navListen(){
         this.setState({isLoggedIn:sessionManager.isLogedIn()})
    }
    componentWillMount(){
        sessionManager.on("change", this.navListen)
    }
    componentWillUnmount(){
        sessionManager.removeListener("change", this.navListen)
    }
   render() {
        console.log(sessionManager.isLogedIn());
      return(
          <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Roll Book App</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={4} href="#">{this.props.current_user===null
                        ?"Not Signed In":this.props.current_user.fullname}</NavItem>
                    {sessionManager.isLogedIn()?<NavItem onClick={()=>{Actions.LogOut()}} eventKey={5} href="#">Log Out</NavItem>:""}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      );
   }
}