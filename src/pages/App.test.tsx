import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import { setConfiguration } from '../configurations/configurationManager';

describe('<App />', () => {
    beforeEach(() => setConfiguration());

    test('renders', () => {
        const { getByText } = render(<App />);
        const linkElement = getByText(/home/i);
        expect(linkElement).toBeInTheDocument();
    });
});
