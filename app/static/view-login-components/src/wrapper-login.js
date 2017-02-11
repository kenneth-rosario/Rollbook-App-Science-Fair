/**
 * Created by uncha_000 on 12/14/2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import Navigation from './presentational-components/navigation'
import SessionManager from '../../stores/sessionStore'
import LoadDisplay from './container-components/LoadDisplay'
export default class ViewLogin extends Component {

    constructor(props,context){
        super(props,context);
        this.LoginListener = this.LoginListener.bind(this);
        this.state={
            current_user:SessionManager.getCurrentUser(),
            LoadDisplay:SessionManager.ReturnLogToggle()
        }
    }
    LoginListener(){
        this.setState({
                current_user:SessionManager.getCurrentUser(),
                LoadDisplay:SessionManager.ReturnLogToggle()
            })
    }
    componentWillMount(){
        console.log('component is mounting');
        SessionManager.on("change", this.LoginListener)
    }

    componentDidMount(){
        console.log(this.state.LoadDisplay);
        console.log('component mounted')
    }
    componentWillUnmount(){
        SessionManager.removeListener("change", this.LoginListener)
    }
    render(){
        return(
         <div className="the-container" >
             {(this.state.LoadDisplay)&&<LoadDisplay className="cover" />}
             <div >
             < Navigation current_user = {this.state.current_user} />
                 <div className="container-fluid">
                 {this.props.children}
                 </div>
             </div>
         </div>
        );
    }

}