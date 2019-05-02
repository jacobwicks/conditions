import React, { useContext } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import { InputContext, } from '../../../../services/InputContext';
import { ItemContext } from '../../../../services/ItemContext';

const TargetPicker = ({conditionId}: {conditionId: string}) => {
    const { dispatch } = useContext(ItemContext);
    const { inputs } = useContext(InputContext).state;
    const options = inputs.map((input: any) => {
        const { name } = input;
        return {
            key: name,
            text: name,
            value: name
        }
    })

    return   (
        <Dropdown
        onChange={(e, {value}) => typeof(value) === 'string' && dispatch({
            type: 'targetSelect',
            conditionId,
            name: value
        })}
        button
        className='icon'
        floating
        labeled
        icon='target'
        options={options}
        search
        text='Target'
      />
)}

export default TargetPicker;

