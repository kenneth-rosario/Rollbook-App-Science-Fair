/**
 * Created by uncha_000 on 1/7/2017.
 */
import React, {Component} from 'react'
export default class MobileComp extends Component {
    constructor(props){
        super(props);
        this.state = {
            showButtons : false
        }
    }
    toggleButton(){
        this.setState({
            showButtons:!this.state.showButtons
        })
    }
    componentWillMount(){
        console.log("screen is smaller than 768px")
    }componentWillUnmount(){
        console.log("screen is bigger than 768px")
    }
    render(){
        console.log(this.state.showButtons);
        return(
            <div className="row" style={{position:"absolute","zIndex":2}}>
                <div className = {
                    this.state.showButtons?"mobile-btns col-xs-6":
                        "mobile-hide"
                }>
                    <span onClick={()=>{
                        this.toggleButton()
                    }}
                        id="remove-options" className="col-xs-offset-11 glyphicon glyphicon-remove"/>
                    {this.props.children}
                </div>
                <div onClick={()=>{this.toggleButton()}} className={
                    !this.state.showButtons?
                    "button-trigger col-xs-2":"hide"
                }>
                    <span className="glyphicon glyphicon-arrow-right" />
                </div>
            </div>
        )
    }
}