import React from 'react';

import { SearchComponent } from '../../components/search/search';
import { globalContext } from '../../contexts/globalContext';

export const LabelsPage: React.FC = React.memo(() => {
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
            Search for {global.group?.name} - {global.month} - {global.year}
        </>
    );
});
