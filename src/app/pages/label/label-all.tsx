import React, { useContext } from 'react';

import { globalContext } from '../../contexts/global-context';
import SearchComponent from '../../components/search/search';
import { LocalStorageHelper } from '../../helpers/localStorage-helper';

const LabelAllPage: React.FC = () => {
    const global = useContext(globalContext);

    const search = (group: string, month: number, year: number) => {
        LocalStorageHelper.setGroup(group);

        // update global context
        global.group = group;
        global.month = month;
        global.year = year;

        // TODO search
    };

    return (
        <div key='LabelAllPage'>
            <SearchComponent search={search} />
            <h1> Label All Page </h1>
        </div>
    );
};

export default LabelAllPage;
