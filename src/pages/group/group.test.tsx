import { fireEvent, wait, within } from '@testing-library/react';
import { setConfiguration } from '../../configurations/configManager';
import { AxiosMock } from '../../helpers/axiosMock';
import { groupsFullMockData } from '../../mockData/group';
import { usersMockData } from '../../mockData/user';
import { ApiType } from '../../models/config';
import { StatusCodes } from '../../services/base';
import { GroupProps } from './group';
import { GroupTestObject } from './group.testObject';

async function defaultInitialise(props: Partial<GroupProps> = {}) {
    const obj = new GroupTestObject();

    obj.user = {
        uid: usersMockData[1].id,
        displayName: usersMockData[1].displayName,
        email: usersMockData[1].email
    } as firebase.User;

    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<GroupPage />', () => {
    let axiosMock: AxiosMock;

    beforeEach(() => {
        setConfiguration({ apiUrl: ApiType.TEST_API });

        axiosMock = new AxiosMock();
        axiosMock.onGet('/api/user').reply(StatusCodes.OK, usersMockData);
        axiosMock.onGet('/api/group/full').reply(StatusCodes.OK, groupsFullMockData);
        axiosMock.onPost('/api/group').reply(StatusCodes.OK, groupsFullMockData[0]);
        axiosMock.onPut('/api/group').reply(StatusCodes.OK);
        axiosMock.onDelete('/api/group/1').reply(StatusCodes.OK);
    });

    afterEach(() => {
        axiosMock.reset();
        axiosMock.mockClearSpy();
    });

    test('show all groups', async () => {
        const obj = await defaultInitialise();

        // check the title
        expect(obj.getByText('Groups')).toBeInTheDocument();

        // wait to show all available groups for this user
        await wait(() => {
            groupsFullMockData.forEach(group => {
                expect(obj.getByText(group.name)).toBeInTheDocument();
            });
        });
    });

    test('fail to get all groups', async () => {
        axiosMock.onGet('/api/group/full').reply(StatusCodes.ERROR);

        const obj = await defaultInitialise();

        await wait(() => {
            expect(axiosMock.getSpy).toHaveBeenCalled();
            expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
        });
    });

    test('add new group', async () => {
        const obj = await defaultInitialise();

        obj.clickAdd();

        // wait to show the modal
        await obj.modalObject.waitModalToShow();

        fireEvent.click(obj.modalObject.CloseButton as Element);

        // wait to hide the modal
        await obj.modalObject.waitModalToHide();

        obj.clickAdd();

        // wait to show the modal
        await obj.modalObject.waitModalToShow();

        // add name and select a user
        await obj.modalObject.makeReadyToAdd();

        obj.modalObject.clickAdd();

        // wait to hide the modal and refresh main page
        await obj.modalObject.waitModalToHide();

        await wait(() => {
            // 1 - get all users
            // 2 - get all groups
            // 3 - after add new group main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(3);
        });
    });

    test('edit group', async () => {
        const obj = await defaultInitialise();

        // open modal on edit mode and close
        await obj.itemObject.clickEditFor(1);
        await obj.modalObject.waitModalToShow();
        obj.modalObject.clickClose();
        await obj.modalObject.waitModalToHide();

        // open modal on edit mode and edit
        await obj.itemObject.clickEditFor(1);
        await obj.modalObject.waitModalToShow();

        // hack to avoid duplicate "Edit" labels
        const { getByText } = within(obj.modalObject.Modal as HTMLElement);
        fireEvent.click(getByText('Edit'));

        await obj.modalObject.waitModalToHide();

        await wait(() => {
            // 1 - get all users
            // 2 - get all groups
            // 3 - after edit group main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(3);

            expect(axiosMock.putSpy).toHaveBeenCalledTimes(1);
        });
    });

    test('delete group', async () => {
        const obj = await defaultInitialise();

        await obj.itemObject.clickDeleteFor(1);

        await wait(() => {
            // 1 - get all groups
            // 2 - after delete group main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(2);

            expect(axiosMock.deleteSpy).toHaveBeenCalledTimes(1);
        });
    });

    test('fail to delete group', async () => {
        axiosMock.onDelete('/api/group/1').reply(StatusCodes.ERROR);

        const obj = await defaultInitialise();

        await obj.itemObject.clickDeleteFor(1);

        await wait(() => {
            expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            expect(axiosMock.deleteSpy).toHaveBeenCalledTimes(1);
        });
    });
});
