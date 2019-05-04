import React, { useContext } from 'react';
import { 
    Button, 
    Grid, 
    Icon, 
    Header, 
    Input, 
    Segment 
} from 'semantic-ui-react';
import { InputContext } from '../../services/InputContext';
import { ExpressionContext } from '../../services/ExpressionContext';
import { IInput } from '../../types';
import InputName from './components/InputName';

const Inputs = () => {
    const { dispatch } = useContext(InputContext);
    const { inputs } = useContext(InputContext).state;
    const expressionDispatch = useContext(ExpressionContext).dispatch;

return <Segment>
    <Header as='h2'>Inputs</Header>
    <Button icon onClick={() => dispatch({type: 'new'})}><Icon name='plus'/></Button>
    <br/><br/>
    <Grid celled columns={2}>
    {inputs
.map((
    input: IInput, 
    index: number
    ) =>
    <Grid.Row key={`inputRow${index}`}>
    <Grid.Column style={{'textAlign':'right'}}>
    <InputName input={input} index={index}/>
    </Grid.Column>
    <Grid.Column style={{'textAlign':'left'}}> 
        <Input 
        value={input.value}
        key={`inputFor${input.id}`}
        onChange={(e:any, {value}: {value: string}) => dispatch({
            type: 'save',
            index,
            value
        })}
        />
        <Button icon 
        onClick={() => {
            expressionDispatch({
                type: 'deleteTarget',
                id: input.id
            })    
            dispatch({
                type:'delete', 
                index
                })}
        }>
                <Icon name='minus'/>
                </Button>
    </Grid.Column>
    </Grid.Row>
    )}
 </Grid>
</Segment>
}

export default Inputs;

