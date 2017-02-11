/**
 * Created by uncha_000 on 12/27/2016.
 */
import {EventEmitter} from "events";
import 'whatwg-fetch'
import dispatcher from '../Dispatchers/dispatcher'
import sessionManager from './sessionStore'
import groupManager from './groupStore'
class GradeManager extends EventEmitter {

    constructor() {
        super();
    }

    getIn(){
        console.log("I am in")
    }

    checkIfGradeExists(name, group_id){
        let group = groupManager.getGroupById(group_id);
        let students = group.students
    }


    createGrade(arrayOfObjects){
        console.log(arrayOfObjects);
        fetch("/create-grade", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(arrayOfObjects)
        }).then((response)=>{
            return response.json()
        }).then((Json)=>{
            sessionManager.setUser(Json);
            console.log(Json);
        })
    }

    removeGrade(group_id, name){
        console.log(group_id);
        console.log(name);
        const Info = {
            group_id:group_id,
            name:name
        };
        fetch("/remove-grade",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(Info)
        }).then((response)=>{
            return response.json()
        }).then((Json)=>{
            if(Json.status === "SUCCESS"){
                sessionManager.setUser(Json)
            }else{
                alert(Json.reason)
            }
        })
    }

    getGradesFromGroupWithId(id){
        try {
            let group = groupManager.getGroupById(id);
            let grades = group.students[0].grades;
            if (grades.length > 0) {
                return grades
            } else {
                return null
            }
        }
        catch(e){
            return null
        }
    }

    handler(action){
        switch(action.type){
            case "CREATE_GRADE":
                this.createGrade(action.arrayOfObjects);
                break;
            case "REMOVE_GRADE":
                this.removeGrade(action.group_id, action.name);
                break;
        }
    }

}

const gradeManager = new GradeManager;
dispatcher.register(gradeManager.handler.bind(gradeManager));
export default gradeManager