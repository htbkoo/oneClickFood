import React from 'react';
import ReactDOM from 'react-dom';
import OrderPlacer from './OrderPlacer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderPlacer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
