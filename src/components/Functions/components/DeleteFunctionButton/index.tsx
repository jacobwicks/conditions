import React from 'react';
import {
    Button,
    Icon
} from 'semantic-ui-react';
import WithInstructions from '../../../WithInstructions';

const _DeleteFunctionButton = ({
    deleteFunction
}:{
    deleteFunction: () => void,
}) => 
<Button icon 
floated='right'
onClick={() => deleteFunction()}>
<Icon name='minus'/>
</Button>

const instruction = `Delete this Function.`

const DeleteFunctionButton = (props: {
    deleteFunction: () => void,
}) => <WithInstructions child={_DeleteFunctionButton({...props})}  providedContent={instruction} />

export default DeleteFunctionButton;