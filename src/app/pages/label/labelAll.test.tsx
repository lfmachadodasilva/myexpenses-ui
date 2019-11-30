import React from 'react';
import ReactDOM from 'react-dom';
import { LabelAllPage } from './labelAll';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LabelAllPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
