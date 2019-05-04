import React from 'react';
import './App.css';
import Expression from './components/Expresssion';
import Insertables from './components/Insertables';
import { Grid } from 'semantic-ui-react';
import { ItemProvider } from './services/ItemContext';
import { InputProvider } from './services/InputContext';
import DragDropContext from './components/DragDropContextWithDispatch'
import Analyze from './components/Analyze';
import Inputs from './components/Inputs';
import Trash from './components/Trash';

const App = () =>
  <div className="App">
    <ItemProvider>
      <InputProvider>
    <DragDropContext>

      <Grid columns='equal'>
      <Grid.Column>
        <Grid.Row>
        <Expression />
        </Grid.Row>
        <Grid.Row>
          <Inputs/>
        </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Analyze/>
            </Grid.Row>
            <Grid.Row>
              <Insertables/>
            </Grid.Row>
            <Grid.Row>
              <Trash/>
            </Grid.Row>
          </Grid.Column>
      </Grid>
      </DragDropContext>
      </InputProvider>
    </ItemProvider>
  </div>

export default App;
