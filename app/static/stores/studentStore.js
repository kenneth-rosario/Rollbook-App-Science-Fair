/**
 * Created by uncha_000 on 12/21/2016.
 */
import {EventEmitter} from "events";
import 'whatwg-fetch'
import dispatcher from '../Dispatchers/dispatcher'
import sessionManager from './sessionStore'
import {hashHistory} from 'react-router'
class StudentManager extends EventEmitter {
    constructor() {
        super();
    }
    performanceFunction(avg){
        let performance;
        switch(true){
            case avg>=0 && avg<60:
                performance = "F";
                break;
            case avg >= 60 && avg <70:
                performance = "D";
                break;
            case  avg >= 70 && avg <80:
                performance = "C";
                break;
            case avg >= 80 && avg < 90:
                performance = "B";
                break;
            case avg >=90:
                performance = "A";
                break;
            default:
                performance = "No Grades Yet";
                break;
        }
        return performance
    }
    getTableDataFromStudentWithId(id){
        let grades;
        let data = [];
        try {
            grades = this.getStudentById(id).grades;
            for(let i in grades){
                let toPush = [grades[i].test, grades[i].grade];
                data.push(toPush)
            }
            return data
        }catch(e){
            console.log(e);
            return null
        }
    }
    getStudentById(id){
        let all = this.getAll();
        for(let i in all){
            if(all[i].id===parseInt(id)){
                return all[i]
            }
        }
        return null
    }
    emailParent(info_object){
        sessionManager.ShowLoadingPage();
        fetch('/send-performance-mail', {
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(info_object)
        }).then((response)=>{
            return response.text()
        }).then((jsonValue)=>{
            sessionManager.HideLoadingPage();
            alert(jsonValue)
        })

    }
    getAvgGradeForStudentWithId(id){
        let student = this.getStudentById(id);
        let grades;
        student?grades = student.grades:[];
        let avg = 0;
        if(student){
            for(let i in grades){
                avg+=grades[i].grade
            }
            grades.length>0
                ?avg = avg/grades.length:avg = 0
        }
        return avg
    }
    getAll(){
        const user = sessionManager.getCurrentUser();
        console.log("hey");
        let toReturn = [];
        let idsUsed = [];
        let counter = 0;
        let groups ;
        try{
            groups=user.groups
        }
        catch (e) {
            groups = null
        }
        if(groups!==null) {
            for (let i in groups) {
                for (let j in groups[i].students) {
                    if (counter === 0) {
                        toReturn.push(groups[i].students[j]);
                        idsUsed.push(groups[i].students[j].id);
                        counter++;
                        continue
                    }
                    if (idsUsed.indexOf(groups[i].students[j].id) < 0) {
                        toReturn.push(groups[i].students[j]);
                        idsUsed.push(groups[i].students[j].id);
                    }
                }

            }
        }
        console.log(toReturn);
        return toReturn
    }
    createStudent(name,email,group,fname=false,mname=false,pemail=false,ptel=false){
        console.log(fname);
        console.log(mname);
        const Json = {
            name:name,
            email:email,
            group:group,
            fname:fname,
            mname:mname,
            pemail:pemail,
            ptel:ptel,
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
            if(Json.status="SUCCESS") {
                alert("student was added to the selected group/s");
            }
            else{
                alert(Json.reason)
            }
            sessionManager.HideLoadingPage()
        }).catch((err)=>{
            alert("Some credentials already exist")
        })

    }
    deleteStudent(id){
        sessionManager.ShowLoadingPage();
        fetch('/delete-student',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id
            })
        }).then((response)=>{
            return response.json()
        }).then((parsed)=>{
            sessionManager.HideLoadingPage();
            localStorage.setItem("jtk",JSON.stringify(parsed));
            sessionManager.setUser(parsed);
            hashHistory.push('/');
            alert("Successful Request")
        })
    }
    addAssistance(info_object){
        sessionManager.ShowLoadingPage();

        fetch('/add-assistance',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(info_object)
        }).then((response)=>{
            return response.json()
        }).then((parsed)=>{
            localStorage.setItem("jtk", JSON.stringify(parsed));
            sessionManager.setUser(parsed);
            alert("Succesful Request");
            hashHistory.push('/')
        }).catch(()=>{
            alert("Error Connecting to Server")
        });
        sessionManager.HideLoadingPage()
    }
    deleteAssistance(object){
        console.log(object);
        fetch('/delete-assistance',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(object)
        }).then((response)=>{
            return response.json()
        }).then((info)=>{
            localStorage.setItem('jtk', JSON.stringify(info));
            sessionManager.setUser(info);
            alert("Deletion Succesful");
        }).catch((err)=>{
            console.log(err);
            alert("Server Error")
        })
    }
    handleAction(action){
        switch(action.type){
            case "CREATE_NEW_STUDENT" :
                this.createStudent(action.name,action.email,action.toGroup,action.father,action.mother,action.Pemail,action.telephone);
                console.log("finally");
                break;
            case "EMAIL_PERFORMANCE":
                this.emailParent(action.info_object);
                break;
            case "DELETE_STUDENT":
                this.deleteStudent(action.id);
                break;
            case "ASSISTANCE":
                this.addAssistance(action.object);
                break;
            case "DELETE_ASSISTANCE":
                this.deleteAssistance(action.object);
                break;
        }
    }
}

const studentManager = new StudentManager;
dispatcher.register(studentManager.handleAction.bind(studentManager));
export default studentManager