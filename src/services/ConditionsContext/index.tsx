import React, { createContext, useReducer } from 'react';
import uuidv4 from 'uuid/v4';
import { IAction } from '../../types';
import { ICondition2 } from '../../types'
import { loadState } from '../../services/Save';



const getState = () => {
  const loadResult = loadState();
  if (!!loadResult.error) {
      console.error(loadResult.error)
      //const { conditions } = examples[0];
      return [];
  } else {
      console.log(JSON.stringify(loadResult))
      return loadResult.conditions
  }        
}

const nameExists = (conditions: ICondition2[], name: string) => conditions.some((condition: ICondition2) => condition.name === name)

const getName = (conditions: ICondition2[], name: string) => {    
    if (nameExists(conditions, name)) {
        name = getName(conditions, 'condition' + parseInt(name.slice(9, name.length) + 1).toString())
    } 
    return name;       
}


const initialState: any = {
    conditions: getState(),
    renameFailed: false
}


  let reducer = (state: any, action: IAction) => {
    switch (action.type) {
      case 'delete':{
          const { conditionId } = action;
          const conditions = [...state.conditions];
          const index = conditions.findIndex((condition: ICondition2) => condition.id === conditionId);
          conditions.splice(index, 1);
          return {
              ...state,
              conditions
          }
      }
      case 'evaluatorSelect': {
          const { conditionId, evaluator } = action;
          const conditions = [...state.conditions];
          const condition = conditions.find((condition: ICondition2) => condition.id === conditionId);
          condition.evaluator = evaluator;
          return {
              ...state,
              conditions
          } 
      }
      case 'load':{
        const { conditions } = action;
        console.log(`loading conditions`, conditions)
        return {
            ...state,
            conditions
        };
    }
      case 'new':{
        const { id } = action;
        const newCondition = {
            id: id ? id : uuidv4(),
            name: getName(state.conditions, 'condition' + ((state.conditions.length + 1).toString())),
            values: []
        }
        const conditions = [...state.conditions];
        conditions.unshift(newCondition);
        return {
            ...state,
            conditions
        };
    }
      case 'rename':{
          const { conditionId, name } = action;
          
          if (!!name && nameExists(state.conditions, name)) {
              return {
                  ...state,
                  renameFailed: true
              }
          }
          const conditions = [...state.conditions];
          const target = conditions.find((condition: ICondition2) => condition.id === conditionId);
          target.name = name;
          
          return {
              ...state,
              conditions,
              renameFailed: false
          }
      }
      case 'valueAdd': {
        const { conditionId } = action;
        const conditions = [...state.conditions];
        const condition = conditions.find((item: ICondition2) => item.id === conditionId);
        condition.values.push('');
        return {
          ...state,
          conditions
        }
      }
      case 'valueDelete' : {
        const { conditionId, index } = action;
        const conditions = [...state.conditions];
        const condition = conditions.find((item: ICondition2) => item.id === conditionId);
        condition.values.splice(index, 1);

        return {
          ...state,
          conditions
        }
      }
      case 'valueSet': {
        const { conditionId, index, value } = action;
        const conditions = [...state.conditions];
        const condition = conditions.find((item: ICondition2) => item.id === conditionId);
        condition.values[index] = value;

        return {
          ...state,
          conditions
        }
      }
      default:
        throw new Error();
    }
  }
  const ConditionsContext = createContext(initialState);
  const ConditionsProvider = (props: any) => {
      const [state, dispatch] = useReducer(reducer, initialState);
return (
    <ConditionsContext.Provider value={{state, dispatch}}>
    {props.children}
  </ConditionsContext.Provider>
)}

export { ConditionsContext, ConditionsProvider }