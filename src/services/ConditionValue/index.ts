import { match } from '../Match';
import { ICondition, IInput } from '../../types';

export const conditionValue = ({
    conditionId,
    items,
    inputs
}: {
    conditionId: string
    items: any[],
    inputs: any[]
}) => {
    const condition = items.find((item: ICondition) => item.content.conditionId === conditionId)
    const { id } = condition.content.target;
    if (!id) return undefined;
    const inputValue = inputs.find((input: IInput) => input.id === id).value;
    const matchType = condition.content.match.type;
    let { values } = condition.content.match;
    
    if (matchType === 'exact') {
        if (!(!!values.length) || !inputValue) return false;
        values = values
        .map((value: string) => '"' + value + '"')
      } else if (matchType === 'none') return !(!!inputValue)
        else if (matchType === 'any') return !!inputValue
      
      //multiSearch will return partial match or exact
      //depending on what is specified
      if (!!inputValue) {
          const result = match({
            searchString: inputValue,
            items: values,
            searchBy: undefined,
            simpleReturn: undefined
          })
          return Array.isArray(result) ? !!result.length : false; 
      } else return false;    
}
