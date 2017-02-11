/**
 * Created by uncha_000 on 1/7/2017.
 */
import React, {Component} from 'react'

export default class DeskComp extends Component{
    constructor(props){
        super(props);
    }
    render(){

        return(
            <div className={this.props.className}
                style={{
                    height:window.innerHeight-40
                }}
            >
                {this.props.children}
            </div>
        )
    }
}