/**
 * Created by uncha_000 on 3/4/2017.
 */
import React,{Component} from 'react'
export default class PassWordWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {
            passValue:"",
            confirmPass:""
        }
    }
    passChange(e){
        this.setState({
            passValue:e.target.value,
        })
    }
    confirmChange(e) {
        this.setState({
            confirmPass:e.target.value
        })
    }
    returnClassName(){
        if(this.state.passValue === this.state.confirmPass && this.state.passValue.length !== 0){
            return " form-group has-success "
        }else{
            return " form-group has-error "
        }
    }
    render(){
        return(
            <div>
                <div className={this.returnClassName()}>
                    <label htmlFor="password" >Password:</label>
                    <input onChange={(event)=>{this.passChange(event)}}
                        type="password" id="password" className="form-control" value={this.state.passValue}/>
                </div>
                <div className={this.returnClassName()}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        onChange ={(event)=>{this.confirmChange(event)}}
                        id="confirmPass"
                           className='form-control'
                           value={this.state.confirmPass} type="password"/>
                </div>
            </div>
        )
    }
}