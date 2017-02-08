/**
 * Created by uncha_000 on 12/18/2016.
 */
import React,{Component} from 'react'
import sessionManager from '../../../stores/sessionStore'
import InfoPart from './infoparts'
import * as Actions from '../../../actions/rollActions'
export default class ViewInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: sessionManager.getCurrentUser()
        }
    }
    componentWillMount(){
       sessionManager.on("change", ()=>{
           this.setState({
               user: sessionManager.getCurrentUser()
           })
       })
    }
    render(){
        return(
            <div className="row info-window">
                <h2 className="col-xs-12">Your Information</h2>
                <hr />
                <InfoPart title="Full Name" attribute={this.state.user.fullname}/>
                <InfoPart title="Id" attribute={this.state.user.id}/>
                <InfoPart title="Email" attribute={this.state.user.email}/>
                <InfoPart title="School" attribute={this.state.user.school}/>
            </div>
        )
    }

}