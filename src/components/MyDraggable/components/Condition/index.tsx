import React, { useContext } from 'react';
import { IConditionContent } from '../../../../types';
import { Grid, Segment, } from 'semantic-ui-react';
import TargetPicker from '../TargetPicker';
import MatchTypePicker from '../MatchTypePicker';
import ValueEditor from '../ValueEditor';
import { InputContext } from '../../../../services/InputContext';
import { IInput } from '../../../../types';


const Condition = ({
    condition
}: {
    condition: IConditionContent
}) => {
    const { conditionId, target, match, open } = condition;
    const values  = match ? match.values : undefined;
    const { inputs } = useContext(InputContext).state;
    const input = target && inputs.find((input: IInput) => input.id === target.id)
return open 
? (
    <Segment style={{color: 'black'}}>
    <Grid celled columns={2}>
        <Grid.Row>
            <Grid.Column width={3}>
            Target
            </Grid.Column>
            <Grid.Column>
            <TargetPicker conditionId={conditionId}/>
            </Grid.Column>
    </Grid.Row>
    <Grid.Row>
        <Grid.Column width={3}>Match Type</Grid.Column>
        <Grid.Column>
        <MatchTypePicker conditionId={conditionId}/>
        </Grid.Column>
    </Grid.Row>
        <ValueEditor conditionId={conditionId}/>  
    </Grid>
    </Segment>
)
: (
    <React.Fragment>
    <div>Target: {input
    ? input.name
    : `No target`}</div>
    <div>Match Type: {match && match.type && match.type}</div>
    <div>Values: {!!values ? 
    values
    .map((
        value: string, 
        index: number
        ) => 
    <span key={`value` + index.toString()}>
    {value}
    </span>)
    : 'no values'}
    </div> 
    </React.Fragment>) 
}

export default Condition;




