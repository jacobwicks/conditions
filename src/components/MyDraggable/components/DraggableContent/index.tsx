import React, { Fragment, useContext, ReactChild } from 'react';
import { ExpressionContext } from '../../../../services/ExpressionContext';
import { Header, Label, Popup } from 'semantic-ui-react';
import { colors } from '../../../../types';
import Condition from '../Condition';
import Parenthesis from '../Parenthesis';
import { conditionValue } from '../../../../services/ConditionValue'
import { InputContext, } from '../../../../services/InputContext';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import WithInstructions from '../../../WithInstructions';

const DraggableContent = ({
  droppableId,
  item,
  index,
  isDragging,
  changeOnRightClick,
  doubleClickFn,
}: {
  doubleClickFn?: (droppableId: string, index: number) => void,
  droppableId: string,
  index: number,
  item : any,
  isDragging: boolean,
  changeOnRightClick?: boolean,
}) => {
  const { expression } = useContext(ExpressionContext).state;
  const { inputs } = useContext(InputContext).state;

  let color: keyof typeof colors | undefined = undefined;
  let content: string | undefined | any = undefined;
  const { dispatch } = useContext(ExpressionContext)

  const { instructions}  = useContext(InstructionsContext).state;

  if (item.itemType === 'parenthesis') {
    return <Parenthesis
    droppableId={droppableId}
    parenthesis={item.content}
    index={index}
    changeOnRightClick={changeOnRightClick}
    doubleClickFn={doubleClickFn}
    isDragging={isDragging}
    />
  } else {
  if (item.itemType === 'condition') {
    
    const getColor = (conditionId: string) => {
     const result = conditionValue({conditionId, expression, inputs})
     if (result === undefined) return 'blue'
     else return result ? 'green' : 'red'
    }

    color = getColor(item.content.conditionId)
    content = <Condition condition={item.content}/>
  } else if (item.itemType === 'conditionPlaceholder') {
   color = 'blue'
   content = <Header as='h1'>Condition</Header>
  } else if (item.itemType === 'operator') {
   color = 'orange'
   content = <Header as='h1'>{item.content.operatorType}</Header>
 }

  const child = <Label size='large'
    onContextMenu={(e: MouseEvent) => {
        e.preventDefault();
        if (!changeOnRightClick) return;
      dispatch({
        type: 'toggle',
        payload: {
          droppableId,
          index
        }
      })
    }}
    onDoubleClick={() => !!doubleClickFn && doubleClickFn(droppableId, index)}
    color={isDragging
      ? 'green'
      : color
    }
    content={content}
  />
  return (droppableId === 'first' && instructions ? <WithInstructions type={item.itemType} child={child}/>: child)
}}

export default DraggableContent;