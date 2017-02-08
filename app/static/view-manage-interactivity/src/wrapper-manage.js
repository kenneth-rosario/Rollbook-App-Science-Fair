/**
 * Created by uncha_000 on 12/14/2016.
 */
import SearchContainer from './container-components/search-container.js'
import BtnContainer from './container-components/button-comp-container.js'
import Display from './presentational-components/display.js'
import React, {Component} from 'react'
export default class ViewManage extends Component {
    //setting initial state
    constructor(props){
        super(props);
        this.state = {
            student_objects:[
                {
                    name:"Kenneth Rosario",
                    group:12,
                    id:1,
                    email:"kenneth.rosario99@gmail.com",
                    registryNum:6
                },
                {
                    name:"Temp",
                    group:"12",
                    id:2,
                    registryNum:6
                }
            ],
            current_filter:'',
            manage_grades:false
        }
    }

    //rendering other component00p0s
    render() {
        return (
            <div className="container">
                <SearchContainer />
                <BtnContainer />
                <Display students={this.state.student_objects}/>
            </div>
         );
    }

}