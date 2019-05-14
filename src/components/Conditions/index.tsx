import React, { useContext } from 'react';
import { ConditionsContext, ICondition2 } from '../../services/ConditionsContext';
import ValueEditor from './components/ValueEditor';
import ConditionName from './components/ConditionName';
import { 
    Button,
    Grid,
    Header,
    Icon,
    Segment 
} from 'semantic-ui-react';
import WithInstructions from '../WithInstructions';
import EvaluatorPicker from './components/EvaluatorPicker';

const AddConditionButton = ({
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

const DeleteConditionButton = ({
    deleteCondition
}:{
    deleteCondition: () => void,
}) => {
    const child = 
    <Button icon 
    floated='right'
    onClick={() => deleteCondition()}>
    <Icon name='minus'/>
    </Button>

return <WithInstructions child={child} type={'deleteCondition'} />
}

const Conditions = () => {
    const  { state, dispatch } = useContext(ConditionsContext);
    const { conditions } = state;
    const namedConditions = conditions.map((condition: ICondition2) => condition.name && condition)
    console.log(namedConditions);
    
return (
    <Segment>
    <Header>
        Conditions
    </Header>
    <AddConditionButton 
        dispatch={dispatch}
    />
         <br/><br/>
    {namedConditions
    .map((
        condition: ICondition2, 
        index: number
        ) => 
   <Condition conditionId={condition.id} />
    )}
</Segment>
)}

export default Conditions;

const Condition = ({
    conditionId
}:{
    conditionId: string
}) => {
    const { dispatch, state } = useContext(ConditionsContext)
    const { conditions } = state;
    const condition = conditions.find((condition: ICondition2) => condition.id === conditionId);
    return (
<Segment>
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
