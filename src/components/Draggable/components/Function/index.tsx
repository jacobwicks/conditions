import React, { useContext } from 'react';
import { IFunctionContent } from '../../../../types';
import { Grid, Segment, } from 'semantic-ui-react';
import TargetPicker from '../../../TargetPicker';
import { InputContext } from '../../../../services/InputContext';
import { IInput, IFunction, ICondition2 } from '../../../../types';
import { FunctionsContext } from '../../../../services/FunctionsContext';
import { ConditionsContext } from '../../../../services/ConditionsContext';


const Function = ({
    thisFunction
}: {
    thisFunction: IFunctionContent
}) => {
    const { functionId, open } = thisFunction;
    //const values  = match ? match.values : undefined;
    const { conditions } = useContext(ConditionsContext).state;  
    const { inputs } = useContext(InputContext).state;
    const { functions } = useContext(FunctionsContext).state
    const targetFunction = functions && functions.find((fn: IFunction) => fn.id = functionId);
    const { target, conditions: targetConditions, name } = targetFunction || { name: undefined, target: `1`, conditions: []};
    const input = target && inputs.find((input: IInput) => input.id === target.id)

    
return open 
? (
    <Segment style={{
        color: 'black',
        maxWidth: 500
        }}>
    {name ? name : `Anonymous Function`}
    <Grid celled columns={2}>
        <Grid.Row>
            <Grid.Column width={3}>
            Target
            </Grid.Column>
            <Grid.Column>
                <div>functionId: {functionId}</div>
            <TargetPicker functionId={functionId}/>
            </Grid.Column>
    </Grid.Row>
    <Grid.Row>
        <Grid.Column width={3}>Conditions</Grid.Column>
        <Grid.Column>
        Conditions displayed here
        {targetConditions.map((condition: string) => <div>{condition}</div>)}
        </Grid.Column>
    </Grid.Row>
        Nothing here  
    </Grid>
    </Segment>
)
: (
    <React.Fragment>
    <div>{name ? name : `Anonymous Function`}</div>
    <div>Target: {input
    ? input.name
    : `No target`}</div>
    <div>Conditions: {targetConditions 
    ? targetConditions
    .map((
        conditionId: string, 
        index: number
        ) => {
            if (index < 5) {
            return <div key={`value` + index.toString()}>
                {conditions.find((condition: ICondition2) => condition.id === conditionId).name}
            </div>
            }
            if (index === 5) {
                return <div key={`value` + index.toString()}>...</div>
            }
            return null; 
        }) 
    : 'No conditions assigned to this function'}
    </div> 
    </React.Fragment>) 
}

export default Function;




