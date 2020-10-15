import { fireEvent, wait } from '@testing-library/react';
import { setConfiguration } from '../../configurations/configManager';
import { loginWithEmail, loginWithFacebook } from '../../services/auth';
import { Routes } from '../routes';
import { AuthProps } from './auth';
import { AuthTestObject } from './auth.testObject';

jest.mock('../../services/auth');
const mockLoginWithEmail = loginWithEmail as jest.Mock;
const mockLoginWithFacebook = loginWithFacebook as jest.Mock;

async function defaultInitialise(props: Partial<AuthProps> = {}) {
    const obj = new AuthTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<AuthPage />', () => {
    beforeEach(() => {
        mockLoginWithEmail.mockClear();
        mockLoginWithFacebook.mockClear();
        setConfiguration();
    });

    test('should render', async () => {
        const obj = await defaultInitialise();

        expect(obj.queryByText('Login by email')).toBeInTheDocument();
        expect(obj.queryByText('Login by Facebook')).toBeInTheDocument();
    });

    test('should login by facebook', async () => {
        mockLoginWithFacebook.mockImplementation(() => Promise.resolve());

        const obj = await defaultInitialise();

        obj.clickGetByText('Facebook');

        await wait(() => {
            expect(mockLoginWithFacebook).toBeCalled();
            expect(obj.checkPage(Routes.home));
        });

        mockLoginWithFacebook.mockImplementation(() => Promise.reject());
        obj.rerender();

        obj.clickGetByText('Facebook');

        await wait(() => {
            expect(mockLoginWithFacebook).toBeCalledTimes(2);
            expect(obj.queryByText('Something went wrong. Try again later.'));
        });
    });

    test('should login by email', async () => {
        mockLoginWithEmail.mockImplementation(() => Promise.resolve());

        const obj = await defaultInitialise();

        obj.clickGetByText('Login');

        await wait(() => {
            expect(mockLoginWithEmail).toBeCalledTimes(1);
            expect(obj.checkPage(Routes.home));
        });

        mockLoginWithEmail.mockImplementation(() => Promise.reject());
        obj.rerender();

        obj.clickGetByText('Login');

        await wait(() => {
            expect(mockLoginWithEmail).toBeCalledTimes(2);
            expect(obj.queryByText('Something went wrong. Try again later.'));
        });
    });
});
