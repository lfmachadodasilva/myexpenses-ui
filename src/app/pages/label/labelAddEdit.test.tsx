import React from 'react';
import ReactDOM from 'react-dom';
import { LabelAddEditPage } from './labelAddEdit';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LabelAddEditPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
