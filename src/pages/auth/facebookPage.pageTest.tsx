import React from 'react';
import { Router } from 'react-router-dom';

import { BasePage } from '../../helpers/basePageTest';
import { FacebookProps, FacebookPage } from './facebookPage';

export class FacebookPageObject extends BasePage<FacebookProps> {
    defaultParams: Partial<FacebookProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    checkText(text: string) {
        expect(this.queryByText(text)).toBeInTheDocument();
    }

    checkActionDisabled(text: string) {
        const button = this.getByText(text).closest('button');
        expect(button).toHaveAttribute('disabled');
    }

    findText(text: string) {
        return this.queryByText(text);
    }

    checkPage(page: string) {
        expect(this.historyMock.push).toBeCalledWith(page);
    }

    checkError() {
        expect(this.getByTestId('facebook-close-icon')).toBeInTheDocument();
    }

    mockClear() {
        this.historyMock.push.mockClear();
        this.historyMock.listen.mockClear();
    }

    protected initialiseSubComponents(): void {}

    protected render(props: FacebookProps, _user: any = null, _initialising: boolean = false) {
        return (
            <Router history={this.historyMock as any}>
                <FacebookPage {...props} />
            </Router>
        );
    }
}
