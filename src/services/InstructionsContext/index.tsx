import React, { createContext, useReducer } from 'react';
import { IAction } from '../../types';


const initialState: any = {
    instructions: true
}


  let reducer = (state: any, action: IAction) => {
    switch (action.type) {
        case 'on':{
            return {
                instructions: true
            }
        }  
      case 'off':{
          return {
              instructions: false
          }
      }
      case 'toggle': {
        const current = state.instructions;
        return {
          instructions: !current
        }
      }
      default:
        throw new Error();
    }
  }

  const InstructionsContext = createContext(initialState);
  const InstructionsProvider = (props: any) => {
      const [state, dispatch] = useReducer(reducer, initialState);
return (
    <InstructionsContext.Provider value={{state, dispatch}}>
    {props.children}
  </InstructionsContext.Provider>
)}

  export { InstructionsContext, InstructionsProvider }