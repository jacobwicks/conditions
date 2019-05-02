import React, { useContext } from 'react';
import MyDroppable from '../MyDroppable';
import { ItemContext } from '../../services/ItemContext';

const Expression = () => {
const { dispatch } = useContext(ItemContext);
const { items } = useContext(ItemContext).state;
const doubleClickFn = (droppableId: string, index: number) => {
    dispatch({
      type: 'delete',
      payload: {index}
    })
  }
return (
<MyDroppable
changeOnRightClick={true}
doubleClickFn={doubleClickFn}
droppableId={'first'}
header={`drop`}
height={800}
items={items}
/>
)}

export default Expression;
