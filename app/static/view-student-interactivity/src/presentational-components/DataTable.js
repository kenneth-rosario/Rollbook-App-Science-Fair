/**
 * Created by uncha_000 on 1/2/2017.
 */
import React, {Component} from 'react'
import Chart from '../../../node_modules/react-google-charts/lib/components/Chart'
import studentManager from '../../../stores/studentStore'
export default class DataTable extends Component{
    constructor(props){
        super(props);
        this.state ={
            options:{
                title:"Grades By Tests",

            },
            data:studentManager.getTableDataFromStudentWithId(this.props.id),
            chartType: 'ColumnChart',
              rows: studentManager.getTableDataFromStudentWithId(this.props.id),
              columns: [{"label":"Tests", type:"string"}, {"label":"Grades", type:"number"}],
              options: {
                chart: {
                  title: 'Grades Chart',
                  subtitle: 'performance analysis'
                },
                hAxis: { title: 'Tests' },
                vAxis: { title: 'Grades',minValue:0, maxValue:110 }
              }

        }

    }
    render(){
        //TODO: Continue styling the table
        return(

                <div className="col-sm-offset-1 col-sm-10">
                    <h4>
                        Data Table:
                    </h4>
                    <Chart
                        columns = {this.state.columns}
                        rows = {this.state.rows}
                        options = {this.state.options}
                        chartType = "ColumnChart"
                        width = "100%"
                    />
                </div>
        )
    }
}