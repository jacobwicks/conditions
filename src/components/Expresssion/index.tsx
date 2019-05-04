import React, { useContext } from 'react';
import MyDroppable from '../MyDroppable';
import { ItemContext } from '../../services/ItemContext';
import { evaluateExpression } from '../../services/EvaluateExpression';
import { InputContext } from '../../services/InputContext';
import { parenthesisMatch } from '../../services/ParenthesisMatch';
import { IItems } from '../../types';

const hasCondition = (expression : IItems) => expression.some(item => item.itemType === 'condition')
const hasTarget = (expression: IItems) => expression.some(item => item.itemType === 'condition' && !!item.content.target.id)

const Expression = () => {
const { dispatch } = useContext(ItemContext);
const { items } = useContext(ItemContext).state;
const { inputs } = useContext(InputContext).state;

const matched = parenthesisMatch(items);  
const noConditions = !hasCondition(items);
const noTargets = !hasTarget(items);

const value = evaluateExpression({
  expression: items,
  inputs
})
const doubleClickFn = (droppableId: string, index: number) => {
  if (items[index].itemType !== 'condition') {
    dispatch({
      type: 'delete',
      payload: {index}
    })
  }}

return (
<MyDroppable
changeOnRightClick={true}
doubleClickFn={doubleClickFn}
direction={'horizontal'}
droppableId={'first'}
header={`Your Expression ${noConditions 
  ? `has no conditions` 
  : noTargets ? `has no valid targets`
    : `is ${!matched 
      ? `unparseable due to mismatched parenthesis` 
      : value}`}`}
height={400}
items={items}
/>
)}

export default Expression;
