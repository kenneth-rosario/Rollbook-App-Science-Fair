/**
 * Created by uncha_000 on 12/23/2016.
 */
import React, {Component} from 'react'

export default class LoadDisplay extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        console.log("mounting")
    }
    render(){
        return(
            <div className="cover">

            </div>
        );
    }

}
