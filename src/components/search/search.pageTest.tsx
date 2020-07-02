import React from 'react';
import { Router } from 'react-router-dom';

import { BasePage } from '../../helpers/basePageTest';
import { SearchComponent, SearchProps } from './search';

export class SearchPageObject extends BasePage<SearchProps> {
    defaultParams: Partial<SearchProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    protected initialiseSubComponents(): void {}

    protected render(props: SearchProps) {
        return (
            <Router history={this.historyMock as any}>
                <SearchComponent {...props} />
            </Router>
        );
    }
}
