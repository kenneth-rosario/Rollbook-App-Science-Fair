/**
 * Created by uncha_000 on 12/17/2016.
 */
import dispatcher from '../Dispatchers/dispatcher'

export function Login (email, password){
    console.log(email);
    console.log(password);
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
export function createStudent(name, email, toGroup, multipleGroups=false){
    console.log("dispatching createStudent action");
    console.log("dispatching action");
    dispatcher.dispatch({
        type:"CREATE_NEW_STUDENT",
        name:name,
        email:email,
        toGroup:toGroup,
        multipleGroups:multipleGroups
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