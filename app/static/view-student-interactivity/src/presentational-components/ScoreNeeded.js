/**
 * Created by uncha_000 on 1/3/2017.
 */
import React, {Component} from 'react'
import studentManager from '../../../stores/studentStore'
export default class ScoreNeeded extends Component{
    constructor(props){
        super(props);
        this.state = {
            avg:studentManager.getAvgGradeForStudentWithId(this.props.id)
        }
    }
    calculateNextGrade() {
        const avg = this.state.avg;
        let nextGrade = 0;
        if (avg < 60) {
            nextGrade = 60
        } else if (avg >= 90) {
            nextGrade = 180 - avg;
            let theString;
            theString = "you need at least " + Math.round(nextGrade*10)/10 + " to maintain an A";
            return theString
        }
        else if (avg < 90) {
            let counter = 0;
            while (true){
                if(counter === 0) {
                    nextGrade = avg + 1;
                    counter++;
                }
                if (parseInt(nextGrade) % 10 === 0) {
                    break;
                }
                console.log(nextGrade);
                nextGrade++;
            }
        }
        return 2*nextGrade - avg
    }
    render(){
        const nextGrade = this.calculateNextGrade();
        let toGet = studentManager.performanceFunction(nextGrade);
        return(
            <div className = "col-xs-12">
                <br />
                <h4 className="text-center">{
                    typeof nextGrade === "string"?
                        nextGrade:"You need to get at least "+
                        nextGrade + " to get a "+toGet
                }</h4>
            </div>
        )
    }
}