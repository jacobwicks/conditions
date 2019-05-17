import React, { useContext, useState } from 'react';
import Droppable from '../Droppable';
import { Transition, Button, Divider, Icon } from 'semantic-ui-react';
import { ConditionsContext } from '../../services/ConditionsContext';
import { ExpressionContext } from '../../services/ExpressionContext';
import { FunctionsContext } from '../../services/FunctionsContext';
import { evaluateExpression } from '../../services/EvaluateExpression';
import { InputContext } from '../../services/InputContext';
import { parenthesisMatch } from '../../services/ParenthesisMatch';
import { IExpression, IFunction } from '../../types';


const Expression = () => {
  const [visible, setVisible] = useState(true);
  const { dispatch } = useContext(ExpressionContext);
  const { expression } = useContext(ExpressionContext).state;
  const { inputs } = useContext(InputContext).state;
  const { functions } = useContext(FunctionsContext).state;
  const { conditions } = useContext(ConditionsContext).state;
   
  const hasFunction = (expression : IExpression) => expression.some(item => item.itemType === 'function')
  const functionHasTarget = (functionId: string) => !!functions.find((fn: IFunction) => fn.id === functionId).target 
  const functionHasCondition = (functionId: string) => !!functions.find((fn: IFunction) => fn.id === functionId).conditions.length
  const expressionHasTarget = (expression: IExpression) => expression.some(item => item.itemType === 'function' && functionHasTarget(item.content.functionId)) 
  const expressionHasConditions = (expression: IExpression) => expression.some(item => item.itemType === 'function' && functionHasCondition(item.content.functionId))
  
  const matched = parenthesisMatch(expression);  
  const noFunctions = !hasFunction(expression);
  const noTargets = !expressionHasTarget(expression);
  const noConditions = !expressionHasConditions(expression);
   
  const value = evaluateExpression({
    conditions,
    expression,
    functions,
    inputs
  });

  const doubleClickFn = (droppableId: string, index: number) => {
    if (expression[index].itemType !== 'function') {
      dispatch({
        type: 'delete',
        index
      })
    }}

return (
  <div>
  <Button icon onClick={() => setVisible(!visible)}>
  <Icon name={visible ? 'window minimize' : 'window maximize'}/>
  </Button>
  <Divider hidden />
  <Transition visible={visible} animation='slide down' duration={500}>
  <div>
  <Droppable
    changeOnRightClick={true}
    doubleClickFn={doubleClickFn}
    direction={'horizontal'}
    droppableId={'expression'}
    header={`Your Rule ${noFunctions 
      ? `has no Functions` 
      : noTargets 
        ? `has no valid targets`
        : noConditions
          ? `has no conditions`
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
