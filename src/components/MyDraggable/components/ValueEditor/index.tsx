import React, { useContext} from 'react';
import { ItemContext } from '../../../../services/ItemContext';
import { Grid, Button, Icon} from 'semantic-ui-react';
import ValueInput from './components/ValueInput';

const ValueEditor = ({conditionId}:{conditionId: string}) => {
    const { dispatch } = useContext(ItemContext); 
    const { items } = useContext(ItemContext).state;
    const { values } = items.find((item: any) => item.content.conditionId === conditionId).content.match;

return (
<Grid.Row>
<Grid.Column width={3}>
Values
<Button icon onClick={() => dispatch({type: 'addValue', conditionId})}><Icon name='add'/></Button>
</Grid.Column>
<Grid.Column>
    {values 
    ? values.map((value: string, index: number) => 
        <div key={`valueEditorValue` + index.toString()}>{index + 1}. 
        <ValueInput 
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

