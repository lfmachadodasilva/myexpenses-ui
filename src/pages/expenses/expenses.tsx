import React from 'react';

import { globalContext } from '../../contexts/globalContext';
import { SearchComponent } from '../../components/search/search';

export const ExpensesPage: React.FC = React.memo(() => {
    const global = React.useContext(globalContext);

    console.log(global);

    return (
        <>
            <SearchComponent
                loading={global.isLoading}
                groups={global.groups}
                years={global.years}
                group={global.group}
                month={global.month}
                year={global.year}
            />
            Search for {global.group?.name} - {global.month} - {global.year}{' '}
        </>
    );
});
