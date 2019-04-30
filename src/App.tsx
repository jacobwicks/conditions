import React from 'react';
import './App.css';
import Expression from './components/Expresssion';
import Insertables from './components/Insertables';
import { DragDropContext } from 'react-beautiful-dnd';
import { Grid } from 'semantic-ui-react';
import { ItemProvider } from './services/ItemContext';
  
const App = () => 
<DragDropContext
  onDragEnd={result => console.log(`dragResult`, result)} 
>
  <div className="App">
    <ItemProvider>
      <Grid columns='equal'>
      <Grid.Column>
        <Expression />
          </Grid.Column>
          <Grid.Column>
            <Insertables/>
          </Grid.Column>
      </Grid>
    </ItemProvider>
  </div>
</DragDropContext>

export default App;
