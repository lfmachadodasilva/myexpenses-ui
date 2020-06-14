import React from 'react';
import { render } from '@testing-library/react';
import { ListExpensesPage } from './listExpensesPage';

describe('<ListExpensesPage />', () => {
    test('renders', () => {
        const { getByText } = render(<ListExpensesPage />);
        const linkElement = getByText(/EXPENSES.LIST_PAGE.TITLE/i);
        expect(linkElement).toBeInTheDocument();
    });
});
