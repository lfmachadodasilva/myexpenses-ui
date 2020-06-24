import { wait, fireEvent } from '@testing-library/react';
import { loginWithEmail, createUserWithEmail, resetPassword } from '../../services/authService';
import { LoginPageObject } from './loginPage.pageTest';
import { LoginPageType } from './loginPage';
import { Routes } from '../routes';

jest.mock('../../services/authService');
const mockLoginWithEmail = loginWithEmail as jest.Mock;
const mockCreateUserWithEmail = createUserWithEmail as jest.Mock;
const mockResetPassword = resetPassword as jest.Mock;

describe('<LoginPage />', () => {
    afterEach(() => {
        mockLoginWithEmail.mockClear();
        mockCreateUserWithEmail.mockClear();
        mockResetPassword.mockClear();
    });

    test.each([
        [LoginPageType.LOGIN, mockLoginWithEmail],
        [LoginPageType.REGISTER, mockCreateUserWithEmail],
        [LoginPageType.RESET, mockResetPassword]
    ])('%p', async (type, mockAction) => {
        const page = new LoginPageObject();
        await page.initialiseComponent({ type });

        // check items
        page.checkText(`AUTH.${type}.TITLE`);
        if (type !== LoginPageType.RESET) {
            page.checkText(`AUTH.${type}.BUTTON`);
        }

        // check if the button is disabled if email & password are empty
        const button = page.findText(`AUTH.${type}.BUTTON`)?.closest('button');
        expect(button).toHaveAttribute('disabled');

        // add values to input
        page.insertText(`#${type}-email-required`, 'user@email.com');
        if (type !== LoginPageType.RESET) {
            page.insertText(`#${type}-password-required`, 'Password1');
        }

        // check if the action button has been enabled
        expect(button).not.toHaveAttribute('disabled');

        // simulate and check error
        const errorText = 'msg from server';
        mockAction.mockImplementation(() => Promise.reject({ message: errorText }));
        fireEvent.click(button as Element);
        await wait(() => page.checkText(errorText));

        // simulate and check success
        mockAction.mockImplementation(() => Promise.resolve());
        fireEvent.click(button as Element);
        await wait(() => page.checkPage(Routes.home));
    });
});
