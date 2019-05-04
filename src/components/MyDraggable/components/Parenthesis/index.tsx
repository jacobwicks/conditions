import React, { useContext } from 'react';
import { Header, Label } from 'semantic-ui-react';
import { ExpressionContext } from '../../../../services/ExpressionContext'
import { getMatch } from '../../../../services/ParenthesisMatch';

const Parenthesis = ({
  parenthesis,
  index,
  changeOnRightClick,
  doubleClickFn,
  droppableId,
  isDragging,
  ...rest
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
  const { expression } = useContext(ExpressionContext).state;
  const { dispatch } = useContext(ExpressionContext);
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

//must spread {...rest} in order for instruction popup to function 
 return (
 <Label size='large'
            onContextMenu={(e: MouseEvent) => {
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
          {...rest}
          />
)}

export default Parenthesis;
