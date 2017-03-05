import {EventEmitter} from "events";
import 'whatwg-fetch'
import dispatcher from '../Dispatchers/dispatcher'
class SessionManager extends EventEmitter {
    constructor() {
        super();
        this.current_user = JSON.parse(localStorage.getItem('jtk'));
        this.logged_in = this.current_user !== null ;
        this.fetched_user = "";
        this.loading = false;
    }
    getCurrentUser(){
        return this.current_user
    }
    isLogedIn(){
        return this.logged_in
    }
    getAuthState(){
       let url = window.location.href;
       let second_split = url.split('?');
       console.log(second_split);
       let third_split = second_split[1].split('#');
       console.log(third_split);
       let fourth_split = third_split[0].split('&');
        console.log(fourth_split);
        return fourth_split
    }
    setUser(object){
        console.log("Checking");
        this.current_user = object;
        localStorage.setItem('jtk',JSON.stringify(object));
        this.HideLoadingPage()
    }
    LogIn(email, password){
        //Prepares the information to be sent
        let the_body = {
            "email":email,
            "password":password
        };
        let auth_state = this.getAuthState();
        //Fires an Ajax request to the server
        fetch('/ajax-login?'+auth_state,{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            //The information sent
            body:JSON.stringify(the_body)
        }).then((response)=>{
            //if successful it will parse the Json received
           return response.json()
        }).then((Json)=>{
            //if the above was successful set a cookie and emit change

            if(Json.status === "SUCCESS"){
                alert("Login successful");
                this.logged_in = true;
                localStorage.setItem('jtk', JSON.stringify(Json));
                this.setUser(Json)
            }else{
                alert("wrong credentials");
                this.HideLoadingPage();
            }
        });

    }
    LogOut(){
        localStorage.removeItem('jtk');
        this.current_user = null;
        this.logged_in = false;
        this.emit("change");
    }

    GetFetchedUser(){
        return this.fetched_user;
    }

    ShowLoadingPage(){
        this.loading = true;
        this.emit("change")
    }
    HideLoadingPage(){
        this.loading = false;
        this.emit("change")
    }

    ReturnLogToggle(){
        return this.loading;
    }

    LoadingUser() {
        this.fetched_user={
            fullname:"Loading",
            email:"Loading",
            id: "Loading",
            group:"Loading",
            school:"Loading"
        };
        this.emit("change")
    }
    ReturnUser(User){
        this.fetched_user = User;
        this.emit("change");
        console.log("Inside the store")
        console.log(this.fetched_user);
    }
    handleAction(action){
        //The store receives the action from the dispatcher
        //and depending the action it will preform a certain function
        switch(action.type){
            case "LOGIN" :
                this.LogIn(action.email, action.password);
                break;
            case "LOGOUT":
                this.LogOut();
                break;
            case "FETCHING_USER":
                this.LoadingUser();
                break;
            case "RETURN_USER":
                this.ReturnUser(action.user);
                break;
        }
    }
}

const sessionManager = new SessionManager;
dispatcher.register(sessionManager.handleAction.bind(sessionManager));
export default sessionManager