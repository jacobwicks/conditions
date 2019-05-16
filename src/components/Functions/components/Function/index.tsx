import React, {useContext} from 'react';
import { ConditionsContext } from '../../../../services/ConditionsContext';
import { FunctionsContext } from '../../../../services/FunctionsContext';
import { IFunction } from '../../../../types';
import {
    Grid,
    Segment,
    Label,
} from 'semantic-ui-react';
import TargetPicker from '../../../TargetPicker';
import ConditionsPicker from '../../../ConditionsPicker';
import { ICondition2 } from '../../../../types';
import FunctionName from '../../../FunctionName';
import DeleteFunctionButton from '../DeleteFunctionButton';
import AddFunctionToExpressionButton from '../AddFunctionToExpressionButton';

const Function = ({
    functionId
}:{
    functionId: string
}) => {
    const { conditions } = useContext(ConditionsContext).state;
    const { dispatch, state } = useContext(FunctionsContext);
    const { functions } = state;
    const thisFunction = functions.find((item: IFunction) => item.id === functionId);
    const conditionsInFunction = thisFunction.conditions; 

    const removeConditionFromFunction = (conditionId: string) => dispatch({
        type: 'removeCondition',
        conditionId,
        functionId
    });

    return (
<Segment color='blue'>
    <DeleteFunctionButton deleteFunction={() => dispatch({type: 'delete', functionId})} />
    <FunctionName functionId={functionId}/>
    <AddFunctionToExpressionButton functionId={functionId} />
    <Grid celled columns={2}>
        <Grid.Row>
            <Grid.Column textAlign='right'>
                Target
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <TargetPicker functionId={functionId}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                Conditions
            </Grid.Column>
            <Grid.Column>
            {conditionsInFunction && conditionsInFunction
            .map((conditionId: string) => {
                const { name } = conditions
                .find((condition: ICondition2) => 
                condition.id === conditionId)

                return <div>
                {<Label onDoubleClick={() => removeConditionFromFunction(conditionId)}>{name}</Label>}
                </div>
            })}
            <ConditionsPicker functionId={functionId}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
</Segment>
    )
}

export default Function;