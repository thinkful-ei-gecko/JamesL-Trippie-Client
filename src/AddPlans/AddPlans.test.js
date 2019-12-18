import React from 'react';
import ReactDOM from 'react-dom';
import AddPlans from './AddPlans';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><AddPlans /></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});