import React from 'react';
import ReactDOM from 'react-dom';
import RegisterPage from './RegisterPage';
import { BrowserRouter as Router } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><RegisterPage /></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});