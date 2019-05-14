import React, { useContext, Fragment } from 'react';
import { 
    ConditionsContext, 
    ICondition2,
    responseEvaluators,
    mathEvaluators,
    searchEvaluators
} from '../../../../services/ConditionsContext';
import {
    Button,
    Dropdown,
    Icon
} from 'semantic-ui-react';


interface IOption {
    key: string,
    text: string,
    value: string
}

const getText : { [key: string] : string} = {
    exact: 'Exact',
    partial: 'Partial',
    partialInclusive: 'Inclusive',
    any: 'Any value',
    none: 'No value'
}

const EvaluatorPicker = ({
    conditionId
}: {
    conditionId?: string
}) => {
    const { dispatch, state } = useContext(ConditionsContext);
    const { conditions } = state;
    const evaluator = conditions.find((condition: ICondition2) => condition.id === conditionId).evaluator;  
    const text = evaluator 
    ? getText[evaluator] || evaluator 
    : `no selection made`

    const optionsFrom = (evaluators: any) =>  Object
    .keys(evaluators)
        .map(item => 
        <Dropdown.Item
        key={item}
        onClick={() => handleChange(item)}
        >
            {item}
        </Dropdown.Item>
        )


    // const explanation : { [key: string] : string} = {
    //     anyResponse: 'Any value entered in target',
    //     noResponse: 'No value entered in target',
    //     exact: 'Target value must exactly match one of the provided values (case insensitive).',
    //     partial: 'Whole target value must partially match at least one of the provided values.',
    //     inclusive: 'Part of target value must partially or completely match at least one of the provided values.',
    //     equals: 'Target value is equal to one of the provided values',

    // }

    const handleChange = (evaluator: string) => 
      dispatch({
            type: 'evaluatorSelect',
            conditionId,
            evaluator
        })

    const handleClear = () =>
    dispatch({
        type: 'evaluatorSelect', 
        conditionId,
        evaluator: undefined
        })

    return   (
    <Fragment>
    <Dropdown 
     text={text}
     >
    <Dropdown.Menu>
      <Dropdown.Header content='Response' />
      <Dropdown.Divider />
        {optionsFrom(responseEvaluators)}
      <Dropdown.Divider />
            <Dropdown.Header content='Search' />
      <Dropdown.Divider />
      {optionsFrom(searchEvaluators)}
      <Dropdown.Item onClick={() => console.log(`clicked`)}>Announcement</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header content='Math' />
      <Dropdown.Divider />
      {optionsFrom(mathEvaluators)}
    </Dropdown.Menu>
  </Dropdown>
  <Button 
    onClick={() => handleClear()}
    icon>
    <Icon name='delete'/>
    </Button>
</Fragment>
)}

export default EvaluatorPicker;




