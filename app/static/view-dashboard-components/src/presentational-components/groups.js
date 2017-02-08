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
    updateValue(evt){
        this.setState({
            MyValue:evt.target.value
        });
        this.filter(evt.target.value);
    }
    componentWillMount(){
        groupManager.on("change", ()=>{
            console.log("I am inside listener");
            const filterOutput = groupManager.getFilterOutput();
            this.setState({
                groups: filterOutput,
                paginationArray:groupManager.divideForPagination(filterOutput)
            })
        });
        sessionManager.on("change", ()=>{
            console.log("updating");
            this.setState({
                groups: sessionManager.getCurrentUser().groups,
                paginationArray:groupManager.divideForPagination(
                sessionManager.getCurrentUser().groups
                ),
                MyValue:""
            })
        })
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
                Search:<input type="text"
                              onChange={(evt)=>{this.updateValue(evt)}}
                              value={this.state.MyValue} />
                {

                   toReturn.map((element,i)=>{
                       return <Group groupObject={element} key={i} />
                   })
                }
                <div>
                <MyPagination history={(a)=>{this.props.router.history.push(a)}} active={this.props.params.page} className="col-xs-offset-2 col-xs-10 pagination" toDo numberOfPages={pagAr.length} />
            </div>
            </div>
        )
    }
}