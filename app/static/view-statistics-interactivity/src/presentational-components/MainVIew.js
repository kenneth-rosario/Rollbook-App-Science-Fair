/**
 * Created by uncha_000 on 1/10/2017.
 */
import React, {Component} from 'react'
// import Chart from '../../../node_modules/react-google-charts/lib/components/Chart'
import StatisticData from './StatisticData'
import DangerGroups from './Danger Groups'

export default class MainView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div >
                <div className="row">
                    <div className="col-xs-9">
                        <h3>Groups' Statistics</h3>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <StatisticData />
                </div>
                <div className="row">
                    <DangerGroups />
                </div>
            </div>
        )
    }
}