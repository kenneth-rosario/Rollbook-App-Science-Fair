/**
 * Created by uncha_000 on 1/14/2017.
 */


    export default function parse(string){
        let sqrt = Math.sqrt;
        let currentString = "";
        for(let i = 0; i<string.length;i++){
            if(string[i]==="^"){
                currentString+="**";
            }else if(string[i]==="*"){
                if(i>0){
                    if(string[i-1]==="*"){
                        throw new EvalError("Syntax Error," +
                            " Cannot have two multiply signs one after the other")
                    }
                }
                currentString+=string[i]
            }
            else{
                currentString+=string[i]
            }
        }
        console.log(currentString);
        if(eval(currentString)===undefined){
            throw new EvalError("Syntax Error it is not a parsable syntax")
        }
        return eval(currentString)
    }
