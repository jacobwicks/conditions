import React, { useContext } from 'react';
import { Button, Icon, Header, Input, Segment } from 'semantic-ui-react';
import { InputContext } from '../../services/InputContext';


const Inputs = () => {
    const { dispatch } = useContext(InputContext);
    const { inputs } = useContext(InputContext).state;
    
return <Segment>
    <Header as='h2'>Inputs</Header>
    <Button icon onClick={() => dispatch({type: 'new'})}><Icon name='plus'/></Button>
    <br/><br/>
    {inputs
.map((
    input:any, 
    index: number
    ) =>
    <div key={`input${index}`}>{
        input.name}: 
        <Input 
        onBlur={({target}: {target: any}) => 
        dispatch({
            type: 'save', 
            index, 
            value: target.value
            })}/> 
            <Button icon 
            onClick={() => 
            dispatch({
                type:'delete', 
                index
                })}>
                <Icon name='minus'/>
                </Button>
        </div>
    )}
 
</Segment>
}
export default Inputs;
// import React, { useContext } from 'react';
// import { Button, Icon, Header, Input, Segment } from 'semantic-ui-react';
// import { InputContext } from '../../services/InputContext';

// const Inputs = () => {
// const { dispatch, inputs } = useContext(InputContext);
// return <Segment>
//     <Header as='h2'>Inputs</Header>
//     <Button icon onClick={() => dispatch({type: 'new'})}><Icon name='plus'/></Button>
//     <br/><br/>
// {inputs
// .map((
//     input:any, 
//     index: number
//     ) =>
//     <div key={`input${index}`}>{
//         input.name}: <Input/> <Button icon><Icon name='minus'/></Button>
//         </div>
//     )}
// </Segment>
// }
// export default Inputs;