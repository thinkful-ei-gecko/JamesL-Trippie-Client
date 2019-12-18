import React from 'react';
import ReactDOM from 'react-dom';
import AddTrip from './AddTrip';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><AddTrip /></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});