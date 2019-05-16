import React, { useContext } from 'react';
import { ExpressionContext } from '../../../../services/ExpressionContext';
import { Header, Label } from 'semantic-ui-react';
import { colors } from '../../../../types';
import Parenthesis from '../Parenthesis';
import { ConditionsContext } from '../../../../services/ConditionsContext';
import { FunctionsContext } from '../../../../services/FunctionsContext';
import { InputContext, } from '../../../../services/InputContext';
import WithInstructions from '../../../WithInstructions';
import Function from '../Function';
import { functionValue } from '../../../../services/FunctionValue';

const capitalize = (string : string) => string.charAt(0).toUpperCase() + string.slice(1)

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
  const { conditions } = useContext(ConditionsContext).state
  const { dispatch } = useContext(ExpressionContext);
  const { functions } = useContext(FunctionsContext).state;
  const { inputs } = useContext(InputContext).state;
  
  let color: keyof typeof colors | undefined = undefined;
  let content: string | undefined | any = undefined;
  let instructionType = '';

  if (item.itemType === 'parenthesis') {
    const child = 
    <Parenthesis
    droppableId={droppableId}
    parenthesis={item.content}
    index={index}
    changeOnRightClick={changeOnRightClick}
    doubleClickFn={doubleClickFn}
    isDragging={isDragging}
    />

    if (droppableId === 'expression' ) return child
    else return <WithInstructions child={child} type={`newParenthesis${capitalize(item.content.parenType)}`}/>
  } else {
     if (item.itemType === 'function') {
        
        const getColor = () => {
          const functionId = item.content.functionId;

          const result = functionValue({
            functionId,
            conditions,
            functions,
            inputs
          })
          if (result === undefined) return 'blue'
          else return result ? 'green' : 'red'
        }

        color = getColor();
        content = <Function thisFunction={item.content}/>
        instructionType = item.itemType;

      } else if (item.itemType === 'functionPlaceholder') {
      
        color = 'blue'
        content = <Header as='h1'>Function</Header>
        instructionType = 'newFunction';
     
      } else if (item.itemType === 'operator') {
     
        color = 'orange'
        content = <Header as='h1'>{item.content.operatorType}</Header>
        instructionType = 
          droppableId === 'expression' 
            ? item.itemType 
            : `new${capitalize(item.content.operatorType)}`
    }

  const child = <Label size='large'
    onContextMenu={(e: MouseEvent) => {
        e.preventDefault();
        if (!changeOnRightClick) return;
      dispatch({
        type: 'toggle',
        droppableId,
        index
      })
    }}
    onDoubleClick={() => !!doubleClickFn && doubleClickFn(droppableId, index)}
    color={isDragging
      ? 'green'
      : color
    }
    content={content}
  />

  return <WithInstructions type={instructionType} child={child}/>
}}

export default DraggableContent;