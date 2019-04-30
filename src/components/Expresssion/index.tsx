import React, { useContext } from 'react';
import MyDroppable from '../MyDroppable';
import { ItemContext } from '../../services/ItemContext';

const Expression = () => {
const { items } = useContext(ItemContext).state;
return (
<MyDroppable 
changeOnRightClick={true}
droppableId={'first'}
header={`drop`}
height={800}
items={items}
/>
)}

export default Expression;