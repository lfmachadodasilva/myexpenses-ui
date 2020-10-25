import React from 'react';

import { SearchComponent } from '../../components/search/search';

export type ExpenseProps = {};

export const ExpensePage: React.FC<ExpenseProps> = React.memo((props: ExpenseProps) => {
    return (
        <>
            Expense page
            <br></br>
            <SearchComponent />
        </>
    );
});
