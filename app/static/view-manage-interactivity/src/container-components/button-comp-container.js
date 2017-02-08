/**
 * Created by uncha_000 on 12/12/2016.
 */
import BtnComponent from '../presentational-components/button-comp.js'
import React, {Component} from 'react'

export default class BtnContainer extends Component {
    constructor(props, context){
        super(props, context)
    }

    render(){
        return <BtnComponent />
    }
}