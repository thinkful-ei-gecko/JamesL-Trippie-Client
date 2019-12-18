import React from 'react';
import ReactDOM from 'react-dom';
import AddTrip from './AddTrip';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<AddTrip />, div);

  ReactDOM.unmountComponentAtNode(div);
});