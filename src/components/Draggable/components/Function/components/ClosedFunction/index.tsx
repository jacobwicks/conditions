import React, { Fragment, useContext} from 'react';
import { ConditionsContext } from '../../../../../../services/ConditionsContext';
import { IInput, ICondition2 } from '../../../../../../types';

const ClosedFunction = ({
target,
functionConditions,
name
}:{
target: IInput,
functionConditions: string[],
name?: string
}) => {
    const { conditions } = useContext(ConditionsContext).state;  
return (
    <Fragment>
    <div>{name ? name : `Anonymous Function`}</div>
    <div>Target: {target
    ? target.name
    : `No target`}
    </div>
    <div>
    Conditions: {functionConditions && !!functionConditions.length
    ? functionConditions
    .map((
        conditionId: string, 
        index: number
        ) => {
            if (index < 5) {
            return <div key={`value` + index.toString()}>
                {conditions && conditions.find((condition: ICondition2) => condition.id === conditionId).name}
            </div>
            }
            if (index === 5) {
                return <div key={`value` + index.toString()}>...</div>
            }
            return null; 
        }) 
    : 'None'}
    </div> 
    </Fragment>
)}

export default ClosedFunction;