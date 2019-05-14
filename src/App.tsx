import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import DragDropContext from './components/DragDropContextWithDispatch'
import Expression from './components/Expresssion';
import NewComponents from './components/NewComponents';
import Providers from './components/Providers';
import SaveLoad from './components/SaveLoad';
import Trash from './components/Trash';
import ExpressionTab from './components/ExpressionTab';

const App = () =>
  <div className="App">
  <Providers>    
    <DragDropContext>
    <SaveLoad/>
      <Expression />
      <Grid columns='equal'>
      <Grid.Row>
      <Grid.Column>
        <ExpressionTab/>
      </Grid.Column>
      <Grid.Column>
        <NewComponents/>
        <Trash/>
      </Grid.Column>
      </Grid.Row>    
      </Grid>
      </DragDropContext>
      </Providers>
  </div>

export default App;