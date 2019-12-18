import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DisplayTrips from './DisplayTrips';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><DisplayTrips /></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});