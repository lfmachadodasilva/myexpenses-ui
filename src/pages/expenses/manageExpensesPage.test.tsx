import React from 'react';
import { render } from '@testing-library/react';
import { ManageExpensesPage } from './manageExpensesPage';

describe('<ManageExpensesPage />', () => {
    test('renders', () => {
        const { getByText } = render(<ManageExpensesPage />);
        const linkElement = getByText(/EXPENSES.MANAGE_PAGE.TITLE/i);
        expect(linkElement).toBeInTheDocument();
    });
});
