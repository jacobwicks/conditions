import React, { useContext } from 'react';
import { ConditionsContext } from '../../services/ConditionsContext';
import { 
    Header,
    Segment 
} from 'semantic-ui-react';
import AddConditionButton from './components/AddConditionButton';
import { ICondition2 } from '../../types';
import Condition from './components/Condition';

const Conditions = () => {
    const  { state, dispatch } = useContext(ConditionsContext);
    const { conditions } = state;
    const namedConditions = conditions.map((condition: ICondition2) => condition.name && condition)
    
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
    .map((condition: ICondition2) => 
   <Condition conditionId={condition.id} />
    )}
</Segment>
)}

export default Conditions;

