import React, { useContext } from 'react';
import { 
    Header,
    Segment 
} from 'semantic-ui-react';
import { FunctionsContext } from '../../services/FunctionsContext';
import { IFunction } from '../../types';
import Function from './components/Function';
import AddFunctionButton from './components/AddFunctionButton';

const Functions = () => {
    const { state, dispatch } = useContext(FunctionsContext);
    const { functions } = state;

    return(
    <Segment>
        <Header>
            Functions
        </Header>
        <AddFunctionButton addFunction={() => dispatch({type: 'new'})}/>
        {functions.map((thisFunction: IFunction) => <Function functionId={thisFunction.id}/>)}
    </Segment>
    )
}

export default Functions;



