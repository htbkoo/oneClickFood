import React from 'react';
import ReactDOM from 'react-dom';
import QrCodeGenerator from './QrCodeGenerator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QrCodeGenerator />, div);
  ReactDOM.unmountComponentAtNode(div);
});
