import React, { useContext } from 'react';
import { 
    Button,
    Icon
} from 'semantic-ui-react';
import WithInstructions from '../../../WithInstructions';
import { ExpressionContext } from '../../../../services/ExpressionContext'
const _AddFunctionToExpressionButton = ({
    functionId
}:{
    functionId: string,
}) => {
    const { dispatch } = useContext(ExpressionContext);
    const addToExpression = () => dispatch({
        type: 'insertNew',
        item: {
          itemType: 'function',
          content: {
            functionId
          }
        }
      })
    
    return (
        <Button icon onClick={() => addToExpression()}>
            <Icon name='plus'/>
        </Button>
    )
}

const instruction = `Add this function to expression.`

const AddFunctionToExpressionButton = (props: {
    functionId: string,
}) => <WithInstructions child={_AddFunctionToExpressionButton({...props})} providedContent={instruction}/>

export default AddFunctionToExpressionButton;