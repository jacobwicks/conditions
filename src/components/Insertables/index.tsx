import React from 'react';
import MyDroppable from '../MyDroppable';

const insertables: any[] = [
    { itemType: 'open'},
    { itemType: 'close'},
    {
        itemType: 'operator',
        content: {
          operatorType: 'and'
        }
      },
    {
    itemType: 'operator',
    content: {
        operatorType: 'or'
    }
    },
    {
      itemType: 'operator',
      content: {
        operatorType: 'not'
      }
    },
    {
        itemType: 'conditionPlaceholder',
    }
]


const Insertables = () =>
<MyDroppable 
droppableId={'second'}
header={`New Components`}
height={400}
items={insertables}
/>

export default Insertables;