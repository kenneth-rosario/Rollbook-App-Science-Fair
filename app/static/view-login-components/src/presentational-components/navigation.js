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
        this.state ={
            isLoggedIn:sessionManager.isLogedIn()
        }
    }
    componentWillMount(){
        sessionManager.on("change", ()=>{
            this.setState({isLoggedIn:sessionManager.isLogedIn()})
        })
    }
   render() {
        console.log(sessionManager.isLogedIn())
      return(
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Roll Book App</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="/login/lala">Costumer Support</NavItem>
                    <NavItem eventKey={2} ><Link to="register">Find Teacher</Link></NavItem>
                    <NavDropdown eventKey={3} title="" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
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