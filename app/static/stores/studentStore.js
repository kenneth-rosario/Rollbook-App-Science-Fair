/**
 * Created by uncha_000 on 12/21/2016.
 */
import {EventEmitter} from "events";
import 'whatwg-fetch'
import dispatcher from '../Dispatchers/dispatcher'
import sessionManager from './sessionStore'
class StudentManager extends EventEmitter {
    constructor() {
        super();
    }

    createStudent(name,email,group,multipleGroups=false){
        console.log(name+" "+email+" "+group+" "+multipleGroups);
        const Json = {
            name:name,
            email:email,
            group:group,
            multipleGroups:multipleGroups,
            teacher_id:sessionManager.getCurrentUser().id
        };
        fetch('/create-new-student',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(Json)
        }).then((response)=>{
            return response.json()
        }).then((Json)=>{
            localStorage.setItem('jtk',JSON.stringify(Json));
            sessionManager.setUser(Json);
            console.log(Json);
        })
    }


    handleAction(action){
        switch(action.type){
            case "CREATE_NEW_STUDENT" :
                this.createStudent(action.name,action.email,action.toGroup,action.multipleGroups);
                console.log("finally");
                break;
        }
    }
}

const studentManager = new StudentManager;
dispatcher.register(studentManager.handleAction.bind(studentManager));
export default studentManager