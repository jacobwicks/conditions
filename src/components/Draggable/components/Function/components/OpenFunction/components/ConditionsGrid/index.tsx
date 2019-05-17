import React, { useContext } from 'react';
import { ConditionsContext } from '../../../../../../../../services/ConditionsContext';
import { FunctionsContext } from '../../../../../../../../services/FunctionsContext';
import { ICondition2 } from '../../../../../../../../types'; 
import { 
    Grid,
    Icon
} from 'semantic-ui-react';
import ConditionLabel from '../ConditionLabel';

const ConditionsGrid = ({
    conditionIds,
    functionId
}: {
    conditionIds: string[],
    functionId: string
}) => {
    const { conditions } = useContext(ConditionsContext).state;
    const { dispatch } = useContext(FunctionsContext);

    const removeConditionFromFunction = (conditionId: string) => 
    dispatch({
        type: 'removeCondition',
        conditionId,
        functionId
    }); 

    return (
        <Grid>
        {conditionIds.map((conditionId: string) => {
            const condition = conditions.find((condition: ICondition2) => condition.id === conditionId)
            return (
            <Grid.Row key={`conditionGridRow${functionId}${conditionId}`}>
                <Grid.Column>
                    <Icon style={{cursor:'pointer'}} name='delete' onClick={() => removeConditionFromFunction(conditionId)}/> 
                </Grid.Column>
                <Grid.Column width={8}>
                    <ConditionLabel 
                        condition={condition}
                        functionId={functionId}
                        />
                </Grid.Column>
            </Grid.Row>
            )}
        )}
        </Grid>
    )
}     

export default ConditionsGrid;