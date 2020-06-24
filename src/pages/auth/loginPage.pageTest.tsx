import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

import { BasePage } from '../../helpers/basePageTest';
import { LoginPage, LoginProps } from './loginPage';

export class LoginPageObject extends BasePage<LoginProps> {
    defaultParams: Partial<LoginProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    checkText(text: string) {
        expect(this.queryByText(text)).toBeInTheDocument();
    }

    insertText(id: string, value: string) {
        const input = this.querySelector(id) as Element;
        fireEvent.change(input, { target: { value: value } });
    }

    findText(text: string) {
        return this.queryByText(text);
    }

    checkPage(page: string) {
        expect(this.historyMock.push).toBeCalledWith(page);
    }

    mockClear() {
        this.historyMock.push.mockClear();
        this.historyMock.listen.mockClear();
    }

    protected initialiseSubComponents(): void {}

    protected render(props: LoginProps, _user: any = null, _initialising: boolean = false) {
        return (
            <Router history={this.historyMock as any}>
                <LoginPage {...props} />
            </Router>
        );
    }
}
