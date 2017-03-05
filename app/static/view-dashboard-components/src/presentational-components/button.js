/**
 * Created by uncha_000 on 12/17/2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'

export default class MyButton extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Link onClick={this.props.onClick} to = {this.props.href}>
                <div className="bbtn">
                    <h5><span className={this.props.className} /> {this.props.title} </h5>

                </div>
            </Link>
        )
    }
}
