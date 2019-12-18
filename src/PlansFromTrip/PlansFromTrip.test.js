import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PlansFromTrip from './PlansFromTrip';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><PlansFromTrip /></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});