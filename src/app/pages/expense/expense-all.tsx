import React, { useContext } from 'react';

import SearchComponent from '../../components/search/search';
import { RouteComponentProps } from 'react-router-dom';
import { globalContext } from '../../contexts/global-context';
import { LocalStorageHelper } from '../../helpers/localStorage-helper';

const ExpenseAllPage: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const global = useContext(globalContext);

    const search = async (group: string, month: number, year: number) => {
        LocalStorageHelper.setGroup(group);

        global.group = group;
        global.month = month;
        global.year = year;

        // TODO test
        // await global.groupReducer.getGroups();

        // TODO search
    };

    return (
        <div key='ExpenseAllPage'>
            <SearchComponent search={search} />
            <h1> Expense All Page </h1>
        </div>
    );
};

export default ExpenseAllPage;
