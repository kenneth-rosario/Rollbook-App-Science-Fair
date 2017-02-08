/**
 * Created by uncha_000 on 12/19/2016.
 */
import React, {Component} from 'react'
import {Pagination} from 'react-bootstrap'
import { hashHistory } from 'react-router'
export default class MyPagination extends Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            activePage:parseInt(this.props.active)
        }
    }
    handleSelect(eventKey){
        console.log(this.props);
        hashHistory.push("/groups/"+eventKey);
        this.setState({
            activePage:eventKey
        })
    }
    render(){
        return(
            <div className={this.props.className}>
        <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={this.props.numberOfPages}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handleSelect.bind(this)} />

            </div>

        );
    }

}
