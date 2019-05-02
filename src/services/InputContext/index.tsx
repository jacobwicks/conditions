import React, { createContext, useReducer } from 'react';


const initialState: any = {
    inputs: [
        {
            name: '1',
            value: ''
        }
    ]
}


  let reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'new':{
          const newInput = {
              name: (state.inputs.length + 1).toString(),
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