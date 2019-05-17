import {  
  IInput, 
  ICondition2, 
  IFunction, 
  mathEvaluators, 
  responseEvaluators,
  searchEvaluators 
} from '../../types';
import _ from 'lodash';

export const searchEvaluation = ({
  inputValue,
  evaluator,
  values
}:{
  inputValue: string,
  evaluator: searchEvaluators,
  values:string[]
}) => {

  const evaluate: { [key: string]: () => boolean | undefined } = {
    exact: () => values.slice(0).reduce((
        result: boolean | undefined, 
        value: string,
        index: number,
        arr: string[]  
        ) => {
        result = inputValue.toLowerCase() === value.toLowerCase();
        if (result === true) {
          arr.splice(1)
        } 
        return result;
      }, undefined),

    // if part of the input string is equal to all of one or more of the provided values
    partial: () => values.slice(0).reduce((
      result: boolean | undefined, 
      value: string,
      index: number,
      arr: string[]  
      ) => {
      const re = new RegExp(_.escapeRegExp(value), 'i');
      result = re.test(inputValue)       
      if (result === true) {
        arr.splice(1)
      } 
      return result;
    }, undefined),
    inclusive: () => false,
  }


return evaluate[evaluator]()
}

const responseEvaluation = ({
  inputValue,
  evaluator,
 }: {
  inputValue: string,
  evaluator: string,
}) => { 
  const evaluate: {[key: string]: () => boolean} = {
    anyResponse: () => !!inputValue,
    noResponse: () => !!inputValue
  }
  return evaluate[evaluator]();
}

const mathEvaluation = ({
  inputValue,
  evaluator,
  values
}: {
  inputValue: string,
  evaluator: string,
  values: (string | number)[]
}) => {
 const input = parseFloat(inputValue);
const evaluate: { [key: string]: () => boolean | undefined } = {
  equals: () => {
    return values.slice(0).reduce((
      result: boolean | undefined, 
      value: string | number,
      index: number,
      arr: (string | number)[]  
      ) => {
        //@ts-ignore
      const numberValue: number = typeof(value === 'string') ? parseFloat(value) : value 
      result = input === numberValue;
      if (result === true) {
        arr.splice(1)
      } 
      return result;
    }, undefined)
  },
  greaterThan: () => {
    return values.slice(0).reduce((
      result: boolean | undefined, 
      value: string | number,
      index: number,
      arr: (string | number)[]  
      ) => {
      //@ts-ignore
      const numberValue: number = typeof(value === 'string') ? parseFloat(value) : value 
      result = input > numberValue;
      if (result === true) {
        arr.splice(1)
      } 
      return result;
    }, undefined)
  },
  lessThan: () => {
    return values.slice(0).reduce((
      result: boolean | undefined, 
      value: string | number,
      index: number,
      arr: (string | number)[]  
      ) => {
                //@ts-ignore
      const numberValue: number = typeof(value === 'string') ? parseFloat(value) : value 
      result = input < numberValue;
      if (result === true) {
        arr.splice(1)
      } 
      return result;
    }, undefined)
  },
  greaterThanOrEqualTo: () => {
    return values.slice(0).reduce((
      result: boolean | undefined, 
      value: string | number,
      index: number,
      arr: (string | number)[]  
      ) => {
                //@ts-ignore
      const numberValue: number = typeof(value === 'string') ? parseFloat(value) : value 

      result = input >= numberValue;
      if (result === true) {
        arr.splice(1)
      } 
      return result;
    }, undefined)
  },
  lessThanOrEqualTo: () => {
    return values.slice(0).reduce((
      result: boolean | undefined, 
      value: string | number,
      index: number,
      arr: (string | number)[]  
      ) => {
                //@ts-ignore
      const numberValue: number = typeof(value === 'string') ? parseFloat(value) : value 
      result = input >= numberValue;
      if (result === true) {
        arr.splice(1)
      } 
      return result;
    }, undefined)
  },
  between: () => {
    const twoValues = values.slice(0, 2);
    if (twoValues[0] === undefined || twoValues[1] === undefined) return undefined;
    //@ts-ignore
    twoValues[0] = typeof(twoValues[0] === 'string') ? parseFloat(twoValues[0]) : twoValues[0] 
    //@ts-ignore
    twoValues[1] = typeof(twoValues[1] === 'string') ? parseFloat(twoValues[1]) : twoValues[1];
    if (input > twoValues[0] && input < twoValues[1]) return true;
    if (input < twoValues[0] && input > twoValues[1]) return true;
    return false;
  },
};

return evaluate[evaluator]();
}


export const conditionValue = ({
    conditionId,
    functionId,
    conditions,
    inputs,
    functions
}: {
    conditionId: string,
    functionId: string,
    conditions: ICondition2[],
    inputs: IInput[],
    functions: IFunction[]
}) => {
  const condition = conditions.find((c: ICondition2) => c.id === conditionId);
  if (!condition) return undefined;

  const thisFunction = functions.find((fn: IFunction) => fn.id === functionId);
  if (!thisFunction) return undefined;

  const { target } = thisFunction;
  if (!target) return undefined;

  if (!inputs || inputs.length === 0) return undefined;  
  const input = inputs.find((input: IInput) => input.id === target);
  if (!input) return undefined;
  const inputValue = input.value;
  const { evaluator, values } = condition;
  
  if (Object.keys(responseEvaluators).includes(evaluator)) {
    return responseEvaluation({
      inputValue,
      evaluator
    })
  } else if (Object.keys(mathEvaluators).includes(evaluator)) {
    if (!values) {
      return undefined;
    } else return mathEvaluation({
      inputValue,
      evaluator,
      values
    })
  } else if (Object.keys(searchEvaluators).includes(evaluator)) {
    if (!values) {
      return
    }
    //NOTE: re-type values to be string[]
    //@ts-ignore
    return searchEvaluation({inputValue, evaluator, values})
  } else return undefined;
    
//     if (matchType === 'exact') {
//         if (!(!!values.length) || !inputValue) return false;
//         if (!!inputValue) {
//           const result = match({
//             searchString: inputValue,
//             items: values,
//             exact: true,
//             includePartial: false,
//             searchBy: undefined,
//             simpleReturn: undefined
//           })
//           return Array.isArray(result) ? !!result.length : false;  
//       }
//     } else if (matchType === 'none') {
//         return !(!!inputValue)
//       } else if (matchType === 'any') {
//         return !!inputValue
//       } else if (matchType === 'partialInclusive') {
//         if (!!inputValue) {
//             const result = match({
//               searchString: inputValue,
//               items: values,
//               exact: false,
//               includePartial: true,
//               searchBy: undefined,
//               simpleReturn: undefined
//             })
//             return Array.isArray(result) ? !!result.length : false;    
//       }
//     }
//       //multiSearch will return partial match or exact
//       //depending on what is specified
//       if (!!inputValue) {
//           const result = match({
//             searchString: inputValue,
//             exact: false,
//             includePartial: false,
//             items: values,
//             searchBy: undefined,
//             simpleReturn: undefined
//           })
//           return Array.isArray(result) ? !!result.length : false; 
//       } else return false;    
}
