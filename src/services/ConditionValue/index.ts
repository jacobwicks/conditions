import { match } from '../Match';
import { ICondition, IInput, IExpression, IOperator, IParenthesis, ICondition2, IFunction } from '../../types';

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
  const { evaluator, values }  = condition;
  if (evaluator === 'noResponse') {
    return !(!!inputValue);
  } else if (evaluator === 'anyResponse') {
    return !!inputValue;
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
