import React from 'react';
import { IConditionContent } from '../../../../types';
import { Button, Dropdown, Grid, Icon, Input, Label, Segment, } from 'semantic-ui-react';
import TargetPicker from '../TargetPicker';
import AnalyzeCondition from '../AnalyzeCondition';

const matchTypes = [
    {
        value: `exact`,
        text: `exact`
    },
    {
        value: `partial`,
        text: `partial`
    },
    {
        value: `any`,
        text: `any`,
    },
    {
        value: `none`,
        text: `none`
    }
]

const Condition = ({
    condition
}: {
    condition: IConditionContent
}) => {
    const { conditionId, target, match, open } = condition;
    const values  = match ? match.values : undefined;

return open 
? (
    <Segment style={{color: 'black'}}>
    <Grid celled columns={2}>
        <Grid.Row>
            <Grid.Column width={3}>
            <TargetPicker conditionId={conditionId}/>
            </Grid.Column>
            <Grid.Column>
            Name: {target && target.name 
                ? target.name
            : `No target`}
            </Grid.Column>
    </Grid.Row>
    <Grid.Row>
        <Grid.Column width={3}>Match Type</Grid.Column>
        <Grid.Column>
        <Dropdown    
        // onChange={(e, {value}) => typeof(value) === 'string' && console.log(value)}
        options={matchTypes}
        placeholder='Select'
        value={match.type}
        />
        </Grid.Column>
    </Grid.Row>
        <ValueEditor values={values} />  
    <Grid.Row>
        <AnalyzeCondition conditionId={conditionId}/>
    </Grid.Row>
    </Grid>
    </Segment>
)
: (
    <React.Fragment>
    <div>Target: {target && target.name 
    ? target.name
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

const ValueEditor = ({values}:{values: string[] | undefined}) => 
<Grid.Row>
<Grid.Column width={3}>
Values
<Button icon onClick={() => console.log(`clicked`)}><Icon name='add'/></Button>
</Grid.Column>
<Grid.Column>
    {values 
    ? values.map((value: string, index: number) => 
        <div key={`valueEditorValue` + index.toString()}>{index + 1}. <Input value={value}/>
        <Label style={{cursor:'pointer'}}><Icon name='delete'/></Label>
        </div>)
    : `No values`}
</Grid.Column>
</Grid.Row>



