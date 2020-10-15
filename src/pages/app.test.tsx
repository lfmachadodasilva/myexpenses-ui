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

    test('should render with user', async () => {
        mockUseAuth.mockImplementation(() => {
            return { user: null, initialising: false };
        });

        const obj = await defaultInitialise();

        expect(obj.getText('MyExpenses')).toBeInTheDocument();
        expect(obj.getText('Login')).toBeInTheDocument();
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

        expect(obj.getText('MyExpenses')).toBeInTheDocument();
        expect(obj.getText('User')).toBeInTheDocument();
    });
});
