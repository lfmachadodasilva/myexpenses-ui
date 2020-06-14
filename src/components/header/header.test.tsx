import React from 'react';
import { render } from '@testing-library/react';
import { Header } from './header';

describe('<Header />', () => {
    test('renders', () => {
        const { getByText } = render(<Header />);
        const linkElement = getByText(/header.title/i);
        expect(linkElement).toBeInTheDocument();
    });
});
