import React, { 
    Fragment, 
    useContext, 
    useState 
} from 'react';
import { ConditionsContext } from '../../../../services/ConditionsContext';
import { 
    Button,
    Icon,
    Input
} from 'semantic-ui-react';
import { ICondition2 } from '../../../../types';
import WithInstructions from '../../../WithInstructions';

const _ConditionName = ({
    conditionId
}:{
    conditionId: string
}) => {
const { dispatch, state } = useContext(ConditionsContext);
const condition = state.conditions.find((item: ICondition2) => item.id === conditionId);
const [open, setOpen] = useState(false);
const [temp, setTemp] = useState(condition.name);

const handleBlur = (value:string) => {
    setOpen(false);
    console.log(`renaming to ${value}`)
    dispatch({type: 'rename', name: value, conditionId})
}

return open
?   <Fragment>
    <Button icon onClick={() => setOpen(!open)}><Icon name='edit'/></Button>
        <Input 
        onKeyPress={({key}:{key: string}) => {
            if (key === 'Enter') {
                    
                !!temp && handleBlur(temp)
            }
        }}
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            onBlur={(e: any) => handleBlur(e.target.value)}

        />
    </Fragment>
: <span>
    <Button icon onClick={() => setOpen(!open)}><Icon name='edit'/></Button>
    {condition.name ? condition.name : `Anonymous Condition`}
    </span>
}

const ConditionName = (props: {
    conditionId: string}) => 
<WithInstructions child={_ConditionName({...props})} type={'editConditionName'}/>

export default ConditionName;