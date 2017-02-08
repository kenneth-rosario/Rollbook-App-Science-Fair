/**
 * Created by uncha_000 on 12/17/2016.
 */
import React, {Component} from 'react'
import MyButton from './button'
import Dialog from './Dialog'
import sessionManager from '../../../stores/sessionStore'
import studentManager from '../../../stores/studentStore'
import groupManager from '../../../stores/groupStore'
export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            currentUser: sessionManager.getCurrentUser(),
            selectedButton:"",
            title : ""
        }
    }
    open(action){
        let title;
        if (action==="CREATE_NEW_GROUP"){title = "Create New Group"}
        else{title = "Create New Student"}
        this.setState({
            showModal:true,
            selectedButton:action,
            title:title,
        })
    }close(){
        this.setState({
            showModal:false,
            selectedButton:"",
            title:""
        })
    }
    componentWillMount(){
        sessionManager.on("change", ()=>{
            console.log('checking');
            this.setState({
                currentUser: sessionManager.getCurrentUser()
            })
        })
    }
    render() {
        const buttons = [
            {
                title:"Create a New Group",
                href:"",
                onClick:()=>{
                   this.open("CREATE_NEW_GROUP");
                }
            },
            {
                title:"Add Students to your Database",
                href:"",
                onClick:()=>{
                    console.log("clicked");
                    this.open("CREATE_NEW_STUDENT");
                }
            },
            {
                title: "Your Information",
                href: "/index/view-info",
                onClick: () => {
                    console.log("clear for now")
                }
            },
            {
                title:"Group Statistics",
                href:"/group-statistics/:user_id",
                onClick: ()=>{
                    console.log("clear for now")
                }
            }
        ];
        return (
            <div className="row">
                <div className="col-sm-4 different-color">
                    {/*all actions*/}
                    {buttons.map((button, key)=>{
                        return( <MyButton
                          key={key} href={button.href} title={button.title}
                          onClick={()=>{button.onClick()}}
                        />);
                    })}
                    <Dialog title={this.state.title} show={this.state.showModal} selected={this.state.selectedButton} onHide={()=>{this.close()}}/>
                </div>
                <div className="col-sm-8">
                    {/*All Groups and child routes**/}
                    {this.props.data}
                </div>
            </div>
        );
    }
}