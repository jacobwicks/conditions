import React, { useContext } from 'react';
import Droppable from '../Droppable';
import { ExpressionContext } from '../../services/ExpressionContext';
import { FunctionsContext } from '../../services/FunctionsContext';
import { INewComponents } from '../../types';
import uuidv4 from 'uuid/v4';

const newComponents: INewComponents = [
      {
          itemType: 'functionPlaceholder',
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


const NewComponents = () => {
  const expressionDispatch = useContext(ExpressionContext).dispatch;
  const functionsDispatch = useContext(FunctionsContext).dispatch;

  const doubleClickFn = (droppableId: string, index: number) => {
    //if it's a functionPlaceholder, we want to 
    //1. Create a new function in functionsContext 
    //2. call insert function with that functionId in expressionContext
    //else, go ahead and insertNew
    if (index === 0) {
      const id = uuidv4();
      functionsDispatch({
        type: 'insert',
        id,
        name: undefined
      });
      expressionDispatch({
        type: 'insertNew',
        item: {
          itemType: 'function',
          content: {
            functionId: id
          }
        }
      })
    } else {
      expressionDispatch({
        type: 'insertNew',
        item: newComponents[index]
      })
    }
  }

  return (
    <Droppable
    droppableId={'newComponents'}
    direction={'horizontal'}
    doubleClickFn={doubleClickFn}
    header={`New Components - double click or drag and drop to add`}
    height={200}
    items={newComponents}
    />
  )}


export default NewComponents;
