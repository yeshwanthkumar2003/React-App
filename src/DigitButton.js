import {actions} from "./App"
export default function Digitbutton({dispatch,digit}){
    return (
    <button 
    onClick={() => dispatch({type: actions.Add_digit,payload :{digit}})}>
        {digit}
        </button>
    )
}