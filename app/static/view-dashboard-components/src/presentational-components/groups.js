/**
 * Created by uncha_000 on 12/19/2016.
 */
import React, {Component} from 'react'
import Group from "./individual-group"
import sessionManager from "../../../stores/sessionStore"
import groupManager from "../../../stores/groupStore"
import MyPagination from "./pagination"
import * as Actions from '../../../actions/rollActions'
export default class Groups extends Component {
    constructor(props){
        super(props);
        this.groupmangeListen = this.groupmangeListen.bind(this);
        this.sessionListen = this.sessionListen.bind(this);
        this.state ={
          groups: sessionManager.getCurrentUser().groups,
          paginationArray:groupManager.divideForPagination(
              sessionManager.getCurrentUser().groups
          ),
          MyValue:""
        };
        //this component will get passed the current user via props
    }filter(filter){
        Actions.filter(filter);
    }
    groupmangeListen(){
         console.log("I am inside listener");
            const filterOutput = groupManager.getFilterOutput();
            this.setState({
                groups: filterOutput,
                paginationArray:groupManager.divideForPagination(filterOutput)
            })
    }
    sessionListen(){
        console.log("updating");
             let groups;
            try{
                groups = sessionManager.getCurrentUser().groups
            }
            catch(e){
                groups = null
            }
            this.setState({
                groups:groups,
                paginationArray:groupManager.divideForPagination(
                groups
                ),
                MyValue:""
            })
    }
    updateValue(evt){
        this.setState({
            MyValue:evt.target.value
        });
        this.filter(evt.target.value);
    }
    componentWillMount(){
        groupManager.on("change", this.groupmangeListen);
        sessionManager.on("change", this.sessionListen);
    }
    componentWillUnmount(){
        groupManager.removeListener("change", this.groupmangeListen);
        sessionManager.removeListener("change", this.sessionListen);
    }
    render(){
        const pagAr = this.state.paginationArray;
        const groups = this.state.groups;
        let toReturn = [];
        toReturn = groups.length === 0 ? [] : pagAr[parseInt(this.props.params.page) - 1];
        if(toReturn === undefined){
            alert("the page is out of the boundary links;" +
                " click an existing button.");
            toReturn = []}
        return (
            <div>

                <div className="col-xs-offset-1 col-xs-10 form-group">
                    <label htmlFor="search">Search:</label>
                    <input className="form-control" id="search" placeholder="Search your groups" type="text"
                                  onChange={(evt)=>{this.updateValue(evt)}}
                                  value={this.state.MyValue} />
                </div>
                <div className="col-xs-offset-1 col-xs-10">
                {
                   toReturn.map((element,i)=>{
                       return <Group groupObject={element} key={i} keytwo={i}/>
                   })
                }
                </div>
                <div>
                <MyPagination history={(a)=>{this.props.router.history.push(a)}} active={this.props.params.page} className="col-xs-offset-4 pagination" toDo numberOfPages={pagAr.length} />
            </div>
            </div>
        )
    }
}