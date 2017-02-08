/**
 * Created by uncha_000 on 12/12/2016.
 */
import Search from "../presentational-components/search"
import React, {Component} from 'react'

export default class SearchContainer extends Component {
    constructor(props, context){
        super(props, context);
    }
    render(){
        return <Search />
    }
}