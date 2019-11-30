import React from 'react';
import ReactDOM from 'react-dom';
import { LabelPage } from './label';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LabelPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
