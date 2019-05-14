import React, { createContext, useReducer } from 'react';
import uuidv4 from 'uuid/v4';
import { IAction } from '../../types';

 const nameExists = (functions: IFunction[], name: string) => functions.some((thisFunction: IFunction) => thisFunction.name === name)

const getName = (functions: IFunction[], name: string) => {    
    if (nameExists(functions, name)) {
        name = getName(functions, 'function' + parseInt(name.slice(8, name.length) + 1).toString())
    } 
    return name;       
}

export interface IFunction {
    id: string,
    name?: string,
    target?: string,
    conditions?: string[]
} 

const initialState: any = {
    functions: [],
    renameFailed: false
}


  let reducer = (state: any, action: IAction) => {
    switch (action.type) {
      case 'delete':{
          const { functionId } = action;
          const functions = [...state.functions];
          const index = functions.findIndex((thisFunction: IFunction) => thisFunction.id === functionId);
          functions.splice(index, 1);
          return {
              ...state,
              functions
          }
      }
      case 'targetSelect' : {
        const { functionId, targetId } = action;
        const functions = [...state.functions];
        const thisFunction = functions.find((item: IFunction) => item.id === functionId);

        thisFunction.target = targetId;

        return {
          ...state,
          functions
        }
      }
      case 'load':{
        const { functions } = action;
        return {
            ...state,
            functions
        };
    }
      case 'new':{
        const newFunction = {
            id: uuidv4(),
            name: getName(state.functions, 'function' + ((state.functions.length + 1).toString())),
            target: undefined,
            values: []
        }
        const functions = [...state.functions];
        functions.push(newFunction);
        return {
            ...state,
            functions
        };
    }
      case 'rename':{
          const { functionId, name } = action;
          
          if (nameExists(state.functions, name)) {
              return {
                  ...state,
                  renameFailed: true
              }
          }
          const functions = [...state.functions];
          const target = functions.find((item: IFunction) => item.id === functionId)
          target.name = name;
          
          return {
              ...state,
              functions,
              renameFailed: false
          }
      }
    //   case 'save':{
    //       const { index, value } = action;
    //       const inputs = [...state.inputs];
    //       const target = {...state.inputs[index]};
    //       target.value = value;
    //       inputs[index] = target;
    //       return {
    //           ...state,
    //           inputs
    //       }
    //   }
      case 'conditionAdd': {
        const { conditionId, functionId } = action;
        const functions = [...state.functions];
        const target = functions.find((item: IFunction) => item.id === functionId);
        !target.conditions && (target.conditions = []);
        !target.conditions.includes(conditionId) && target.conditions.push(conditionId);

        return {
          ...state,
          functions
        }
      }
      case 'conditionRemove' : {
        const { conditionId, functionId } = action;
        const functions = [...state.functions];
        const target = functions.find((item: IFunction) => item.id === functionId);
        const index = target.conditions.findIndex(conditionId);
        target.values.splice(index, 1);

        return {
          ...state,
          functions
        }
      }
      default:
        throw new Error();
    }
  }
  const FunctionsContext = createContext(initialState);
  const FunctionsProvider = (props: any) => {
      const [state, dispatch] = useReducer(reducer, initialState);
return (
    <FunctionsContext.Provider value={{state, dispatch}}>
    {props.children}
  </FunctionsContext.Provider>
)}

export { FunctionsContext, FunctionsProvider }