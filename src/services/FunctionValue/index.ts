import { ICondition2, IInput, IFunction } from '../../types';
import { conditionValue } from '../ConditionValue';

export const functionValue = ({
    functionId,
    conditions,
    functions,
    inputs
}: {
    functionId: string,
    conditions: ICondition2[],
    functions: IFunction[],
    inputs: any[]
}) => {
  const thisFunction = functions.find((fn: IFunction) => fn.id === functionId)
    
    //@ts-ignore
    const { target, conditions: conditionsInFunction } = thisFunction;
    if (!target) return undefined;
    if (!inputs || inputs.length === 0) return undefined;

    const result = conditionsInFunction.slice(0).reduce((
      acc: boolean | undefined, 
      conditionId: string, 
      index: number, 
      arr: string[]
      ) => {
      acc = conditionValue({
          conditionId,
          functionId,
          conditions,
          inputs,
          functions
      })
      
      //break out of reduce if anything returns false
      if (acc === false || acc === undefined) {
        arr.splice(1)
      }
      return acc;
    }, undefined)

    console.log(`result is `, result);
    return result;
    
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
