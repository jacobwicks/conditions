import React, { useContext} from 'react';
import { ConditionsContext, } from '../../../../services/ConditionsContext';
import { Grid, Button, Icon} from 'semantic-ui-react';
import ValueInput from './components/ValueInput';
import {
    ICondition2
} from '../../../../types';

const ValueEditor = ({conditionId}:{conditionId: string}) => {
    const { dispatch, state } = useContext(ConditionsContext); 
    const { conditions } = state;
    const { values } = conditions.find((condition: ICondition2) => condition.id === conditionId);

return (
<Grid.Row>
<Grid.Column textAlign='right'>
Values <br/>
<Button icon onClick={() => dispatch({type: 'valueAdd', conditionId})}><Icon name='add'/></Button>
</Grid.Column>
<Grid.Column>
    {values 
    ? values.map((value: string, index: number) => 
        <div key={`valueEditorValue` + index.toString()}>{index + 1}. 
        <ValueInput
        key={`valueInput` + value} 
        dispatch={dispatch}
        conditionId={conditionId}
        value={value}
        index={index}
        />
        </div>)
    : `No values`}
</Grid.Column>
</Grid.Row>
    )
} 

export default ValueEditor;

