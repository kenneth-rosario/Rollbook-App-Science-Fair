/**
 * Created by uncha_000 on 1/13/2017.
 */
import React, {Component} from 'react'
import Calculator from './ES5-practice-calc/Calculator'
export default class CalcWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCalc:false
        }
    }
    toogleCalc(){
        this.setState({
            showCalc:!this.state.showCalc
        })
    }
    render(){
        return(
            <div className="row" style={{position:"absolute",zIndex:3, left:"50%"}}>
                <div id="cal-wrap" className={this.state.showCalc?
                    "col-xs-6 showCalc":"col-xs-6 hideCalc"
                }>
                    <Calculator/>
                </div>
                <div className={!this.state.showCalc?
                    "col-xs-2 extra-space-top"
                        :"col-xs-2"}
                     id="calc-trigger" onClick={()=>{
                    this.toogleCalc()
                }}>
                    {
                        !this.state.showCalc?
                        <span
                            className={" glyphicon glyphicon-chevron-down"}
                        />:
                        <span
                            className="	glyphicon glyphicon-chevron-up "
                        />
                    }
                </div>
            </div>
        )
    }
}