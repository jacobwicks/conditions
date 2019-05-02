import React, { createContext, useReducer } from 'react';

//const uuidv4 = require('uuid/v4')
//import { v4 as uuid } from 'uuid'
import uuidv4 from 'uuid/v4';

const initialState: any = {
    items: [
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
            name: `string`,
            type: `string`
          },
          match: {
            values: [`Yes`],
            type: `exact`
          }
        },
        open: true
      },
      {
        itemType: 'parenthesis',
        content: {
          parenType: 'close'
        }
      }
    ]
  };

  let reducer = (state: any, action: any) => {
    switch (action.type) {
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
          startDroppable,
          startIndex,
          endDroppable,
          endIndex
        } = action.payload;
        if (startDroppable === 'first' && endDroppable === 'first') {
          const items = [...state.items];
          const moved = items.splice(startIndex, 1)[0];
          items.splice(endIndex, 0, moved)
          return {
            ...state,
            items
          }
        } else if (startDroppable === 'second' && endDroppable === 'first') {
          return state;
        } else {
          return state;
        }
        }
      case 'insertNew': {
        const { item } = action.payload;
        const { itemType } = item;
        const items = [...state.items]
        if (itemType === 'parenthesis' && item.content.parenType === 'pair' ) {
          const open = {
            itemType: 'parenthesis',
            content: {
              parenType: 'open'
            }
          }

          const close = {
            itemType: 'parenthesis',
            content: {
              parenType: 'close'
            }
          }
          items.splice(0, 0, open, close)
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
                name: null,
                type: null
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
