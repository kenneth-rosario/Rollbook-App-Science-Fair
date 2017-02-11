/**
 * Created by uncha_000 on 1/7/2017.
 */
import React,{Component} from 'react'
import MobileComp from './MobileComp'
import DeskComp from './DeskComp'
export default class ResizeWrapper extends Component {
    constructor(props){
        super(props);
        this.screenListener = this.screenListener.bind(this);
        this.state = {
            screenWidth : window.innerWidth
        }
    }
    screenListener(){
        this.setState({
            screenWidth : window.innerWidth
        })
    }
    componentWillMount(){
        window.addEventListener('resize', this.screenListener)
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.screenListener)
    }
    render(){
        let width = this.state.screenWidth;
        console.log(width);
        return(
            <div>
                {
                    width > 768 ?
                        (<DeskComp
                            className = {this.props.classNames.desktop}>
                            {this.props.children}
                        </DeskComp>):(
                            <MobileComp>
                                {this.props.children}
                            </MobileComp>
                        )
                }
            </div>
        )
    }

}