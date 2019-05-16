import React, { 
    Fragment, 
    useContext, 
    useState 
} from 'react';
import { FunctionsContext } from '../../services/FunctionsContext';
import { 
    Button,
    Icon,
    Input
} from 'semantic-ui-react';
import { IFunction } from '../../types';
import WithInstructions from '../WithInstructions';

const _FunctionName = ({
    functionId
}:{
    functionId: string
}) => {
const { dispatch, state } = useContext(FunctionsContext);
const thisFunction = state.functions.find((item: IFunction) => item.id === functionId);
const [open, setOpen] = useState(false);
const [temp, setTemp] = useState(thisFunction.name);

const handleBlur = (value:string) => {
    setOpen(false);
    dispatch({type: 'rename', name: value, functionId})
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
: <div>
    <Button icon onClick={() => setOpen(!open)}><Icon name='edit'/></Button>
    {thisFunction.name ? thisFunction.name : `Anonymous Function`}
    </div>
}

const FunctionName = (props: {
    functionId: string}) => 
<WithInstructions child={_FunctionName({...props})} type={'editConditionName'}/>

export default FunctionName;