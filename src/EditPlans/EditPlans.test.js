import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EditPlans from './EditPlans';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><EditPlans match={{params: {planId: 12}}}/></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});