import React, { Fragment, useContext, useState } from 'react';
import { Button, Grid, Icon, Header, Input, Segment } from 'semantic-ui-react';
import { InputContext } from '../../services/InputContext';


const Inputs = () => {
    const { dispatch } = useContext(InputContext);
    const { inputs } = useContext(InputContext).state;
    
return <Segment>
    <Header as='h2'>Inputs</Header>
    <Button icon onClick={() => dispatch({type: 'new'})}><Icon name='plus'/></Button>
    <br/><br/>
    <Grid celled columns={2}>
    {inputs
.map((
    input:any, 
    index: number
    ) =>
    <Grid.Row key={`input${index}`}>
    <Grid.Column style={{'textAlign':'right'}}>
    <InputName input={input} index={index}/>
    </Grid.Column>
    <Grid.Column style={{'textAlign':'left'}}> 
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
    </Grid.Column>
    </Grid.Row>
    )}
 </Grid>
</Segment>
}
export default Inputs;

const InputName = ({input, index}:{input:any, index:number}) =>{
    const { dispatch } = useContext(InputContext);
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState(input.name);
    const handleBlur = (value:string) => {
        setOpen(false);
        dispatch({type: 'rename', name: value, index})
    }
    return open
    ?   <Fragment>
    <Button icon onClick={() => setOpen(!open)}><Icon name='edit'/></Button>
    <Input 
    onKeyPress={({key}:{key: string}) => {
        if (key === 'Enter') {
             //@ts-ignore
            !!temp && handleBlur(temp)
        }
    }}
     value={temp}
     onChange={(e) => setTemp(e.target.value)}
     onBlur={(e: any) => handleBlur(e.target.value)}

    />
    </Fragment>
    : <Fragment>
        <Button icon onClick={() => setOpen(!open)}><Icon name='edit'/></Button>
        {input.name}:
        </Fragment>
}

