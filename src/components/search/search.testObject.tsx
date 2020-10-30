import React from 'react';
import { Router } from 'react-router';

import { GlobalContext, globalContext } from '../../contexts/global';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { SearchComponent, SearchProps } from './search';

export class SearchTestObject extends TestObjectBase<SearchProps> {
    defaultParams: Partial<SearchProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    global!: GlobalContext;

    protected initialiseSubObjects(): void {}

    protected render(props: SearchProps) {
        return (
            <globalContext.Provider value={this.global}>
                <Router history={this.historyMock as any}>
                    <SearchComponent {...props} />
                </Router>
            </globalContext.Provider>
        );
    }

    get loading() {
        return this.getByTestId('search-loading');
    }

    checkPageHaveBeenChanged() {
        expect(this.historyMock.push).toBeCalled();
    }
}
