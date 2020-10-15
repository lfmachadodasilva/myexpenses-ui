import React from 'react';
import { Router } from 'react-router-dom';
import { userContext } from '../../contexts/user';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { HeaderComponent, HeaderProps } from './header';

export class HeaderTestObject extends TestObjectBase<HeaderProps> {
    defaultParams: Partial<HeaderProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    user: firebase.User | null = null;
    initialising: boolean = false;
    isReady: boolean = false;

    protected initialiseSubObjects(): void {}

    protected render(props: HeaderProps) {
        return (
            <userContext.Provider
                value={{
                    user: this.user,
                    initialising: this.initialising,
                    isReady: this.isReady
                }}
            >
                <Router history={this.historyMock as any}>
                    <HeaderComponent {...props} />
                </Router>
            </userContext.Provider>
        );
    }

    mockClear() {
        this.historyMock.push.mockClear();
        this.historyMock.listen.mockClear();
    }

    checkPage(page: string) {
        expect(this.historyMock.push).toBeCalledWith(page);
    }

    waitForInitialLoad(): Promise<void> {
        return Promise.resolve();
    }
}
