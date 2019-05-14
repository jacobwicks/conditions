import React, { useContext, useState } from 'react';
import Droppable from '../Droppable';
import { Transition, Button, Divider } from 'semantic-ui-react';
import { ExpressionContext } from '../../services/ExpressionContext';
import { evaluateExpression } from '../../services/EvaluateExpression';
import { InputContext } from '../../services/InputContext';
import { parenthesisMatch } from '../../services/ParenthesisMatch';
import { IExpression } from '../../types';


const Expression = () => {
  const [visible, setVisible] = useState(true);
  const { dispatch } = useContext(ExpressionContext);
  const { expression } = useContext(ExpressionContext).state;
  const { inputs } = useContext(InputContext).state;
  
  const hasCondition = (expression : IExpression) => expression.some(item => item.itemType === 'condition')
  const hasTarget = (expression: IExpression) => expression.some(item => item.itemType === 'condition' && !!item.content.target.id)

  const matched = parenthesisMatch(expression);  
  const noConditions = !hasCondition(expression);
  const noTargets = !hasTarget(expression);

const value = evaluateExpression({
  expression,
  inputs
})

const doubleClickFn = (droppableId: string, index: number) => {
  if (expression[index].itemType !== 'condition') {
    dispatch({
      type: 'delete',
      index
    })
  }}

return (
  <div>
  <Button content={visible ? 'Hide' : 'Show'} onClick={() => setVisible(!visible)} />
  <Divider hidden />
  <Transition visible={visible} animation='slide down' duration={500}>
  <div>
  <Droppable
    changeOnRightClick={true}
    doubleClickFn={doubleClickFn}
    direction={'horizontal'}
    droppableId={'expression'}
    header={`Your Expression ${noConditions 
      ? `has no conditions` 
      : noTargets ? `has no valid targets`
        : `is ${!matched 
          ? `unparseable due to mismatched parenthesis` 
          : value}`}`}
    height={400}
    items={expression}
    />
    </div>
  </Transition>
</div>
)}

export default Expression;
