/**
 * Created by uncha_000 on 1/10/2017.
 */
import Chart from '../../../node_modules/react-google-charts/lib/components/Chart'
import groupManager from '../../../stores/groupStore'
import React, {Component} from 'react'


export default class StatisticData extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:groupManager.getGroupStatistics(),
            options:{"legend":{"position":"top","maxLines":3},"bar":{"groupWidth":"75%"},"isStacked":true,
            hAxis: { title: 'Groups' },
                vAxis: { title:'Number of Students in group',minValue:0}
            }
        }
    }
    render(){
        return(
            <div className="col-xs-offset-1 col-xs-10">
                <Chart
                    chartType = "ColumnChart"
                    data = {this.state.data}
                    width = "100%"
                    options={this.state.options}
                />
            </div>
        )
    }
}