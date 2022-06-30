import React from "react";
import { useReducer } from "react";
import Digitbutton from "./DigitButton"
import Operationbutton from "./operationbutton";
import "./styles.css"
export const actions={
Add_digit:"add-digit",
CHOOSE_OPERATION:"choose-operation",
CLEAR:"clear",
Delete_digit:"delete-digit",
EVALUATE:"evaluate",


}

function Reducer(state,{type, payload}){  
    //type and payload are the actions
    switch(type){         //--->using the switch statement we call the functions
      case actions.Add_digit:
        if (state.overwrite){
          return{
            ...state,
            currentoperand:payload.digit,
            overwrite:false,

          }
        }


        if(payload.digit ==="0" && state.currentoperand === "0")
        return state
       
        if(payload.digit ==="." && state.currentoperand.includes("."))return state
        return {
        ...state,
        currentoperand:`${state.currentoperand || ""}${payload.digit}`,
        }
      case actions.CLEAR:
        return{}

      case actions.Delete_digit:
        if(state.overwrite){
          return{
            ...state,
            overwrite:false,
            currentoperand:null,
            

          }
        }
        if(state.currentoperand == null) return state
        if(state.currentoperand.length ===1){
          return{...state,currentoperand:null}
        }

        return{
          ...state,
          currentoperand:state.currentoperand.slice(0,-1)
        }

      case actions.EVALUATE:
        if(state.operation == null ||
           state.currentoperand == null || 
           state.previousoperand == null){
          return state
        } return{
          overwrite:true,
          ...state,
          previousoperand:null,
          currentoperand:null,
          currentoperand:evaluate(state)
        }

      case actions.CHOOSE_OPERATION:
        if(state.currentoperand == null && state.previousoperand == null){
          return state
        }

        if (state.currentoperand == null){
          return{
            ...state,
            operation:payload.operation,
          }
        }
        if(state.previousoperand == null ){
          return {
            ...state,
            operation:payload.operation,
            previousoperand:state.currentoperand,
            currentoperand:null,
          }
        }

        return{
          ...state,
          previousoperand:evaluate(state),
          operation:payload.operation,
          currentoperand:null
        }



    }

}
function evaluate({currentoperand,previousoperand,operation}){
  const prev=parseFloat(previousoperand)
  const current=parseFloat(currentoperand)
  
  if(isNaN(prev) || isNaN(current)) return ""
  let computation= " "
  switch(operation){
    case "+":
      computation=prev+current
      break
      
     case "*":
     computation=prev*current
     break

     case "÷":
     computation=prev/current
     break

     case "-":
     computation=prev-current
     break
  }
  return computation.toString()
}

const integer_formatter=new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0,
})

function formatoperand(operand){
  if(operand == null)return
  const[integer,decimal]=operand.split(",")
  if(decimal == null)return integer_formatter.format(integer)
  return '${integer_formatter.format(integer)}.${decimal}'
}
function App() {

const [{currentoperand,previousoperand,operation}, dispatch] = useReducer(Reducer,{})


  return (
    <div>
    <h1 class="logo-1">Calculator</h1>
    
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatoperand(previousoperand)}{operation}</div>
        <div className="current-operand">{formatoperand(currentoperand)}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({type:actions.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type:actions.Delete_digit})}>DEL</button>
      <Operationbutton operation="+" dispatch={dispatch} />

      <Digitbutton digit="1" dispatch={dispatch} />
      <Digitbutton digit="2" dispatch={dispatch} />
      <Digitbutton digit="3" dispatch={dispatch} />
      <Operationbutton operation="÷" dispatch={dispatch} />
      


      <Digitbutton digit="4" dispatch={dispatch} />
      <Digitbutton digit="5" dispatch={dispatch} />
      <Digitbutton digit="6" dispatch={dispatch} />
      <Operationbutton operation="*" dispatch={dispatch} />
      

      <Digitbutton digit="7" dispatch={dispatch} />
      <Digitbutton digit="8" dispatch={dispatch} />
      <Digitbutton digit="9" dispatch={dispatch} />
      <Operationbutton operation="-" dispatch={dispatch} />
      
      <Digitbutton digit="." dispatch={dispatch} />
      <Digitbutton digit="0" dispatch={dispatch} />
      <button className="span-two"  onClick={() => dispatch({type:actions.EVALUATE})}>=</button>
    </div>
    <p>created by <b>@Yeshwanth</b></p>
  </div>
  );
}

export default App;
