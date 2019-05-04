import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { InputContext, } from '../../../../services/InputContext';
import { ItemContext } from '../../../../services/ItemContext';
import { IInput } from '../../../../types';

const TargetPicker = ({conditionId}: {conditionId: string}) => {
    const { dispatch } = useContext(ItemContext);
    const { items } = useContext(ItemContext).state;
    const { inputs } = useContext(InputContext).state;
    const targetId = items.find((item: any) => item.content.conditionId === conditionId).content.target.id;
    const text = targetId 
    ? inputs.find((input: IInput) => input.id === targetId).name 
    : `no target`

    const options = inputs.map((input: any) => {
        const { name, id } = input;
        return {
            key: name,
            text: name,
            value: id
        }
    })

    return   (
        <Dropdown
        onChange={(e, {value}) => typeof(value) === 'string' && dispatch({
            type: 'targetSelect',
            conditionId,
            targetId: value
        })}
        button
        floating
        labeled
        options={options}
        search
        text={text}
      />
)}

export default TargetPicker;

