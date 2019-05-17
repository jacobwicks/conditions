import { ICondition2, IFunction } from '../../types';
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

    return conditionsInFunction.slice(0).reduce((
      result: boolean | undefined, 
      conditionId: string, 
      index: number, 
      arr: string[]
      ) => {
        //set result equal to the value of current condition
      result = conditionValue({
          conditionId,
          functionId,
          conditions,
          inputs,
          functions
      })
      
      //break out of reduce if anything returns false
      if (result === false || result === undefined) {
        arr.splice(1)
      }
      return result;
    }, undefined)
}