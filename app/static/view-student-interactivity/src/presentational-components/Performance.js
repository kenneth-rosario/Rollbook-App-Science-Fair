/**
 * Created by uncha_000 on 1/2/2017.
 */
import React, {Component} from 'react'
import studentManager from '../../../stores/studentStore'
export default class Performance extends Component{
    constructor(props){
        super(props);
        this.state = {
            avg : studentManager.getAvgGradeForStudentWithId(this.props.id)
        }
    }
    calculatePerformance(){
        return  studentManager.performanceFunction(this.state.avg);
    }
    render(){
        const performance = this.calculatePerformance();
        return(
            <div className="col-xs-12" style={
                {fontFamily:"'Roboto Condensed', sans-serif"}
            }>
                <div className="row">
                    <div className="col-sm-offset-2 col-sm-2 col-xs-8 col-xs-offset-2">
                        <h3>Performance:</h3>
                    </div>
                </div>
                <div className="row">
                    <h1 className="text-center">
                        {performance}({Math.round(this.state.avg * 10) / 10})
                    </h1>
                </div>
            </div>
        )
    }
}