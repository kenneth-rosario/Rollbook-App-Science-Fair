/**
 * Created by uncha_000 on 1/13/2017.
 */
/**
 * Created by uncha_000 on 1/13/2017.
 */
import React, {Component} from 'react'
import parse from "./MiniParser"
// add buttons to Calculator
var Num = React.createClass({
     populateWithButtons: function(){
        var numbers = [];
        var counter = 0;
        var additionalSymbols = ['+','-','*'];
        for(var i = 1; i<10; i++){
            numbers.push(''+i);
            if(i%3===0){numbers.push(additionalSymbols[counter]); counter++;};
        }
        numbers.push.apply(numbers, [0,'.','=','/']);
        numbers.push.apply(numbers, ['^','(',')','sqrt(']);
        return numbers
     },

     render:function(){
        var newL = this.populateWithButtons();

        return(
          <div className = 'row'>
             {
                 newL.map((symbol, i)=>{
                    return <button ref id={symbol} onClick={()=>(newL[i]!=='=')?this.props.onClick(symbol):this.props.solve(this.props.eq)}
                    className='btn btn-lg btn-primary col-xs-3'>{symbol}</button>
                 })
             }
          </div>
        );

     }

});
//Display the current equation
var Display = React.createClass({

    render:function(){
        return(
           <div className ="row " style={{height:100, 'backgroundColor':'#d5d9e0', color:"white"}}>
                <div className="col-xs-10 ">
                    <h3>{this.props.eq}</h3>
                </div>
                <div className="col-xs-2">
                    <button onClick={this.props.clear}>C</button>
                </div>
           </div>
        );
    }

});
//Parent class
var Calculator =  React.createClass({
    getInitialState:function(){
        return {
            current_text:''
        }
    },
    editEquation: function(text){
    if(this.state.current_text.length<31){
        var newtext = this.state.current_text + text;
        this.setState({current_text:newtext});
        }
    else{
        alert('no more numbers fit');
    }
    },
    solve : function(equation){
        try{

        var result = parse(equation);
        this.setState({current_text:result+''});
        }
        catch(err){
            console.log(err);
            this.setState({current_text:'Syntax Error, Clear Now'});
        }
    },
    clearDisplay: function(){
        this.setState({current_text:''});
    },

    render: function(){
        return (
            <div className="row"  style={{backgroundColor:'#515151',padding:15}}>
                <Display  eq={this.state.current_text} clear={this.clearDisplay} />
                <Num onClick ={this.editEquation} solve = {this.solve} eq={this.state.current_text} />
            </div>
        );
    }
});
export default Calculator