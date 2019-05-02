import React, { useContext } from 'react';
import './App.css';
import Expression from './components/Expresssion';
import Insertables from './components/Insertables';
import { DragDropContext } from 'react-beautiful-dnd';
import { Grid } from 'semantic-ui-react';
import { ItemContext, ItemProvider } from './services/ItemContext';
import { DropResult } from 'react-beautiful-dnd'

const WithDispatch = (props: any) => {
  const { dispatch } = useContext(ItemContext);
  console.log(typeof(dispatch))
  return (
    <DragDropContext
    onDragEnd={(result: DropResult) => {
      const { destination, source } = result;
      const { droppableId: startDroppable, index: startIndex } = source;
      const { droppableId: endDroppable = null, index: endIndex = null, } = destination || {};

      dispatch({
        type: 'drag',
        payload: {
          startDroppable,
          startIndex,
          endDroppable,
          endIndex
        }
      })
    }}
    dispatch={dispatch}
    {...props}
    />
  )
}
//DraggableLocation | undefined
const App = () =>
  <div className="App">
    <ItemProvider>
    <WithDispatch

    >

      <Grid columns='equal'>
      <Grid.Column>
        <Expression />
          </Grid.Column>
          <Grid.Column>
            <Insertables/>
          </Grid.Column>
      </Grid>
      </WithDispatch>
    </ItemProvider>
  </div>

export default App;
