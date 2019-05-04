import React, { createContext, useReducer } from 'react';
import { IItems } from '../../types';
import uuidv4 from 'uuid/v4';

const items: IItems = [
  {
    itemType: 'parenthesis',
    content: {
        parenType: 'open'
    }
  },
  {
    itemType: 'operator',
    content: {
      operatorType: 'not'
    }
  },
  {
    itemType: 'condition',
    content: {
      conditionId: `string`,
      target: {
        id: `1`,
       },
      match: {
        values: [`Yes`],
        type: `partial`
      }
    },
  },
  {
    itemType: 'parenthesis',
    content: {
      parenType: 'close'
    }
  }
]

const newOpen = {
  itemType: 'parenthesis',
  content: {
    parenType: 'open'
  }
}

const newClose = {
  itemType: 'parenthesis',
  content: {
    parenType: 'close'
  }
}

const initialState: any = {
  items
  };

  let reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'addValue': {
        const { conditionId } = action;
        const items = [...state.items];
        const condition = items.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);
        
        condition.content.match.values.push('');

        return {
          ...state,
          items
        }
      }
      case 'deleteValue': {
        const { conditionId, index } = action;
        const items = [...state.items];
        const condition = items.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);
        
        condition.content.match.values.splice(index, 1);

        return {
          ...state,
          items
        }
      }
      case 'setValue': {
        const { conditionId, index, value } = action;
        const items = [...state.items];
        const condition = items.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);
        condition.content.match.values[index] = value;
        //condition.content.match.value[index] = value;

        return {
          ...state,
          items
        }
      }
      case 'delete': {
        const { index } = action.payload;
        const items = [...state.items];
        items.splice(index, 1);
        return {
          ...state,
          items
        }
      }
      case 'drag': {
        const {
          item,
          startDroppable,
          startIndex,
          endDroppable,
          endIndex
        } = action.payload;
        const items = [...state.items];
        if (startDroppable === 'first' && endDroppable === 'first') {
          const moved = items.splice(startIndex, 1)[0];
          items.splice(endIndex, 0, moved)
          return {
            ...state,
            items
          }
        } else if (startDroppable === 'first' && endDroppable === 'trash'){
          const { startIndex } = action.payload;
          const items = [...state.items];
          items.splice(startIndex, 1);
          return {
            ...state,
            items
          }
        } else if (startDroppable === 'second' && endDroppable === 'first') {
          if (item.itemType === 'parenthesis' && item.content.parenType === 'pair') {
            items.splice(endIndex, 0, newOpen, newClose) 
          } else if (item.itemType === 'conditionPlaceholder') {
            const condition = {
              itemType: 'condition',
              content: {
                conditionId: uuidv4(),
                target: {
                  name: null,
                  type: null
                },
                match: {
                  values: [],
                  type: null
                }
              },
            }
            items.splice(endIndex, 0, condition);
          } else {
            items.splice(endIndex, 0, item);
          }
            return {
              ...state,
              items
            } 
;
        } else {
          return state;
        }
        }
      case 'insertNew': {
        const { item } = action.payload;
        const { itemType } = item;
        const items = [...state.items]
        if (itemType === 'parenthesis' && item.content.parenType === 'pair' ) {
         
          items.splice(0, 0, newOpen, newClose)
          return {
            ...state,
            items
          }
        } else if (itemType === 'conditionPlaceholder') {
          const condition = {
            itemType: 'condition',
            content: {
              conditionId: uuidv4(),
              target: {
                id: null
              },
              match: {
                values: [],
                type: null
              }
            },
        }
        items.splice(0,0, condition)
        return {
          ...state,
          items
        }
      } else {
        items.splice(0,0,item)
        return {
          ...state,
          items
        }
      }
      }
      case 'matchTypeSelect':{
        const { 
          conditionId,
          matchType
        } = action;
        
        const items = [...state.items];
        const condition = items.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);
        
        condition.content.match.type = matchType;

        return {
          ...state,
          items
        }
      }
      case 'targetSelect' : {
        const { conditionId, targetId } = action;
        const items = [...state.items];
        const condition = items.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);
        
        condition.content.target.id = targetId;

        return {
          ...state,
          items
        }
      }
      case 'toggle': {
          const { index } = action.payload;
          let target = state.items[index];
          target = toggle(target);
          const items = [...state.items];
          items[index] = target;
          return {
              ...state,
              items
            };
      }
      default:
        throw new Error();
    }
  }

  const ItemContext = createContext(initialState);
  const ItemProvider = (props: any) => {
      const [state, dispatch] = useReducer(reducer, initialState);
return (
    <ItemContext.Provider value={{state, dispatch}}>
    {props.children}
  </ItemContext.Provider>
)}

  export { ItemContext, ItemProvider }

  const toggle = (target: any) => {
      const { itemType, content } = target;
      if (itemType === 'parenthesis') {
        const { parenType } = content;
            if (parenType === 'open') {
                return {
                  ...target,
                    content: {
                      ...content,
                      parenType: 'close'
                    }
                  }
            } else if (parenType === 'close') {
                return {
                  ...target,
                  content: {
                    ...content,
                    parenType: 'open'
                  }
            }
          }
    } else if (itemType === 'operator') {
        let { operatorType } = content;

        if (operatorType === 'and') operatorType = 'or';
        else if (operatorType === 'or') operatorType = 'not';
        else if ( operatorType === 'not') operatorType = 'and';
        return {
            ...target,
            content: {
                ...content,
                operatorType
            }
        }
      } else if (itemType === 'condition') {
        const { content } = target;
        const open = content.open ? content.open : false;
          return {
            ...target,
            content: {
                ...content,
                open: !open
            }
        };
      } else return target;

  }
