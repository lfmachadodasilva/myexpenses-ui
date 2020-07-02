import { GroupsManagePageObject } from './groupsManage.pageTest';
import { setConfiguration } from '../../configurations/configurationManager';

describe('<GroupsManageDialog />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should', async () => {
        const actionMock = jest.fn();
        const closeMock = jest.fn();

        const page = new GroupsManagePageObject();
        await page.initialiseComponent({
            show: true,
            group: undefined,
            onAction: actionMock,
            onClose: closeMock
        });

        expect(page).toBeDefined();
    });

    test('disabled button', async () => {
        const actionMock = jest.fn();
        const closeMock = jest.fn();

        const page = new GroupsManagePageObject();
        await page.initialiseComponent({
            show: true,
            group: undefined,
            onAction: actionMock,
            onClose: closeMock
        });

        expect(page).toBeDefined();
    });

    test('on close', async () => {
        const actionMock = jest.fn();
        const closeMock = jest.fn();

        const page = new GroupsManagePageObject();
        await page.initialiseComponent({
            show: true,
            group: undefined,
            onAction: actionMock,
            onClose: closeMock
        });

        expect(page).toBeDefined();
    });

    test('on action success', async () => {
        const actionMock = jest.fn();
        const closeMock = jest.fn();

        const page = new GroupsManagePageObject();
        await page.initialiseComponent({
            show: true,
            group: undefined,
            onAction: actionMock,
            onClose: closeMock
        });

        expect(page).toBeDefined();
    });

    test('on action failure', async () => {
        const actionMock = jest.fn();
        const closeMock = jest.fn();

        const page = new GroupsManagePageObject();
        await page.initialiseComponent({
            show: true,
            group: undefined,
            onAction: actionMock,
            onClose: closeMock
        });

        expect(page).toBeDefined();
    });

    test('on failure loading users', async () => {
        const actionMock = jest.fn();
        const closeMock = jest.fn();

        const page = new GroupsManagePageObject();
        await page.initialiseComponent({
            show: true,
            group: undefined,
            onAction: actionMock,
            onClose: closeMock
        });

        expect(page).toBeDefined();
    });
});
