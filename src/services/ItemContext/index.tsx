import React, { createContext, useReducer } from 'react';

const initialState: any = {
    items: [
      { itemType: 'open'},
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
      {itemType: 'close'}
    ]
  };
  
  let reducer = (state: any, action: any) => {
    switch (action.type) {
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
      if (itemType === 'open') {
          return {
              itemType: 'close'
          }
      } else if (itemType === 'close') {
          return { itemType: 'open' }
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


//   if (operatorType === 'and') {
//     return {
//         ...target,
//         content: {
//             ...content,
//             operatorType: 'or'
//         }
//     }
// } else if (operatorType === 'or') {
//     return {
//         ...target,
//         content: {
//             ...content,
//             operatorType: 'not'
//         }
//     }
// } else if (operatorType === 'not') {
//     return {
//         ...target,
//         content: {
//             ...content,
//             operatorType: 'and'
//         }
//     }
// }