import React, { createContext, useReducer } from 'react';
import { IAction, IExpression } from '../../types';
import uuidv4 from 'uuid/v4';

const example1: IExpression = [
  {
    itemType: 'parenthesis',
    content: {
        parenType: 'open',
        highlight: false,
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
      parenType: 'close',
      highlight: false,
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
  expression: example1
  };

  let reducer = (state: any, action: IAction) => {
    switch (action.type) {
      case 'addValue': {
        const { conditionId } = action;
        const expression = [...state.expression];
        const condition = expression.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);

        condition.content.match.values.push('');

        return {
          ...state,
          expression
        }
      }
      case 'deleteTarget': {
        const targetId = action.id;
        const expression = [...state.expression];
        expression.forEach(item => {
          if (item.itemType === 'condition' && item.content.target.id === targetId) {
            item.content.target.id = undefined;
          }
        })

        return {
          ...state,
          expression
        }
      }
      case 'deleteValue': {
        const { conditionId, index } = action;
        const expression = [...state.expression];
        const condition = expression.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);

        condition.content.match.values.splice(index, 1);

        return {
          ...state,
          expression
        }
      }
      case 'highlight': {
        const { indexes } = action;
        const expression = [...state.expression];
        indexes.forEach((index: number) => {
          expression[index].content.highlight = true
        })
        return {
          ...state,
          expression
        }
      }
      case 'setValue': {
        const { conditionId, index, value } = action;
        const expression = [...state.expression];
        const condition = expression.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);
        condition.content.match.values[index] = value;
        //condition.content.match.value[index] = value;

        return {
          ...state,
          expression
        }
      }
      case 'delete': {
        const { index } = action.payload;
        const expression = [...state.expression];
        expression.splice(index, 1);
        return {
          ...state,
          expression
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
        const expression = [...state.expression];
        if (startDroppable === 'first' && endDroppable === 'first') {
          const moved = expression.splice(startIndex, 1)[0];
          expression.splice(endIndex, 0, moved)
          return {
            ...state,
            expression
          }
        } else if (startDroppable === 'first' && endDroppable === 'trash'){
          const { startIndex } = action.payload;
          const expression = [...state.expression];
          expression.splice(startIndex, 1);
          return {
            ...state,
            expression
          }
        } else if (startDroppable === 'second' && endDroppable === 'first') {
          if (item.itemType === 'parenthesis' && item.content.parenType === 'pair') {
            expression.splice(endIndex, 0, newOpen, newClose)
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
            expression.splice(endIndex, 0, condition);
          } else {
            expression.splice(endIndex, 0, item);
          }
            return {
              ...state,
              expression
            }
;
        } else {
          return state;
        }
        }
      case 'insertNew': {
        const { item } = action.payload;
        const { itemType } = item;
        const expression = [...state.expression]
        if (itemType === 'parenthesis' && item.content.parenType === 'pair' ) {

          expression.splice(0, 0, newOpen, newClose)
          return {
            ...state,
            expression
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
        expression.splice(0,0, condition)
        return {
          ...state,
          expression
        }
      } else {
        expression.splice(0,0,item)
        return {
          ...state,
          expression
        }
      }
      }
      case 'matchTypeSelect':{
        const {
          conditionId,
          matchType
        } = action;

        const expression = [...state.expression];
        const condition = expression.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);

        condition.content.match.type = matchType;

        return {
          ...state,
          expression
        }
      }
      case 'highlightCancel': {
        const expression = [...state.expression];
        expression.forEach((item:any) => {
          if (item.content.hasOwnProperty('highlight')) {
            item.content.highlight = false;
          }
        })
        return {
          ...state,
          expression
        }
      }
      case 'targetSelect' : {
        const { conditionId, targetId } = action;
        const expression = [...state.expression];
        const condition = expression.find((item: any) => item.content.conditionId && item.content.conditionId === conditionId);

        condition.content.target.id = targetId;

        return {
          ...state,
          expression
        }
      }
      case 'toggle': {
          const { index } = action.payload;
          let target = state.expression[index];
          target = toggle(target);
          const expression = [...state.expression];
          expression[index] = target;
          return {
              ...state,
              expression
            };
      }
      default:
        throw new Error();
    }
  }

  const ExpressionContext = createContext(initialState);
  const ExpressionProvider = (props: any) => {
      const [state, dispatch] = useReducer(reducer, initialState);
return (
    <ExpressionContext.Provider value={{state, dispatch}}>
    {props.children}
  </ExpressionContext.Provider>
)}

  export { ExpressionContext, ExpressionProvider }

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
