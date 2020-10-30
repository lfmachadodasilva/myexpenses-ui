import React from 'react';
import { Router } from 'react-router-dom';
import { UserContext, userContext } from '../../contexts/user';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { HeaderComponent, HeaderProps } from './header';

export class HeaderTestObject extends TestObjectBase<HeaderProps> {
    defaultParams: Partial<HeaderProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    user!: UserContext;

    protected initialiseSubObjects(): void {}

    protected render(props: HeaderProps) {
        return (
            <userContext.Provider value={this.user}>
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
