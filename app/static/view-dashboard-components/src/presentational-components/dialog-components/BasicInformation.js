/**
 * Created by uncha_000 on 12/23/2016.
 */
import React, {Component} from 'react'
import InfoPart from './Basic-Info-Simplified/Info-Part'

export default class BasicInformation extends Component{
    constructor(props){
        super(props);
        this.state = {
            "name":["",false,"Student's Name", "name", "text"],
            "email":["",false, "Student's Email", "email", "email"],
            "Father":["",false, "Legal Guardian's Name", "Father", "text"],
            "Pemail":["",false, "Where to contact parent via email", "Pemail", "email"],
            "Telephone":["",false, "Where to Call in Case of emergency", "Telephone", "tel"]
        }
    }

    onChange(evt, Id) {
        let input = evt.target.value;
        let isValid;
        if (input.length > 4) {
            if (Id === "email" || Id === "Pemail") {
                isValid = input.indexOf('@') >= 0;
            } else {
                isValid = true;
            }
        }else{
            isValid = false
        }
        let state = {};
        state[Id] = [input, isValid, this.state[Id][2], this.state[Id][3], this.state[Id][4]];
        this.setState(state);
    }
    objectToArray(){
        let toReturn = [];
        for(let i in this.state){
            let toAppend = {};
            toAppend["item"]=this.state[i];
            toReturn.push(toAppend);
        }
        console.log(toReturn);
        return toReturn;
    }

    render(){
        const state = this.objectToArray();
        return(
            <div>
                {
                    state.map((element,key)=>{
                        return(
                            <InfoPart key = {123423231 + key}
                                      label={element.item[2]}
                                      className={(element.item[1])?"form-group has-success":"form-group has-error"}
                                      onChange={(event,Id)=>{this.onChange(event,Id)}}
                                      value={element.item[0]} field={element.item[3]} type={element.item[4]}/>
                        );
                    })
                }
            </div>
        )
    }


}


