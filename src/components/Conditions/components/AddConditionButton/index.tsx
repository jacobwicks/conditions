import React, {Fragment} from 'react';
import {
    Button,
    Icon,
} from 'semantic-ui-react';
import WithInstructions from '../../../WithInstructions';

const _AddConditionButton = ({
    dispatch
}:{
    dispatch: ({type}: {type: string}) => void,
}) => 
<Button icon onClick={() => dispatch({type: 'new'})}>
    <Icon name='plus'/>
</Button>


const providedContent =
<Fragment>
<p>Adds a new condition.</p>
</Fragment>

const AddConditionButton = (props: {
    dispatch: ({type}: {type: string}) => void,
}) => 
<WithInstructions child={_AddConditionButton({...props})} providedContent={providedContent} />


export default AddConditionButton;