import React, { useContext } from 'react';
import { ItemContext } from '../../../../services/ItemContext';
import { Header, Label } from 'semantic-ui-react';
import { colors } from '../../../../types';
import Condition from '../Condition';
import Parenthesis from '../Parenthesis';
import { conditionValue } from '../../../../services/ConditionValue'
import { InputContext, } from '../../../../services/InputContext';


const DraggableContent = ({
    droppableId,
    item,
    index,
    isDragging,
    changeOnRightClick,
    doubleClickFn,
  }: {
    doubleClickFn?: (droppableId: string, index: number) => void,
    droppableId: string,
    index: number,
    item : any,
    isDragging: boolean,
    changeOnRightClick?: boolean,
  }) => {
    const { items } = useContext(ItemContext).state;
    const { inputs } = useContext(InputContext).state;

    let color: keyof typeof colors | undefined = undefined;
    let content: string | undefined | any = undefined;
    const { dispatch } = useContext(ItemContext)
if (item.itemType === 'parenthesis') {
  return <Parenthesis
  droppableId={droppableId}
  parenthesis={item.content}
  index={index}
  changeOnRightClick={changeOnRightClick}
  doubleClickFn={doubleClickFn}
  isDragging={isDragging}
  />
} else {
    if (item.itemType === 'condition') {
     const getColor = (conditionId: string) => {
       const result = conditionValue({conditionId, items, inputs})
       if (result === undefined) return 'blue'
       else return result ? 'green' : 'red'
      }
      color = getColor(item.content.conditionId)
      content = <Condition condition={item.content}/>
    } else if (item.itemType === 'conditionPlaceholder') {
     color = 'blue'
     content = <Header as='h1'>Condition</Header>
    } else if (item.itemType === 'operator') {
     color = 'orange'
     content = <Header as='h1'>{item.content.operatorType}</Header>
   }
    return (
        <Label size='large'
              onContextMenu={(e: any) => {
                  e.preventDefault();
                  if (!changeOnRightClick) return;
                dispatch({
                  type: 'toggle',
                  payload: {
                    droppableId,
                    index
                  }
                })
              }}
              onDoubleClick={() => !!doubleClickFn && doubleClickFn(droppableId, index)}
              color={isDragging
                ? 'green'
                : color
              }
              content={content}
            />
    )
}}

export default DraggableContent;


// import React, { useContext } from 'react';
// import { ItemContext } from '../../../../services/ItemContext';
// import { Header, Label } from 'semantic-ui-react';
// import { colors } from '../../../../types';
// import Condition from '../Condition';
// import { conditionValue } from '../../../../services/ConditionValue'
// import { InputContext, } from '../../../../services/InputContext';
//
//
// const DraggableContent = ({
//     droppableId,
//     item,
//     index,
//     isDragging,
//     changeOnRightClick,
//     doubleClickFn,
//   }: {
//     doubleClickFn?: (droppableId: string, index: number) => void,
//     droppableId: string,
//     index: number,
//     item : any,
//     isDragging: boolean,
//     changeOnRightClick?: boolean,
//   }) => {
//     const { items } = useContext(ItemContext).state;
//     const { inputs } = useContext(InputContext).state;
//
//       let color: keyof typeof colors | undefined = undefined;
//       let content: string | undefined | any = undefined;
//       const { dispatch } = useContext(ItemContext)
//   if (item.itemType === 'condition') {
//    const getColor = (conditionId: string) => {
//      const result = conditionValue({conditionId, items, inputs})
//      if (result === undefined) return 'blue'
//      else return result ? 'green' : 'red'
//     }
//     color = getColor(item.content.conditionId)
//     content = <Condition condition={item.content}/>
//   } else if (item.itemType === 'conditionPlaceholder') {
//    color = 'blue'
//    content = <Header as='h1'>Condition</Header>
//   } else if (item.itemType === 'operator') {
//    color = 'orange'
//    content = <Header as='h1'>{item.content.operatorType}</Header>
//  } else if (item.itemType === 'parenthesis') {
//    color = 'yellow'
//
//    const { parenType } = item.content;
//       if (parenType === 'close') content = <Header as='h1'>)</Header>
//         else if (parenType === 'open') content = <Header as='h1'>(</Header>
//         else if (parenType === 'pair') content = <Header as='h1'>()</Header>
//   }
//
//   return (
//       <Label size='large'
//             onContextMenu={(e: any) => {
//                 e.preventDefault();
//                 if (!changeOnRightClick) return;
//               dispatch({
//                 type: 'toggle',
//                 payload: {
//                   droppableId,
//                   index
//                 }
//               })
//             }}
//             onDoubleClick={() => !!doubleClickFn && doubleClickFn(droppableId, index)}
//             color={isDragging
//               ? 'green'
//               : color
//             }
//             content={content}
//           />
//   )}
//
// export default DraggableContent;
