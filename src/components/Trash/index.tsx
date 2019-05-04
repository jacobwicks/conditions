import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Icon, Segment } from 'semantic-ui-react';

const Trash = () =>
<Droppable
  droppableId={'trash'}
>
      {(provided, snapshot) => (
        <Segment
          style={{
            overflow: 'auto',
                }}
          color={snapshot.isDraggingOver
          ? 'blue'
          : undefined}
          inverted={snapshot.isDraggingOver}
          tertiary={snapshot.isDraggingOver}
          >
        <div
          ref={provided.innerRef}
        > 
        <Icon name='trash' size='massive'/>
          {provided.placeholder}
        </div>
        </Segment>
        )}
    </Droppable>

export default Trash;
