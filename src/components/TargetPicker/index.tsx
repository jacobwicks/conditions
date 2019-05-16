import React, { 
    useContext 
} from 'react';
import { InputContext, } from '../../services/InputContext';
import { FunctionsContext } from '../../services/FunctionsContext';
import Picker from '../Picker';
import { IInput, IFunction } from '../../types';

const TargetPicker = ({
    functionId,
}: {
    functionId ?: string
}) => {
    const { dispatch, state } = useContext(FunctionsContext);
    const { functions } = state;
    const { inputs } = useContext(InputContext).state;
    const thisFunction = functions.find((item: IFunction) => item.id === functionId);
    const targetId = thisFunction && thisFunction.target;

    const text = targetId 
    ? inputs.find((input: IInput) => input.id === targetId).name 
    : `no target`

    const options = inputs.map((input: IInput) => {
        const { name, id } = input;
        return {
            key: name,
            text: name,
            value: id
        }
    })
    
    const handleChange = (targetId: string) => 
     dispatch({
        type: 'targetSelect',
        functionId,
        targetId
    })

    const handleClear = () =>
     dispatch({
        type: 'targetSelect', 
        functionId,
        targetId: undefined
        })

    return   (
    <Picker
        handleChange={handleChange}
        handleClear={handleClear}
        options={options}
        text={text}
      />
)}

export default TargetPicker;
