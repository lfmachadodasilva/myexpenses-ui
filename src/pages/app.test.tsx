import { wait } from '@testing-library/react';
import { setConfiguration } from '../configurations/configManager';
import { useAuth } from '../services/auth';
import { AppProps } from './app';
import { AppTestObject } from './app.testObject';

jest.mock('../services/auth');
const mockUseAuth = useAuth as jest.Mock;

async function defaultInitialise(props: Partial<AppProps> = {}) {
    const obj = new AppTestObject();

    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<AppComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test.skip('should render with no user', async () => {
        mockUseAuth.mockImplementation(() => {
            return {
                user: null,
                initialising: false,
                isReady: true
            };
        });

        const obj = await defaultInitialise();

        expect(obj.getByText('MyExpenses')).toBeInTheDocument();
        expect(obj.getByText('Login')).toBeInTheDocument();

        // go to expense page
        obj.clickByText('Expense');

        await wait(() => {
            expect(obj.queryByText('Login by email')).toBeInTheDocument();
            expect(obj.queryByText('Login by Facebook')).toBeInTheDocument();
        });
    });

    test('should render with user', async () => {
        mockUseAuth.mockImplementation(() => {
            return {
                user: {
                    displayName: 'User Display Name',
                    getIdTokenResult: jest.fn(() => Promise.resolve({ token: 'token' }))
                },
                initialising: false,
                isReady: true
            };
        });

        const obj = await defaultInitialise();

        expect(obj.getByText('MyExpenses')).toBeInTheDocument();
        expect(obj.getByText('User')).toBeInTheDocument();
    });
});
