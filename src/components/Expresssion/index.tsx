import React, { useContext } from 'react';
import MyDroppable from '../MyDroppable';
import { ItemContext } from '../../services/ItemContext';

const Expression = () => {
const { dispatch } = useContext(ItemContext);
const { items } = useContext(ItemContext).state;

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
header={`Your Expression`}
height={400}
items={items}
/>
)}

export default Expression;
