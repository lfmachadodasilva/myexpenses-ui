import React from 'react';
import { Router } from 'react-router-dom';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { AuthPage, AuthProps } from './auth';

export class AuthTestObject extends TestObjectBase<AuthProps> {
    defaultParams: Partial<AuthProps> = {};
    historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    protected initialiseSubObjects(): void {}

    protected render(props: AuthProps) {
        return (
            <Router history={this.historyMock as any}>
                <AuthPage {...props} />{' '}
            </Router>
        );
    }

    checkPage(page: string) {
        expect(this.historyMock.push).toBeCalledWith(page);
    }
}
