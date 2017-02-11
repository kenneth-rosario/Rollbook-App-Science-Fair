/**
 * Created by uncha_000 on 1/10/2017.
 */
import React,{Component} from 'react'
import groupManager from '../../../stores/groupStore'
import {Link} from 'react-router'
export default class DangerGroups extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const dangerGroups = groupManager.calculateDangerGroups();
        return(
            <div className="col-xs-offset-1 col-xs-10">
                <h4>Groups you should pay attention to:</h4>
                {
                    dangerGroups.map((element,key)=>{
                        return(
                            <ul key={3102058690343+key} >
                                <li>
                                    <Link to={"/view-group-info/"+element.id}>
                                        {element.name}
                                    </Link>
                                </li>
                            </ul>
                        )
                    })
                }
            </div>
        )
    }
}