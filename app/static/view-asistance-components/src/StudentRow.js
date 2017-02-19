/**
 * Created by uncha_000 on 2/11/2017.
 */
import React,{Component} from 'react'

export default class StudentRow extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <tr>
                <td>{this.props.object.id}</td>
                <td>{this.props.object.name}</td>
                <td>{this.props.object.email}</td>
                <td><input type="checkbox"/></td>
            </tr>
        )
    }
}