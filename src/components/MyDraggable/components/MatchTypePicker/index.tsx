import React, { Fragment, useContext } from 'react';
import { 
    Button,
    Dropdown,
    Icon
 } from 'semantic-ui-react';
import { ExpressionContext } from '../../../../services/ExpressionContext';
import { matchTypes } from '../../../../types';
import { 
    ICondition, 
    IParenthesis, 
    IOperator 
} from '../../../../types';

const TargetPicker = ({
    conditionId
}: {
    conditionId: string
}) => {
    const { dispatch } = useContext(ExpressionContext);
    const { expression } = useContext(ExpressionContext).state;
    const matchType = expression.find((item: ICondition | IParenthesis |IOperator) => {
            if (item.itemType === 'condition') {
                if (item.content.conditionId === conditionId) {
                    return true
                } else return false;
            } else return false;             
    }).content.match.type;
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
        <Fragment>
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
      <Button onClick={() => dispatch({
          type: 'matchTypeSelect', 
          conditionId,
          matchType: undefined
          })}
          icon><Icon name='delete'/></Button>
      </Fragment>
)}

export default TargetPicker;

