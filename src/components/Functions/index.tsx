import React, { useContext } from 'react';
import { 
    Button,
    Grid,
    Header,
    Icon,
    Segment 
} from 'semantic-ui-react';
import WithInstructions from '../WithInstructions';
import { FunctionsContext, IFunction } from '../../services/FunctionsContext';
import { ConditionsContext, ICondition2 } from '../../services/ConditionsContext';
import TargetPicker from './components/TargetPicker';
import ConditionsPicker from './components/ConditionsPicker';

const AddFunctionButton = ({
    dispatch
}:{
    dispatch: ({type}: {type: string}) => void,
}) => 
<WithInstructions 
    child={
        <Button icon onClick={() => dispatch({type: 'new'})}>
        <Icon name='plus'/>
        </Button>} 
    type={'addCondition'} 
/>

const Functions = () => {
    const { state, dispatch } = useContext(FunctionsContext);
    const { functions } = state;

    return(
    <Segment>
        <Header>
            Functions
        </Header>
        <AddFunctionButton dispatch={dispatch}/>
        {functions.map((thisFunction: IFunction) => <Function functionId={thisFunction.id}/>)}
    </Segment>
    )
}

export default Functions;


const Function = ({
    functionId
}:{
    functionId: string
}) => {
    const { conditions } = useContext(ConditionsContext).state;
    const { functions } = useContext(FunctionsContext).state;
    const thisFunction = functions.find((item: IFunction) => item.id === functionId);
    const conditionsInFunction = thisFunction.conditions; 
    return (
<Segment>
    Name: {thisFunction.name ? thisFunction.name : 'Anonymous Function'} <br/>
    <Grid celled columns={2}>
        <Grid.Row>
            <Grid.Column textAlign='right'>
                Target
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <TargetPicker functionId={functionId}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
            Conditions
            </Grid.Column>
            <Grid.Column>
            {conditionsInFunction && conditionsInFunction
            .map((conditionId: string) => 
            <div>
            {conditions
                .find((condition: ICondition2) => 
                condition.id === conditionId)
                .name}
            </div>)}
            <ConditionsPicker functionId={functionId}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
</Segment>
    )
}
