import { fireEvent, wait } from '@testing-library/react';
import { setConfiguration } from '../../configurations/configManager';
import { Routes } from '../../pages/routes';
import { signOut } from '../../services/auth';
import { HeaderProps } from './header';
import { HeaderTestObject } from './header.testObject';

jest.mock('../../services/auth');
const mockSignOut = signOut as jest.Mock;

async function defaultInitialise(
    props: Partial<HeaderProps> = {},
    user: firebase.User | null = null,
    initialising: boolean = false,
    isReady: boolean = true
) {
    const obj = new HeaderTestObject();

    obj.user = user;
    obj.initialising = initialising;
    obj.isReady = isReady;

    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    await obj.waitForInitialLoad();

    return obj;
}

describe('<HeaderComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should render the title', async () => {
        const obj = await defaultInitialise();

        expect(obj.queryByText('MyExpenses')).toBeInTheDocument();
    });

    test('should redirect', async () => {
        const obj = await defaultInitialise();

        obj.mockClear();
        obj.clickGetByText('Group');
        obj.checkPage(Routes.group);

        obj.mockClear();
        obj.clickGetByText('Label');
        obj.checkPage(Routes.label);

        obj.mockClear();
        obj.clickGetByText('Expense');
        obj.checkPage(Routes.expense);

        obj.mockClear();
        obj.clickGetByText('Login');
        obj.checkPage(Routes.auth);

        obj.mockClear();
        obj.clickGetByText('MyExpenses');
        obj.checkPage(Routes.home);
    });

    test('should redirect to settings', async () => {
        const obj = await defaultInitialise({}, { displayName: 'User Display Name' } as firebase.User, false, true);
        obj.mockClear();

        await wait(() => expect(obj.queryByText('User')).toBeInTheDocument());

        obj.clickGetByText('User');

        await wait(() => expect(obj.queryByText('Settings')).toBeInTheDocument());

        obj.clickGetByText('Settings');

        expect(obj.checkPage(Routes.settings));
    });

    test('should redirect to home after logout', async () => {
        const obj = await defaultInitialise({}, { displayName: 'User Display Name' } as firebase.User, false, true);
        obj.mockClear();

        await wait(() => expect(obj.queryByText('User')).toBeInTheDocument());

        obj.clickGetByText('User');

        await wait(() => expect(obj.queryByText('Logout')).toBeInTheDocument());

        obj.clickGetByText('Logout');

        await wait(() => {
            expect(mockSignOut).toBeCalled();
            expect(obj.checkPage(Routes.home));
        });
    });
});
