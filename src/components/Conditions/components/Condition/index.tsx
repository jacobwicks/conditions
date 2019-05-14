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

const Condition = ({
    conditionId
}:{
    conditionId: string
}) => {
    const { dispatch } = useContext(ConditionsContext)
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
        <ValueEditor conditionId={conditionId}/>
    </Grid>
</Segment>
    )
}

export default Condition;