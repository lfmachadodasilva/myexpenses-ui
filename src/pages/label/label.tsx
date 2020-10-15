import React from 'react';

import { SearchComponent, SearchProps } from '../../components/search/search';

export type LabelProps = {};

export const LabelPage: React.FC<LabelProps> = React.memo((props: LabelProps) => {
    const searchProps: SearchProps = {
        groups: [
            { id: 1, name: 'Group 1' },
            { id: 2, name: 'Group 2' }
        ],
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
