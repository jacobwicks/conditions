import React, { Fragment, ReactChild, useState, useContext, ReactElement } from 'react';
import { Popup } from 'semantic-ui-react';
  
const WithInstructions = ({
    child,
    type
  }: {
    child: ReactElement,
    type: string
  }) => {
    const content: {[key:string]:ReactElement} = {
      condition: <Fragment><p>Right click to open and close editor.</p><p>Drag to trash to delete.</p></Fragment>,
      operator: <Fragment><p>Right click to cycle through operators</p><p>Double click to delete</p></Fragment>,
      parenthesis: <Fragment><p>Right click to toggle.</p><p>Double click to delete.</p></Fragment>
    }
  
    return (
      <Popup content={content[type]} 
      trigger={child}
  />
    )
  }


export default WithInstructions;