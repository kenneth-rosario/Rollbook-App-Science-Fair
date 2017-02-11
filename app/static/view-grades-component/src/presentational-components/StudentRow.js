/**
 * Created by uncha_000 on 12/26/2016.
 */
import React, {Component} from 'react'
import IndividualGrade from './individual-cell'
import {hashHistory} from 'react-router'
export default class StudentRow extends Component{
    constructor(props){
        super(props);
    }
    emptyColumn(){
        let jsx = [];
        for(let i = 0; i<this.props.emptyColumns; i++ ){
            jsx.push(<input type="number" className="input-sm" placeholder="New Grade"/>)
        }
        return jsx
    }
    redirectToProfile(){
        hashHistory.push("/student-profile/"+this.props.id)
    }
    organizeFields(studentObject){
        let header = this.props.header;
        console.log(header);
        console.log(studentObject);
        let newO = [];
        if(studentObject.length > 0 && header.length > 0 ) {

            for (let i in header) {
                let toAppend = {};
                for (let j in studentObject) {
                    if (studentObject[j].test === header[i]){
                       toAppend["test"] = header[i];
                       toAppend["grade"] = studentObject[j].grade
                    }
                }
                console.log(newO);
                newO.push(toAppend)
            }
        }
        return newO
    }
    render(){
        let grades = this.props.student.grades;
        let student = this.props.student;
        let organize = this.organizeFields(grades);
        let emptyColumns = this.emptyColumn();
        return(
            <tr className="student-row">
                <td onClick={()=>{
                    this.redirectToProfile()
                }}>{student.name}</td>
                <td onClick={()=>{
                    this.redirectToProfile()
                }}>{student.email}</td>
                {
                    organize.map((element, key)=>{
                        return(
                            <td key ={5830192374+key}
                                className={
                                    parseInt(element.grade) < 70?"danger":
                                        parseInt(element.grade) < 80&&"warning"
                                }
                            ><IndividualGrade id={this.props.id}
                                                                       key={43718237384272384+key}
                                                                       grade={element.grade}
                                                                       name={element.test}
                            /></td>
                        )
                    })
                }
                {
                    emptyColumns.map((element,key)=>{
                        console.log(element);
                        return(
                                <td  key={9038918293+key}>
                                    <div>
                                    {element}
                                    </div>
                                </td>
                        )
                    })
                }
            </tr>
        )
    }
}