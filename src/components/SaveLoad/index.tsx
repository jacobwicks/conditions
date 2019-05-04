import React, { useContext } from 'react';
import { Button, Checkbox, Label, Segment } from 'semantic-ui-react';
import InstructionsModal from '../InstructionsModal';
import { InstructionsContext } from '../../services/InstructionsContext';

const SaveLoad = () => {
    const {state, dispatch} = useContext(InstructionsContext);
    const { instructions } = state;

    return(
    <Segment>
    <Button onClick={() => dispatch({type: 'toggle'})}>
    Helpful popups: <Checkbox checked={instructions}/>
    </Button>
        <InstructionsModal />
        <Button>Save</Button>
        <Button>Load</Button>
        <Button>Example 1</Button>
        <Button>Example 2</Button>
        <Button>Example 3</Button>
    </Segment>
    )
}

export default SaveLoad;