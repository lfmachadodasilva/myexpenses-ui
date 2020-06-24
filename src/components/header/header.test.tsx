import { wait } from '@testing-library/react';
import { HeaderPageObject } from './header.pageTest';
import { Routes } from '../../pages/routes';
import { signOut } from '../../services/authService';

jest.mock('../../services/authService');
const mockSignOut = signOut as jest.Mock;

describe('<Header />', () => {
    afterEach(() => {
        mockSignOut.mockClear();
    });

    test('should redirect', async () => {
        const page = new HeaderPageObject();
        await page.initialiseComponent();

        page.mockClear();
        page.clickGroups();
        page.checkPage(Routes.groups);

        page.mockClear();
        page.clickLabels();
        page.checkPage(Routes.labels);

        page.mockClear();
        page.clickExpenses();
        page.checkPage(Routes.expenses);

        page.mockClear();
        page.clickAvatar();
        page.checkPage(Routes.auth);

        page.mockClear();
        page.clickTitle();
        page.checkPage(Routes.home);
    });

    test('should redirect to home after logout', async () => {
        mockSignOut.mockImplementation(() => Promise.resolve());

        const page = new HeaderPageObject();
        await page.initialiseComponent({
            displayName: 'testDisplayName',
            email: 'test@test.com',
            photoURL: 'photo-location'
        });

        page.mockClear();
        page.clickLogout();

        await wait(() => page.checkPage(Routes.home));
        await wait(() => expect(mockSignOut).toBeCalled());
    });
});
