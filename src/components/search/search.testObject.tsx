import React from 'react';

import { GlobalContext, globalContext } from '../../contexts/global';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { yearsMockData } from '../../mockData/expense';
import { groupsMockData } from '../../mockData/group';
import { GroupModel } from '../../models/group';
import { SearchComponent, SearchProps } from './search';

export class SearchTestObject extends TestObjectBase<SearchProps> {
    defaultParams: Partial<SearchProps> = {};

    global!: GlobalContext;

    protected initialiseSubObjects(): void {}

    protected render(props: SearchProps) {
        return (
            <globalContext.Provider
                value={{
                    isLoading: this.global.isLoading,

                    groups: this.global.groups,
                    years: this.global.years,

                    group: this.global.group,
                    month: this.global.month,
                    year: this.global.year
                }}
            >
                <SearchComponent {...props} />
            </globalContext.Provider>
        );
    }

    get loading() {
        return this.getByTestId('search-loading');
    }
}
