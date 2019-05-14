import React from 'react';
import { Draggable as OriginalDraggable } from 'react-beautiful-dnd';
import DraggableContent from './components/DraggableContent';
import { 
  ICondition, 
  IOperator, 
  IParenthesis, 
  INewFunctionPlaceholder, 
  INewParenthesis 
} from '../../types'

const Draggable = ({
  item,
  changeOnRightClick,
  doubleClickFn,
  droppableId,
  draggableId,
  index
} :{
  doubleClickFn?: (droppableId: string, index: number) => void,
  droppableId: string,
  changeOnRightClick?: boolean,
  item: ICondition | IOperator | IParenthesis | INewFunctionPlaceholder | INewParenthesis,
  draggableId: string,
  index: number,
}) =>
<OriginalDraggable
  draggableId={draggableId}
  index={index}
  >
  {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <DraggableContent
          doubleClickFn={doubleClickFn}
          droppableId={droppableId}
          item={item}
          index={index}
          isDragging={snapshot.isDragging}
          changeOnRightClick={changeOnRightClick}
          />
      </div>
  )}
</OriginalDraggable>

export default Draggable;
