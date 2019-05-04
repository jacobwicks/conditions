import React, { 
    Fragment, 
    useContext 
} from 'react';
import {
    Button,
    Dropdown,
    Icon,
 } from 'semantic-ui-react';
import { InputContext, } from '../../../../services/InputContext';
import { ExpressionContext } from '../../../../services/ExpressionContext';
import { 
    ICondition, 
    IInput,
    IOperator,
    IParenthesis
 } from '../../../../types';

const TargetPicker = ({conditionId}: {conditionId: string}) => {
    const { dispatch } = useContext(ExpressionContext);
    const { expression } = useContext(ExpressionContext).state;
    const { inputs } = useContext(InputContext).state;
    const targetId = expression.find((item: ICondition | IParenthesis |IOperator) => {
        if (item.itemType === 'condition') {
            if (item.content.conditionId === conditionId) {
                return true
            } else return false;
        } else return false;             
}).content.target.id;
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

    return   (
        <Fragment>
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
      <Button onClick={() => dispatch({
        type: 'targetSelect', 
        conditionId,
        targetId: undefined
        })}
        icon><Icon name='delete'/></Button>
    </Fragment>
)}

export default TargetPicker;

