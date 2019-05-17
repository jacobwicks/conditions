import React, { useContext } from 'react';
import { ConditionsContext } from '../../../../../../services/ConditionsContext';
import { FunctionsContext } from '../../../../../../services/FunctionsContext';
import { Button, Icon, Grid, Segment } from 'semantic-ui-react';
import TargetPicker from '../../../../../TargetPicker';
import ConditionsPicker from '../../../../../ConditionsPicker';
import uuidv4 from 'uuid';
import FunctionName from '../../../../../FunctionName';
import ConditionsGrid from './components/ConditionsGrid';

const OpenFunction = ({
    functionId,
    functionConditions,
}:{
    functionId: string,
    functionConditions: string[],
}) => {
    const conditionsDispatch = useContext(ConditionsContext).dispatch;
    const functionsDispatch = useContext(FunctionsContext).dispatch;

    const createNewCondition = () => {
        const id = uuidv4();
        conditionsDispatch({
            type: 'new',
            id
        })
        functionsDispatch({
          type: 'conditionAdd',
          conditionId : id,
          functionId
        });
    }

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
        <Segment>
    <ConditionsPicker functionId={functionId} />
    </Segment>
    </Grid.Row>
    <Grid.Row>
        <ConditionsGrid conditionIds={functionConditions} functionId={functionId}/>
    </Grid.Row>
    </Grid.Column>
    </Grid.Row>
    </Grid>
</Segment>
)}

export default OpenFunction;
