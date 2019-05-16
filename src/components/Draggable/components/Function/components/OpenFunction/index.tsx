import React, { useContext, useState} from 'react';
import { ConditionsContext } from '../../../../../../services/ConditionsContext';
import { FunctionsContext } from '../../../../../../services/FunctionsContext';
import { Button, Icon, Grid, Label, Modal, Segment } from 'semantic-ui-react';
import TargetPicker from '../../../../../TargetPicker';
import { ICondition2 } from '../../../../../../types';
import ConditionsPicker from '../../../../../ConditionsPicker';
import Condition from '../../../../../Conditions/components/Condition';
import uuidv4 from 'uuid';
import FunctionName from '../../../../../FunctionName';
import ConditionLabel from './components/ConditionLabel';

const OpenFunction = ({
    functionId,
    functionConditions,
}:{
    functionId: string,
    functionConditions: string[],
}) => {
    const { dispatch, state } = useContext(ConditionsContext);
    const { conditions } = state;
    const functionsDispatch = useContext(FunctionsContext).dispatch;

    const createNewCondition = () => {
        const id = uuidv4();
        dispatch({
            type: 'new',
            id
        })
        functionsDispatch({
          type: 'conditionAdd',
          conditionId : id,
          functionId
        });
    }

    const removeConditionFromFunction = (conditionId: string) => functionsDispatch({
        type: 'removeCondition',
        conditionId,
        functionId
    }); 

    return (
<Segment style={{
    color: 'black',
    maxWidth: 500
    }}>
<FunctionName functionId={functionId}/>
<Grid celled columns={2}>
    <Grid.Row>
        <Grid.Column width={3}>
        Target
        </Grid.Column>
        <Grid.Column>
        <TargetPicker functionId={functionId}/>
        </Grid.Column>
</Grid.Row>
<Grid.Row>
    <Grid.Column width={3}>
        Conditions
        <Button icon onClick={() => createNewCondition()}><Icon name='add' /></Button>
    </Grid.Column>
    <Grid.Column>
        <Grid.Row>
    {(!functionConditions || !(!!functionConditions.length)) && `No Conditions in this function`}
    </Grid.Row>
    <Grid.Row>
    <ConditionsPicker functionId={functionId} />
    </Grid.Row>
    <Grid.Row>
    {functionConditions.map((conditionId: string) => {
        const condition = conditions.find((condition: ICondition2) => condition.id === conditionId)
        return <ConditionLabel 
        key={`conditionLabel${condition.id}`} 
        condition={condition}
        functionId={functionId} 
        remove={() => removeConditionFromFunction(conditionId)}/> 
    })}
    </Grid.Row>
    </Grid.Column>
    </Grid.Row>
    </Grid>
</Segment>
)}

export default OpenFunction;


