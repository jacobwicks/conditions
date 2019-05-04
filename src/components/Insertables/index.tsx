import React, { useContext } from 'react';
import MyDroppable from '../MyDroppable';
import { ItemContext } from '../../services/ItemContext';

const insertables: any[] = [
      {
          itemType: 'conditionPlaceholder',
      },
    {
      itemType: 'parenthesis',
      content: {
        parenType: 'pair'
      }
    },
    {
      itemType: 'parenthesis',
    content: {
      parenType: 'open'
    }
  },
    { itemType: 'parenthesis',
    content: {
      parenType: 'close'
    }
  },
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
]


const Insertables = () => {
  const { dispatch } = useContext(ItemContext)
  const doubleClickFn = (droppableId: string, index: number) => {
      dispatch({
        type: 'insertNew',
        payload: {
          item: insertables[index]
        }
      })
    }

  return (
    <MyDroppable
    droppableId={'second'}
    direction={'horizontal'}
    doubleClickFn={doubleClickFn}
    header={`New Components`}
    height={200}
    items={insertables}
    />
  )}


export default Insertables;
