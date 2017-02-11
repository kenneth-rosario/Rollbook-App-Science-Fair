/**
 * Created by uncha_000 on 12/23/2016.
 */
import React, {Component} from 'react'

export default class InfoPart extends Component{
    constructor(props){
        super(props);
    }
    render(){

        return(
            <div className={this.props.className}>
                <label>{this.props.label}</label>
                <input id={this.props.field} value={this.props.value} onChange={(event)=>
                {this.props.onChange(event,this.props.field)}} type={this.props.type} className="form-control"/>
            </div>
        )

    }
}