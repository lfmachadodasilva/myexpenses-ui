import React from 'react';
import { Router } from 'react-router-dom';

import { BasePage } from '../../helpers/basePageTest';
import { SearchComponent, SearchProps } from './search';
import { fireEvent, wait } from '@testing-library/react';
import { LoadingPageObject } from '../loading/loading.pageTest';

export class SearchPageObject extends BasePage<SearchProps> {
    defaultParams: Partial<SearchProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    loadingPage = new LoadingPageObject();

    protected initialiseSubComponents(): void {
        this.loadingPage.initialiseWithParentComponent(this.wrapper);
    }

    clickExpandElement() {
        fireEvent.click(this.getByTestId('expand-element'));
    }

    clickSearchButton() {
        fireEvent.click(this.searchButton as Element);
    }

    checkPage(page: any) {
        expect(this.historyMock.push).toBeCalledWith(page);
    }

    protected render(props: SearchProps) {
        return (
            <Router history={this.historyMock as any}>
                <SearchComponent {...props} />
            </Router>
        );
    }

    get collapse() {
        return this.querySelector('.MuiCollapse-hidden');
    }

    get title() {
        return this.getByText('SEARCH.TITLE');
    }

    get searchButton() {
        return this.getByText('SEARCH.BUTTON');
    }

    get disabledComponent() {
        return this.querySelector('.MuiButtonBase-root.MuiAccordionSummary-root.Mui-disabled.Mui-disabled');
    }
}
