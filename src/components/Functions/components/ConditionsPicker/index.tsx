import React, { useContext} from 'react';
import { ConditionsContext, ICondition2 } from '../../../../services/ConditionsContext';
import { FunctionsContext } from '../../../../services/FunctionsContext';
import { Dropdown } from 'semantic-ui-react';
import { IFunction } from '../../../../services/FunctionsContext';

const ConditionsPicker = ({
    functionId
}:{
    functionId: string
}) => {
    const { dispatch, state } = useContext(FunctionsContext);
    const { conditions } = useContext(ConditionsContext).state;
    const { functions } = state;
    const thisFunction = functions.find((item: IFunction) => item.id === functionId);
    const conditionsInFunction = thisFunction.conditions;

    const namedConditions = conditions
    .filter((condition: ICondition2) => 
    !conditionsInFunction || 
    !conditionsInFunction.some((conditionInFunction: string) => condition.id === conditionInFunction)) 
    .filter((condition : ICondition2) => !!condition.name)

    console.log(`namedConditions are`, namedConditions)
    const options = namedConditions.map((condition: ICondition2) => {
        return {
            key: condition.id,
            text: condition.name,
            value: condition.id
        }
    });

    console.log(`options are`, options);

    const handleChange = (conditionId : string) => dispatch({
        type: 'conditionAdd',
        functionId,
        conditionId
    });

    return (
        <Dropdown
    onChange={(e, {value}) => typeof(value) === 'string' && handleChange(value)}
    options={options}
    search
    placeholder={'select a condition'}
  />)
} 

export default ConditionsPicker;

