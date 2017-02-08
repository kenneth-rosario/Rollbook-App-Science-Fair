
import {EventEmitter} from "events";
import 'whatwg-fetch'
import dispatcher from '../Dispatchers/dispatcher'
import sessionManager from './sessionStore'
import {hashHistory} from 'react-router'
class GroupManager extends EventEmitter {
    constructor() {
        super();
        this.filteredOutput = sessionManager.getCurrentUser()!==null?sessionManager.getCurrentUser().groups:'';
    }

    createGroup(name, id){
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
            console.log(Json);
            sessionManager.setUser(Json);
            localStorage.setItem('jtk',JSON.stringify(Json));
        })
    }

    //divide a given array into an array with nested groups of three objects
    divideForPagination(arrayOfObjects){
        let newArray = [];
        //we will loop across the arrayOfObjects
        for(let i in arrayOfObjects){
            if(i===0||i%3===0){
                newArray.push([]);
            }
            newArray[i-(i-(newArray.length - 1))].push(arrayOfObjects[i]);
        }

	    return newArray
    }

    getFilterOutput(){
        return this.filteredOutput
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
        const currentUserGroups = sessionManager.getCurrentUser().groups;
        console.log(currentUserGroups);
        console.log(currentUserGroups===undefined);
        if(currentUserGroups===undefined){
            return null;
        }
        //loop will change in the future to a binary search algorithm
        for(let i in currentUserGroups){
            if(currentUserGroups[i].id===id){
                console.log("comparing "+currentUserGroups[i].id+" with "+id);
                return currentUserGroups[i]
            }
        }
    }
    getCheckedItemsFrom(element){
        let Return = [];
        for(let i in element){
            console.log(element[i].children);
            if(element[i].children!==undefined) {
                if (element[i].children[0].checked) {
                    Return.push(element[i].children[0].value);
                }
            }
        }
        return Return
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
            case "CREATE_NEW_STUDENT":
                console.log("hello");
                break;
        }
    }
}

const groupManager = new GroupManager;
dispatcher.register(groupManager.handleAction.bind(groupManager));
export default groupManager