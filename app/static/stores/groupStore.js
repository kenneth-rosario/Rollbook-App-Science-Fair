
import {EventEmitter} from "events";
import 'whatwg-fetch'
import dispatcher from '../Dispatchers/dispatcher'
import sessionManager from './sessionStore'
import studentManager from "./studentStore"
import {hashHistory} from 'react-router'
class GroupManager extends EventEmitter {
    constructor() {
        super();
        this.filteredOutput = sessionManager.getCurrentUser()!==null?sessionManager.getCurrentUser().groups:'';
        this.studentFilter = ""
    }

    createGroup(name, id){
        sessionManager.ShowLoadingPage();
        const data_to_send ={
            "name": name,
            "owner_id": id
        };
        fetch('/create-group',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data_to_send)
        }).then((response)=>{
            return response.json();
        }).then((Json)=>{
            if(Json.status == "SUCCESS") {
                console.log(Json);
                alert("You have succesfully created a new group");
                sessionManager.setUser(Json);
                localStorage.setItem('jtk', JSON.stringify(Json));
            }else{
                alert(Json.reason);
            }
        })
    }
    getStudentsWithDorF(group_id) {
        let groupToSearch = this.getGroupById(group_id);
        console.log(groupToSearch);
        let students = [];
        for (let i in groupToSearch.students) {
            if (studentManager.performanceFunction(
                    studentManager.getAvgGradeForStudentWithId(groupToSearch.students[i].id)) === "F" ||
                studentManager.performanceFunction(
                    studentManager.getAvgGradeForStudentWithId(groupToSearch.students[i].id)) === "D"
            ) {
                students.push(groupToSearch.students[i]);
            }

        }return students
    }
    importGroups(formData){
        let data = new FormData(formData);
        data.append("user_id", sessionManager.getCurrentUser().id);
        console.log(data);
        sessionManager.ShowLoadingPage();
        fetch('/upload-excel', {
            method:"POST",
            body:data
        }).then((response)=>{
            return response.json()
        }).then((Json)=>{
            if(Json.status === "FAILED"){
                sessionManager.HideLoadingPage();
                alert(Json.reason)
            }else if(Json.status==="SUCCESS") {
                sessionManager.setUser(Json);
                alert("Import Successful");
            }
        });

    }
    getAllDangerStudents(){
       let toReturn = [];
       let groups = this.getAll();
       for(let i in groups){
           console.log(i);
           let toPush = this.getStudentsWithDorF(groups[i].id);
           toReturn.push(toPush)
       }
       console.log([].concat.apply([],toReturn));
        console.log(toReturn);
        return [].concat.apply([],toReturn)
    }
    //divide a given array into an array with nested groups of three objects
    divideForPagination(arrayOfObjects){
        let newArray = [];
        //we will loop across the arrayOfObjects
        for(let i in arrayOfObjects){
            if(i===0||i%4===0){
                newArray.push([]);
            }
            newArray[i-(i-(newArray.length - 1))].push(arrayOfObjects[i]);
        }

	    return newArray
    }

    numOfAlphaCharGrades(id){
        let group = this.getGroupById(id);
        const students = group.students ;
        let numbersObject = {
            A:0,
            B:0,
            C:0,
            D:0,
            F:0
        };
        for(let i in students){
            let perf = studentManager.performanceFunction(studentManager.
                getAvgGradeForStudentWithId(students[i].id)
            );
            numbersObject[perf]++;
        }
        return numbersObject
    }

    getGroupStatistics(){
        let data = [["Performance","F","D","C","B","A",{"role":"annotation"}]];
        let groups = this.getAll();
        for(let i in groups){
            let toPush = [];
            toPush.push(groups[i].name);
            let perf = this.numOfAlphaCharGrades(groups[i].id);
            toPush.push(perf.F,perf.D,perf.C,perf.B,perf.A,"");
            data.push(toPush);
        }
        return data
    }

    getFilterOutput(){
        return this.filteredOutput
    }

    isDangerGroup(group){
        let alphaGrades = this.numOfAlphaCharGrades(group.id);
        let cDorf = alphaGrades.F+alphaGrades.D+alphaGrades.C;
        let totalStudents = cDorf + alphaGrades.A +alphaGrades.B;
        console.log(cDorf);
        console.log(Math.round((cDorf/totalStudents)*100));
        return Math.round((cDorf/totalStudents)*100) > 50
    }

    filterStudentsFromGroupWithId(id,search){
        /*
            This function will be in charge of filtering through the students in
            a group by a certain search filter
         */
        let students = this.getGroupById(id).students;
        let toReturn = [];
        if(search===""){
            return students
        }else{
            let studentsInGroup = students;
            if (studentsInGroup){
                for (let i in studentsInGroup){
                    // We are checking whether the search string exists inside the index of the
                    // name of the student
                    if(studentsInGroup[i].name.toLowerCase().indexOf(search.toLowerCase()) > -1){
                        toReturn.push(studentsInGroup[i])
                    }
                }
            }else{
                return [];
            }
        }
        return toReturn
    }

    calculateDangerGroups(){
        let allGroups = this.getAll();
        let dangerGroup = [];
        for(let i in allGroups){
            if(this.isDangerGroup(allGroups[i])){
                dangerGroup.push(allGroups[i])
            }
        }
        return dangerGroup
    }

    filterGroups(current_filter){
        console.log("in filtergroups");
        console.log(current_filter);
        let groups = sessionManager.getCurrentUser().groups;
        let toReturn = [];
        for (let i in groups){
            if(groups[i].name.toLowerCase().indexOf(current_filter.toLowerCase())>-1){
                toReturn.push(groups[i]);
            }
        }
        console.log(toReturn);
        toReturn.length === 0?this.filteredOutput=[]:this.filteredOutput = toReturn;
        hashHistory.push('/groups/1');
        this.emit("change");
    }
    getAll(){
        //returns all groups from the current user
        return sessionManager.getCurrentUser().groups;
    }
    getGroupById(id){
        //TODO:Sort evey list in the app by id and then alphabetically to use binary search
        //this gets the group with the id provided from the current user
        //if the group does not exist it will notify you
        console.log(id);
        let currentUserGroups = undefined;
        try {
            currentUserGroups = sessionManager.getCurrentUser().groups;
        }catch(e){
            return null
        }
        console.log(currentUserGroups);
        console.log(currentUserGroups===undefined);
        if(currentUserGroups===undefined){
            return null;
        }
        //loop will change in the future to a binary search algorithm
        for(let i in currentUserGroups){
            if(currentUserGroups[i].id===id){
                console.log("comparing "+currentUserGroups[i].id+" with "+id);
                console.log(currentUserGroups[i]);
                return currentUserGroups[i]
            }
        }
    }
    deleteGroup(group_id, owner_id){
        const jsonInfo = {
            id:group_id,
            owner_id:owner_id
        };
        fetch('delete-group',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(jsonInfo)
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            if(data.status === "SUCCESS"){
                localStorage.setItem('jtk', JSON.stringify(data));
                sessionManager.setUser(data)
            }else{
                alert("apparently something went wrong in the server")
            }
        })
    }
    handleAction(action){
        switch(action.type){
            case "CREATE_GROUP":
                this.createGroup(action.name,action.owner_id);
                break;
            case "FILTER_GROUP":
                console.log("I am in handler");
                this.filterGroups(action.filter);
                break;
            case "DELETE_GROUP":
                this.deleteGroup(action.id,action.owner_id);
                break;
            case "IMPORT_GROUPS":
                this.importGroups(action.formData)
                break;
        }
    }
}

const groupManager = new GroupManager;
dispatcher.register(groupManager.handleAction.bind(groupManager));
export default groupManager