/**
 * Created by uncha_000 on 3/4/2017.
 */
import React, {Component} from 'react'
import groupManager from '../../../stores/groupStore'
import Accordion from '../../../node_modules/react-bootstrap/lib/Accordion'
import Panel from '../../../node_modules/react-bootstrap/lib/Panel'
import {Link} from 'react-router'
export default class AllDangerStudents extends Component{
    constructor(props) {
        super(props);
        this.state = {
            groups: groupManager.getAll(),
        }
    }
    returnStyle(key){
        if(key%3 === 0) {
            return "danger"
        }
        else if(key%2 === 0){
            return "primary"
        }else{
            return "success"
        }
    }
    render(){
        return(
            <div className="col-xs-12">
                <blockquote>
                    <h3>Students with D or F by Group</h3>
                </blockquote>
                <Accordion>
                {
                    this.state.groups.map((element, key)=>{
                        return(

                                <Panel bsStyle={this.returnStyle(key)} header = {element.name}
                                       eventKey = {""+key}
                                       key={key}>
                                    {
                                        groupManager.getStudentsWithDorF(
                                            element.id
                                        ).map((element_two,key_two)=>{
                                            return (<p><Link to={"/student-profile/"+element_two.id}>
                                                {element_two.name}
                                            </Link></p>)
                                        })
                                    }
                                </Panel>

                        )
                    })
                }
                </Accordion>
            </div>
        )
    }
}