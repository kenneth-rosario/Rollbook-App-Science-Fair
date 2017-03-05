/**
 * Created by uncha_000 on 2/22/2017.
 */
import React,{Component} from 'react'
import {Link, hashHistory} from 'react-router'
import {importGroups} from '../../../../actions/rollActions'

export default class ImportGroups extends Component{
    constructor(props){
        super(props);
    }
    onSubmit(e){
        let new_file = document.getElementById('group_excel');
        let allowedExtensions = ["xls","xlt","xlm","xlsx",
        "xlsm","xltx","xltm"];
        let theFile = new_file.value;
        let first_split = theFile.split('.');
        if (allowedExtensions.indexOf(
            first_split[first_split.length - 1 ]) >= 0){
            console.log("allowed extension");
            let toSend = document.querySelector('form');
            importGroups(toSend);
            hashHistory.push('/');
            e.preventDefault();
        }else{
            console.log("not nice");
            alert("not supported file");
            e.preventDefault()
        }
    }
    render(){
        return(
            <div className="col-xs-12">
                <h2>Import Groups </h2>
                <br />
                    <a className="btn btn-info"
                        href="/view-excel-guidelines"
                    >View Excel File Template</a>
                <br />
                <form
                    className="form-group"
                    style={{color:"white"}}
                    onSubmit = {
                        (event)=>{
                            this.onSubmit(event)
                        }
                    }
                    encType="multipart/form-data"
                    action="/upload-excel"
                      method="POST"
                >
                    <input className="form-control"
                           id="group_excel"
                           name = "file"
                           style={{padding:innerHeight-500}}
                           type="file"
                            placeholder="Drop file or choose"
                    />
                    <input style={{marginTop:10}}
                           className="btn btn-primary"
                           type="submit"/>
                </form>
            </div>
        )
    }
}