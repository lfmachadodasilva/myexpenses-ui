import { DialogPageObject } from './dialog.pageTest';
import { fireEvent, wait } from '@testing-library/react';

describe('<DialogComponent />', () => {
    test('should show the content and action button', async () => {
        const page = new DialogPageObject();
        await page.initialiseComponent({
            show: true,
            actionText: 'actionText',
            disableAction: false,
            onAction: jest.fn(),
            onClose: jest.fn()
        });
        expect(page.content).toBeInTheDocument();
        expect(page.getElement('actionText')).toBeInTheDocument();
    });

    test('should close after click in the X (close) button', async () => {
        const actionMock = jest.fn();
        const closeMock = jest.fn();

        const page = new DialogPageObject();
        await page.initialiseComponent({
            show: true,
            actionText: 'actionText',
            disableAction: false,
            onAction: actionMock,
            onClose: closeMock
        });

        page.clickCloseButton();

        await wait(() => expect(closeMock).toBeCalled());
    });

    test('should call action button', async () => {
        const actionMock = jest.fn().mockImplementation(() => Promise.resolve());
        const closeMock = jest.fn();

        const page = new DialogPageObject();
        await page.initialiseComponent({
            show: true,
            actionText: 'actionText',
            disableAction: false,
            onAction: actionMock,
            onClose: closeMock
        });

        page.clickActionButton('actionText');

        await wait(() => expect(actionMock).toBeCalled());
    });

    test('should show fail message', async () => {
        const actionMock = jest.fn().mockImplementation(() => Promise.reject());
        const closeMock = jest.fn();

        const page = new DialogPageObject();
        await page.initialiseComponent({
            show: true,
            actionText: 'actionText',
            disableAction: false,
            onAction: actionMock,
            onClose: closeMock
        });

        page.clickActionButton('actionText');

        await wait(() => expect(page.getElement('COMMON.ERROR')).toBeInTheDocument());
        expect(actionMock).toBeCalled();
    });

    test('should show disabled action button', async () => {
        const page = new DialogPageObject();
        await page.initialiseComponent({
            show: true,
            actionText: 'actionText',
            disableAction: false,
            onAction: jest.fn(),
            onClose: jest.fn()
        });

        // waiting to finish loading
        expect(page.actionButtonIsDisabled);

        await page.rerender({
            show: true,
            actionText: 'actionText',
            disableAction: true,
            onAction: jest.fn(),
            onClose: jest.fn()
        });

        // forced to be disabled
        expect(page.actionButtonIsDisabled);

        await page.rerender({
            show: true,
            actionText: 'actionText',
            disableAction: false
        });

        // no action asign
        expect(page.actionButtonIsDisabled);
    });
});
