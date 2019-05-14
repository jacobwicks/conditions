import React from 'react';
import { 
    Button,
    Icon
} from 'semantic-ui-react';
import WithInstructions from '../../../WithInstructions';

const _AddFunctionButton = ({
    addFunction
}:{
    addFunction: () => void,
}) => 
<Button icon onClick={() => addFunction()}>
    <Icon name='plus'/>
</Button>

const instruction = `Add new Function.`

const AddFunctionButton = (props: {
    addFunction: () => void,
}) => <WithInstructions child={_AddFunctionButton({...props})} providedContent={instruction}/>

export default AddFunctionButton;