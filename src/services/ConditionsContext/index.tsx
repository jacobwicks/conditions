import React, { createContext, useReducer } from 'react';
import uuidv4 from 'uuid/v4';
import { IAction } from '../../types';
//import { loadState } from '../../services/Save';

export enum responseEvaluators {
    anyResponse = 'anyResponse',
    noResponse = 'noResponse'
}

export enum searchEvaluators {
    exact = 'exact',
    inclusive = 'inclusive',
    partial = 'partial'
}

export enum mathEvaluators {
    equals = 'equals',
    greaterThan = 'greaterThan',
    lessThan = 'lessThan',
    greaterThanOrEqualTo = 'greaterThanOrEqualTo',
    lessThanOrEqualTo = 'lessThanOrEqualTo',
    between = 'between'
}

export type evaluator = responseEvaluators | searchEvaluators | mathEvaluators;

export const allEvaluators = {
    ...responseEvaluators,
    ...searchEvaluators,
    ...mathEvaluators
};

export interface ICondition2 {
    name ?: string,
    id: string,
    evaluator: evaluator,
    values ?: (string | number)[]
}

// const getState = () => {
//   const loadResult = loadState();
//   if (!!loadResult.error) {
//       console.error(loadResult.error)
//       const { inputs } = examples[0];
//       return inputs;
//   } else {
//       console.log(JSON.stringify(loadResult))
//       return loadResult.inputs
//   }        
// }

const nameExists = (conditions: ICondition2[], name: string) => conditions.some((condition: ICondition2) => condition.name === name)

const getName = (conditions: ICondition2[], name: string) => {    
    if (nameExists(conditions, name)) {
        name = getName(conditions, 'condition' + parseInt(name.slice(9, name.length) + 1).toString())
    } 
    return name;       
}


const initialState: any = {
    conditions: [],
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
        return {
            ...state,
            conditions
        };
    }
      case 'new':{
        const newCondition = {
            id: uuidv4(),
            name: getName(state.conditions, 'condition' + ((state.conditions.length + 1).toString())),
            values: []
        }
        const conditions = [...state.conditions];
        conditions.push(newCondition);
        return {
            ...state,
            conditions
        };
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