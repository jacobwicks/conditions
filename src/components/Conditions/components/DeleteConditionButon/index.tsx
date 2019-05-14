import React from 'react';
import {
    Button,
    Icon
} from 'semantic-ui-react';
import WithInstructions from '../../../WithInstructions';

const _DeleteConditionButton = ({
    deleteCondition
}:{
    deleteCondition: () => void,
}) => 
<Button icon 
floated='right'
onClick={() => deleteCondition()}>
<Icon name='minus'/>
</Button>

const instruction = `Delete this condition.`

const DeleteConditionButton = (props: {
    deleteCondition: () => void,
}) => <WithInstructions child={_DeleteConditionButton({...props})}  providedContent={instruction} />

export default DeleteConditionButton;