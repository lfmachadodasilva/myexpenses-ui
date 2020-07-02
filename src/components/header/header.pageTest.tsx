import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

import { BasePage } from '../../helpers/basePageTest';
import { Header, HeaderProps } from './header';
import { userContext } from '../../contexts/userContext';

export class HeaderPageObject extends BasePage<HeaderProps> {
    defaultParams: Partial<HeaderProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    clickTitle() {
        fireEvent.click(this.getByText('HEADER.TITLE'));
    }
    clickGroups() {
        fireEvent.click(this.getByText('HEADER.GROUPS'));
    }
    clickLabels() {
        fireEvent.click(this.getByText('HEADER.LABELS'));
    }
    clickExpenses() {
        fireEvent.click(this.getByText('HEADER.EXPENSES'));
    }
    clickAvatar() {
        fireEvent.click(this.getByTestId('avatar-element'));
    }
    clickLogout() {
        fireEvent.click(this.getByText('HEADER.LOGOUT'));
    }

    checkPage(page: string) {
        expect(this.historyMock.push).toBeCalledWith(page);
    }

    mockClear() {
        this.historyMock.push.mockClear();
        this.historyMock.listen.mockClear();
    }

    protected initialiseSubComponents(): void {}

    protected render(props: HeaderProps) {
        return (
            <userContext.Provider
                value={{
                    user: null,
                    initialising: false,
                    isReady: true
                }}
            >
                <Router history={this.historyMock as any}>
                    <Header />
                </Router>
            </userContext.Provider>
        );
    }

    get avatarMenuElement() {
        return this.queryByTestId('avatar-menu-element');
    }
}
