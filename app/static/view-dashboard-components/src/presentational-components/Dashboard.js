/**
 * Created by uncha_000 on 12/17/2016.
 */
import React, {Component} from 'react'
import MyButton from './button'
import Dialog from './Dialog'
import sessionManager from '../../../stores/sessionStore'
import ResizeWrapper from './button_wrappers/resize-wrapper'
import groupManager from '../../../stores/groupStore'
import {Link} from 'react-router'
export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.DashListen = this.DashListen.bind(this);
        this.state = {
            showModal:false,
            currentUser: sessionManager.getCurrentUser(),
            selectedButton:"",
            title : "",
            dangerStudent:groupManager.getAllDangerStudents()
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
    DashListen(){
         console.log('checking');
            this.setState({
                currentUser: sessionManager.getCurrentUser(),
                dangerStudent:groupManager.getAllDangerStudents()
            })
    }
    componentWillMount(){
        sessionManager.on("change", this.DashListen)
    }
    componentWillUnmount(){
        sessionManager.removeListener("change", this.DashListen)
    }
    render() {
        const buttons = [
            {
                title:"Create Group",
                href:"",
                onClick:()=>{
                   this.open("CREATE_NEW_GROUP");
                }
            },
            {
                title:"Import Group",
                href:"/import-group",
                onClick: ()=>{
                    console.log("nothing");
                }
            },
            {
                title:"Add Student",
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
                href:"/group-statistics",
                onClick: ()=>{
                    console.log("clear for now")
                }
            },

        ];
        let dangerStudents = this.state.dangerStudent?this.state.dangerStudent:[];
        return (
            <div className="row" >
                                    {/*all actions*/}
                    <ResizeWrapper classNames = {
                        {
                            desktop:"col-sm-2 different-color"
                        }
                    }>
                        {buttons.map((button, key)=>{
                            return( <MyButton
                              key={key} href={button.href} title={button.title}
                              onClick={()=>{button.onClick()}}
                            />);
                        })}
                    </ResizeWrapper>
                    <Dialog title={this.state.title} show={this.state.showModal} selected={this.state.selectedButton} onHide={()=>{this.close()}}/>

                <div className="col-sm-8" >
                    {/*All Groups and child routes**/}
                    {this.props.data}
                </div>
                <div className="col-sm-2">
                    <div className="panel panel-danger" id="removepanel">
                        <div className="panel-heading">Students with performance D or F</div>
                        <div className="panel-body">
                            <ul style={{marginLeft:-15}}>
                                {
                                    dangerStudents.map((element, key) => {
                                        return key < 6 &&
                                                    (<li><Link to={"/student-profile/" + element.id}
                                                >{element.name}<br /><b
                                                        style={{fontSize: 10}}>({groupManager.getGroupById(element.group_id).name})</b></Link></li>)
                                    })
                                }
                            </ul>
                                {
                                    dangerStudents.length > 5&&
                                        <Link to="/view-danger-students">View All</Link>
                                }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}