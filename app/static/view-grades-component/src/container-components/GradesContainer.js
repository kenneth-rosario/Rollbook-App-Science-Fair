/**
 * Created by uncha_000 on 12/26/2016.
 */
import React, {Component} from 'react'
import {hashHistory, Redirect} from 'react-router'
import sessionManager from '../../../stores/sessionStore'
import Grades from '../presentational-components/Grades'
import gradeManager from '../../../stores/gradeStore'
import * as Actions from '../../../actions/rollActions'
export default class GradesContainer extends Component {
    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            logged_in : sessionManager.isLogedIn()
        }
    }
    handler(){
        this.setState({
                logged_in: sessionManager.isLogedIn()
             })
    }
    componentWillMount(){
        console.log(this.props.params.id);
         sessionManager.on("change", this.handler);
         if(!this.state.logged_in){
             this.redirect()
         }
    }

    //TODO:Continue with table parsing algorithm
    ajaxCall(){
        gradeManager.getIn();
        let firstRow = document.getElementById('head').children[0].children;
        let name_input_values = [];
        let rows = document.getElementById('grade-table').
        getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        let gradeObjects = [];
        for(let i = 0 ; i<firstRow.length; i++){
            try {
                console.log("I am inside the firstrow try");
                try {
                    console.log(firstRow[i].children[0].children[0]);
                }
                catch(e){
                    console.log(e);
                }
                if (firstRow[i].children[0].children[0].value.length === 0) {
                    alert("You left blank inputs");
                    return null
                }
                name_input_values.push(firstRow[i].children[0].children[0].value);
            }
            catch(e){
                name_input_values.push(firstRow[i].innerHTML);
                console.log(name_input_values);
            }
            console.log(name_input_values)
        }
        console.log(name_input_values);
        let tdAr = []; let toAppend = {};
        for(let i = 0; i < rows.length; i++) {
            toAppend = {};
            console.log(rows[i].children);
            console.log(gradeObjects);
            tdAr = rows[i].children;
            for(let j=0; j< tdAr.length; j++){
                console.log("I am inside the loop");
                console.log(tdAr[j]);
                try {
                    console.log("I am inside the try");
                    let tagName = tdAr[j].children[0].children[0].tagName;
                    if(tagName !== "INPUT"){
                        throw new DOMException("the DOM element is not an input")
                    }
                    let input = tdAr[j].children[0].children[0].value;
                    console.log(input);
                    if(isNaN(parseFloat(input))){
                        alert("cell in row: "+ (i+1) +" column: "+ (j+1) +" Is not a decimal" +
                            " nor an integer");
                        return null
                    }
                    if(input.length === 0){
                        alert("you left a blank input");
                        return null
                    }
                    console.log(name_input_values);
                    console.log(j);
                    toAppend[name_input_values[j]] = {type:"input" ,
                        grade:tdAr[j].children[0].children[0].value
                    };
                    console.log(toAppend);
                }catch(e){
                    console.log(e);
                    let toAdd = [];
                    (j === 0 || j===1)?toAdd = tdAr[j].innerHTML:toAdd = tdAr[j].children[0].children[0].innerHTML;
                    console.log();
                    toAppend[name_input_values[j]] = toAdd;
                }
                console.log(toAppend);

            }
            gradeObjects.push(toAppend);
        }
        gradeObjects.push(parseInt(this.props.params.id));
        console.log(gradeObjects);
        Actions.createGrade(gradeObjects);
    }
    redirect(){
        hashHistory.push("/")
    }
    componentWillUnmount(){
        sessionManager.removeListener("change",this.handler)
    }
    render(){
        console.log(this.props);
        console.log("the param is:" + this.props.params.id);
        return(
            <div>
                {
                    (this.state.logged_in)?
                    <Grades id={this.props.params.id} ajaxCall={()=>{this.ajaxCall()} }/>
                        :this.redirect()
                }
            </div>
        )
    }
}