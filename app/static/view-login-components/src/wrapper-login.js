/**
 * Created by uncha_000 on 12/14/2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import Navigation from './presentational-components/navigation'
import SessionManager from '../../stores/sessionStore'
export default class ViewLogin extends Component {

    constructor(props,context){
        super(props,context);
        this.state={
            current_user:SessionManager.getCurrentUser()
        }
    }

    componentWillMount(){
        console.log('component is mounting');
        SessionManager.on("change", ()=>{
            this.setState({
                current_user:SessionManager.getCurrentUser()
            })
        })
    }

    componentDidMount(){
        console.log('component mounted')
    }

    render(){
        return(
         <div>
         < Navigation current_user = {this.state.current_user} />
         <div className="container">
             {this.props.children}
         </div>
         </div>
        );
    }

}