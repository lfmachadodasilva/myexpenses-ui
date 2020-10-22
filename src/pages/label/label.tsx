import React from 'react';

import { SearchComponent, SearchProps } from '../../components/search/search';
import { groupsMockData } from '../../mockData/group';

export type LabelProps = {};

export const LabelPage: React.FC<LabelProps> = React.memo((props: LabelProps) => {
    const searchProps: SearchProps = {
        groups: groupsMockData,
        group: 2,
        month: 10,
        years: [2019, 2020],
        year: 2020
    };
    return (
        <>
            Label page
            <br></br>
            <SearchComponent {...searchProps} />
        </>
    );
});
