import React, { useContext } from 'react';
import { Header, Label } from 'semantic-ui-react';
import { ItemContext } from '../../../../services/ItemContext'
import { getMatch } from '../../../../services/ParenthesisMatch';

const Parenthesis = ({
  parenthesis,
  index,
  changeOnRightClick,
  doubleClickFn,
  droppableId,
  isDragging
} : {
  changeOnRightClick ?: boolean,
  doubleClickFn ?: (droppableId: string, index: number) => void,
  droppableId: string,
  isDragging : boolean,
  index: number,
  parenthesis : {
    highlight ?: boolean,
    parenType: 'open' | 'close' | 'pair',
  }
}) => {
  const expression = useContext(ItemContext).state.items;
  const { dispatch } = useContext(ItemContext);
  const { parenType, highlight } = parenthesis;
  const getContent = () => {
    if (parenType === 'close') return ')'
    if (parenType === 'open') return '('
    if (parenType === 'pair') return '()'
  }

const getColor = () => {
  if (droppableId !== 'first') return 'yellow'
  if (getMatch(index, expression) === undefined) return 'grey'

  return highlight
    ? 'purple'
    : 'yellow'
}

const handleMouseOver = () => {
if (droppableId !== 'first') return;
if (highlight) return;

const match = getMatch(index, expression);
match !== undefined &&
dispatch({
  type: 'highlight',
  indexes: [index, match]
})
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
              : getColor()
            }
            content={<Header as='h1' >{getContent()}</Header>}
            onMouseOver={handleMouseOver}
            onMouseLeave={() => !isDragging && dispatch({type: 'highlightCancel'})}
          />
)}

export default Parenthesis;
