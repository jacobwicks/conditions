import React, { useContext } from 'react';
import { ConditionsContext } from '../../../../services/ConditionsContext';
import {
    Grid,
    Segment
} from 'semantic-ui-react';
import ConditionName from '../ConditionName';
import DeleteConditionButton from '../DeleteConditionButon';
import EvaluatorPicker from '../EvaluatorPicker';
import ValueEditor from '../ValueEditor';
import { ICondition2 } from '../../../../types';

const Condition = ({
    conditionId
}:{
    conditionId: string
}) => {
    const { dispatch, state } = useContext(ConditionsContext)
    const { evaluator } = state.conditions.find((condition : ICondition2) => condition.id === conditionId) 
    const hideValues = evaluator === 'noResponse' || evaluator === 'anyResponse';
    return (
<Segment color='yellow'>
    <ConditionName conditionId={conditionId}/>
    <DeleteConditionButton deleteCondition={() => dispatch({type: 'delete', conditionId})}/> 
    <br/>
    <Grid celled columns={2}>
        <Grid.Row>
            <Grid.Column textAlign='right'>
                Evaluator
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <EvaluatorPicker conditionId={conditionId}/>
            </Grid.Column>
        </Grid.Row>
        {!hideValues && <ValueEditor conditionId={conditionId}/>}
    </Grid>
</Segment>
    )
}

export default Condition;