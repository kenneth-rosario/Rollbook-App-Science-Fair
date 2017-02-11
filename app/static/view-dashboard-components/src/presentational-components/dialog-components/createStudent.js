/**
 * Created by uncha_000 on 12/21/2016.
 */
import React, {Component} from 'react'
import groupManager from '../../../../stores/groupStore'
import BasicInformation from './BasicInformation'
export default class CreateStudent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const groups= groupManager.getAll();
        return(
          <div className="form-group">
               <form>
                    <BasicInformation />
                   <label htmlFor="group" >Add To Which Group:</label>
               </form>
                  <select className="form-control" id="group">
                      {
                          groups.map((element, key) => {
                              return (
                                  <option value={element.id} key={key}>{element.name}</option>
                              )
                          })
                      }
                  </select>
          </div>
        );
    }
}