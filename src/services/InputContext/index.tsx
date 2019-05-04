import React, { createContext, useReducer } from 'react';
import uuidv4 from 'uuid/v4';
import { IInput } from '../../types';

const nameExists = (inputs: IInput[], name: string) => inputs.some((input: IInput) => input.name === name)

const getName = (inputs: IInput[], name: string) => {    
    if (nameExists(inputs, name)) {
        name = getName(inputs, (parseInt(name) + 1).toString())
    } 
    return name;       
}



const initialState: any = {
    inputs: [
        {
            id: '1',
            name: '1',
            value: ''
        }
    ],
    renameFailed: false
}


  let reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'new':{
          const newInput = {
              id: uuidv4(),
              name: getName(state.inputs, (state.inputs.length + 1).toString()),
              value: ''
          }
          const inputs = [...state.inputs];
          inputs.push(newInput);
          return {
              ...state,
              inputs
          };
      }
      case 'delete':{
          const { index } = action;
          const inputs = [...state.inputs];
          inputs.splice(index, 1);
          return {
              ...state,
              inputs
          }
      }
      case 'rename':{
          const { index, name } = action;
          
          if (nameExists(state.inputs, name)) {
              return {
                  ...state,
                  renameFailed: true
              }
          }
          const inputs = [...state.inputs];
          const target = {...state.inputs[index]};
          target.name = name;
          inputs[index] = target;

          return {
              ...state,
              inputs,
              renameFailed: false
          }
      }
      case 'save':{
          const { index, value } = action;
          const inputs = [...state.inputs];
          const target = {...state.inputs[index]};
          target.value = value;
          inputs[index] = target;
          return {
              ...state,
              inputs
          }
      }
      default:
        throw new Error();
    }
  }

  const InputContext = createContext(initialState);
  const InputProvider = (props: any) => {
      const [state, dispatch] = useReducer(reducer, initialState);
return (
    <InputContext.Provider value={{state, dispatch}}>
    {props.children}
  </InputContext.Provider>
)}

  export { InputContext, InputProvider }


// import React, { createContext, useReducer } from 'react';



// let reducer = (state: any, action: any) => {
//     switch(action.type) {
//         case 'new' : {
//             return state
//         }
//         default: 
//         throw new Error();
//     }
// }

// const InputContext = createContext(initialState);
// const InputProvider = (props: any) => {
//     const [state, dispatch] = useReducer(reducer, initialState);
// return (
//   <InputContext.Provider value={{state, dispatch}}>
//   {props.children}
// </InputContext.Provider>
// )}

// export { InputContext, InputProvider }