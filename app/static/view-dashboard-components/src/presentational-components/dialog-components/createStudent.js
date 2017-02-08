/**
 * Created by uncha_000 on 12/21/2016.
 */
import React, {Component} from 'react'
import groupManager from '../../../../stores/groupStore'
import MultipleSelect from './multipleSelect'
export default class CreateStudent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const groups= groupManager.getAll();
        return(
          <div className="form-group">
              <label htmlFor="name" >Name:</label>
              <input type="text" id="name" className="form-control" placeholder="student's name" />
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" className="form-control" placeholder="student's email"/>
              <label htmlFor="group" >Add To Which Group:</label>
              {!this.props.showMultiple ?
                  <select className="form-control" id="group">
                      {
                          groups.map((element, key) => {
                              return (
                                  <option value={element.id} key={key}>{element.name}</option>
                              )
                          })
                      }
                  </select>:<MultipleSelect groups = {groups}/>
              }
              <button style={{marginTop:10}} className="form-control btn btn-warning" onClick={()=>{this.props.handleClick()}}>
                  {!this.props.showMultiple?"Add to more than one group":"Add to a specific Group"}
              </button>
          </div>
        );
    }
}