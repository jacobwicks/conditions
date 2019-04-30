import React from 'react';
import {
  Header,
  Segment
} from 'semantic-ui-react';
import { Droppable } from 'react-beautiful-dnd';
import MyDraggable from '../MyDraggable';
import { generateId } from './services/';


const MyDroppable = ({
  droppableId,
  changeOnRightClick,
  header,
  height,
  items,
} : {
  changeOnRightClick?: boolean,
  droppableId: string,
  header?: string,
  height?: number,
  items: any[]
}) =>
<Droppable
  droppableId={droppableId}
  >
      {(provided, snapshot) => (
        <Segment
          style={{
            overflow: 'auto',
            height: height && height,
            //maxHeight: 300
                }}
          color={snapshot.isDraggingOver
          ? 'blue'
          : undefined}
          inverted={snapshot.isDraggingOver}
          tertiary={snapshot.isDraggingOver}
          >
        <div
          ref={provided.innerRef}
        > <Header as='h3'>
          {header}
          </Header>
          {items && items
          .map((item : any, index: number) =>
            <MyDraggable
            droppableId={droppableId}
            changeOnRightClick={changeOnRightClick}
                item={item}
                draggableId={generateId({
                  item,
                  index,
                  toStringify: {
                    droppableId
                  }
                })}
                index={index}
                key={generateId({
                  item,
                  index,
                  toStringify: {
                    droppableId
                  }
                })}
            />
          )}
          {provided.placeholder}
        </div>
        </Segment>
        )}
    </Droppable>

export default MyDroppable;
