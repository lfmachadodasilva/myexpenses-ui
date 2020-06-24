import { wait, fireEvent } from '@testing-library/react';

import { loginWithFacebook } from '../../services/authService';
import { Routes } from '../routes';
import { FacebookPageObject } from './facebookPage.pageTest';

jest.mock('../../services/authService');
const mockLoginWithFacebook = loginWithFacebook as jest.Mock;

describe('<FacebookPage />', () => {
    afterEach(() => {
        mockLoginWithFacebook.mockClear();
    });

    test('test', async () => {
        const page = new FacebookPageObject();
        await page.initialiseComponent();

        const button = page.findText('AUTH.FACEBOOK.BUTTON')?.closest('button');
        expect(button).not.toHaveAttribute('disabled');

        // simulate and check error
        mockLoginWithFacebook.mockImplementation(() => Promise.reject());
        fireEvent.click(button as Element);
        await wait(() => page.checkError());

        // simulate and check success
        mockLoginWithFacebook.mockImplementation(() => Promise.resolve());
        fireEvent.click(button as Element);
        await wait(() => page.checkPage(Routes.home));
    });
});
