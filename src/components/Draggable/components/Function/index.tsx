import React, { useContext } from 'react';
import { FunctionsContext } from '../../../../services/FunctionsContext';
import { IFunctionContent } from '../../../../types';
import { InputContext } from '../../../../services/InputContext';
import { IInput, IFunction } from '../../../../types';
import ClosedFunction from './components/ClosedFunction';
import OpenFunction from './components/OpenFunction';

const Function = ({
    thisFunction
}: {
    thisFunction: IFunctionContent
}) => {
    const { functionId, open } = thisFunction;
    
    const { inputs } = useContext(InputContext).state;
    const { functions } = useContext(FunctionsContext).state
    
    const targetFunction = functions && functions.find((fn: IFunction) => fn.id === functionId);
    const { 
        name,
        target: targetId, 
        conditions: functionConditions,
    } = targetFunction || {name: `none`, target: `1`, conditions: []};
    
    const target = inputs
    .find((input: IInput) => 
    input.id === targetId)

    
return open 
? <OpenFunction 
    functionId={functionId}
    functionConditions={functionConditions}
/>
: <ClosedFunction
    target={target}
    name={name}
    functionConditions={functionConditions}
/>
}

export default Function;