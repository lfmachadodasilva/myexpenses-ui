import React from 'react';

import { SearchComponent, SearchProps } from '../../components/search/search';
import { groupsMockData } from '../../mockData/group';

export type ExpenseProps = {};

export const ExpensePage: React.FC<ExpenseProps> = React.memo((props: ExpenseProps) => {
    const searchProps: SearchProps = React.useMemo(() => {
        return {
            groups: groupsMockData,
            group: 2,
            month: 10,
            years: [2019, 2020],
            year: 2020
        };
    }, []);

    return (
        <>
            Expense page
            <br></br>
            <SearchComponent {...searchProps} />
        </>
    );
});
