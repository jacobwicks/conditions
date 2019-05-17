import React, { useContext, useState } from 'react';
import { ICondition2 } from '../../../../../../../../types';
import { 
    Label,
    Modal
} from 'semantic-ui-react';
import Condition from '../../../../../../../Conditions/components/Condition';
import { ConditionsContext } from '../../../../../../../../services/ConditionsContext'
import { FunctionsContext } from '../../../../../../../../services/FunctionsContext'
import { InputContext } from '../../../../../../../../services/InputContext';
import { conditionValue } from '../../../../../../../../services/ConditionValue';



const ConditionLabel = ({
    condition,
    functionId,
}:{
    condition: ICondition2,
    functionId: string,
}) => {
    const [open, setOpen] = useState(false);
    const { conditions } = useContext(ConditionsContext).state;
    const { inputs } = useContext(InputContext).state;
    const { functions } = useContext(FunctionsContext).state;    
    
    const { name, id: conditionId } = condition;
    const getColor = () => {
        const value = conditionValue({
            conditionId,
            functionId,
            conditions,
            inputs,
            functions
        })

        if (value === true) {
            return 'green'
        } else if (value === false) {
            return 'red'
        } else return 'grey'
    }

return (
<div key={'label' + condition.id + functionId} style={{cursor:'pointer'}}>
            <Label color={getColor()} onDoubleClick={() => setOpen(true)}>
            {name ? name : `Anonymous condition`}
            </Label>
            <Modal open={open} onClose={() => setOpen(false)} closeIcon>
                <Condition conditionId={condition.id}/>
            </Modal>
            </div>
)}

export default ConditionLabel;