/**
 * Created by uncha_000 on 12/17/2016.
 */
import dispatcher from '../Dispatchers/dispatcher'
import sessionManager from '../stores/sessionStore'
export function Login (email, password){
    console.log(email);
    console.log(password);
    sessionManager.ShowLoadingPage();
    dispatcher.dispatch({
        type:'LOGIN',
        email: email,
        password: password
    })
}

export function LogOut(){
    dispatcher.dispatch({
        type:'LOGOUT'
    })
}

export function filter(value){
    console.log("I am in actions");
    dispatcher.dispatch({
        type:"FILTER_GROUP",
        filter:value
    });
}

export function addAssistance (object){
    dispatcher.dispatch({
        type:"ASSISTANCE",
        object:object
    })
}

export function deleteAssistance (object){
    dispatcher.dispatch({
        type:"DELETE_ASSISTANCE",
        object: object
    })
}

export function createStudent(name, email, toGroup, father = false ,Pemail=false, Telephone=false){
    console.log("dispatching createStudent action");
    console.log("dispatching action");
    console.log(father);

    sessionManager.ShowLoadingPage();
    dispatcher.dispatch({
        type:"CREATE_NEW_STUDENT",
        name:name,
        email:email,
        father:father,
        Pemail:Pemail,
        telephone:Telephone,
        toGroup:toGroup
    })
}

export function removeGrade(group_id, name){
    dispatcher.dispatch({
        type:"REMOVE_GRADE",
        group_id:group_id,
        name: name
    })
}
export function createGrade(arrayOfObjects){
    dispatcher.dispatch({
        type:"CREATE_GRADE",
        arrayOfObjects:arrayOfObjects
    })
}

export function createGroup(name, owner_id){
    console.log("in Action");
    console.log(owner_id);
    dispatcher.dispatch({
        type:"CREATE_GROUP",
        name: name,
        owner_id: owner_id
    })
}

export function deleteGroup(group_id){
    const id = sessionManager.getCurrentUser().id;
    dispatcher.dispatch({
        type:"DELETE_GROUP",
        id:group_id,
        owner_id: id
    })
}

export function emailParent(info_object){
    console.log("in actions");
    console.log(info_object);
    dispatcher.dispatch({
        type:"EMAIL_PERFORMANCE",
        info_object:info_object
    })
}

export function deleteStudent(id){
    dispatcher.dispatch({
        type:"DELETE_STUDENT",
        id:id
    })
}