import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DraggableContent from './components/DraggableContent';

const MyDraggable = ({
  item,
  changeOnRightClick,
  droppableId,
  draggableId,
  index
} :{
  droppableId: string,
  changeOnRightClick?: boolean,
    item: any,
    draggableId: string,
    index: number
}) =>
<Draggable
  draggableId={draggableId}
  index={index}
  >
  {(provided, snapshot) => (
    <div>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <DraggableContent
          droppableId={droppableId} 
          item={item}
          index={index} 
          isDragging={snapshot.isDragging}
          changeOnRightClick={changeOnRightClick}
          />
      </div>
      {provided.placeholder}
    </div>
  )}
</Draggable>

export default MyDraggable;





