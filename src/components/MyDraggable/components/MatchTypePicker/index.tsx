import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { ItemContext } from '../../../../services/ItemContext';
import { matchTypes } from '../../../../types';

const TargetPicker = ({conditionId}: {conditionId: string}) => {
    const { dispatch } = useContext(ItemContext);
    const { items } = useContext(ItemContext).state;
    const matchType = items.find((item: any) => item.content.conditionId === conditionId).content.match.type;
    const text = matchType 
    ? matchType 
    : `no selection made`

    const options = Object.keys(matchTypes).map((matchType: string) => {
        return {
            key: matchType,
            text: matchType,
            value: matchType
        }
    })

    return   (
        <Dropdown
        onChange={(e, {value}) => typeof(value) === 'string' && dispatch({
            type: 'matchTypeSelect',
            conditionId,
            matchType: value
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

