import React from 'react';
import { Tab } from 'semantic-ui-react';

import Conditions from '../Conditions';
import Functions from '../Functions';
import Inputs from '../Inputs';

const panes = [
    { menuItem: 'Inputs', render: () => <Tab.Pane><Inputs/></Tab.Pane> },
    { menuItem: 'Conditions', render: () => <Tab.Pane><Conditions/></Tab.Pane> },
    { menuItem: 'Functions', render: () => <Tab.Pane><Functions/></Tab.Pane> },
  ]
  
const ExpressionTab = () => <Tab panes={panes} />

export default ExpressionTab;
  