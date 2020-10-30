import { setConfiguration } from '../../configurations/configManager';
import { usersMockData } from '../../mockData/user';
import { ApiType } from '../../models/config';
import { GroupModalProps } from './groupModal';
import { GroupModalTestObject } from './groupModal.testObject';
import { StatusCodes } from '../../services/base';
import { wait } from '@testing-library/react';
import { AxiosMock } from '../../helpers/axiosMock';
import { groupsFullMockData, groupsMockData } from '../../mockData/group';
import { defaultUserContext } from '../../contexts/user';

async function defaultInitialise(props: Partial<GroupModalProps> = {}) {
    const obj = new GroupModalTestObject();
    obj.user = {
        ...defaultUserContext,
        user: {
            uid: usersMockData[1].id,
            displayName: usersMockData[1].displayName,
            email: usersMockData[1].email
        } as firebase.User
    };
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<GroupModalPage />', () => {
    let axiosMock: AxiosMock;

    beforeEach(() => {
        setConfiguration({
            apiUrl: ApiType.TEST_API
        });

        axiosMock = new AxiosMock();
        axiosMock.onGet('/api/user').reply(StatusCodes.OK, usersMockData);
        axiosMock.onPost('/api/group').reply(StatusCodes.OK, groupsMockData[0]);
        axiosMock.onPut('/api/group').reply(StatusCodes.OK);
    });

    afterEach(() => {
        axiosMock.reset();
    });

    describe('add mode', () => {
        test('happy path', async () => {
            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction
            });

            // check title
            expect(obj.getByText('Add new group')).toBeInTheDocument();
            // check action button
            expect(obj.getByText('Add')).toBeInTheDocument();

            await wait(() => {
                expect(axiosMock.getSpy).toHaveBeenCalled();
                expect(obj.queryByText('User 1 (user1@email.com)')).toBeInTheDocument();
                expect(obj.queryByText('You')).toBeInTheDocument();
            });

            // with empty name and users should be disabled action button
            expect(obj.getByText('Add')).toHaveAttribute('disabled');

            // add name
            obj.insertText('group-name-field', 'New group');
            // select one user
            obj.insertText('group-users-field', ['1']);

            await wait(() => {
                expect(obj.getByText('Add')).not.toHaveAttribute('disabled');
            });

            // main action
            obj.clickAdd();

            await wait(() => {
                expect(axiosMock.postSpy).toHaveBeenCalled();
                expect(mockOnAction).toHaveBeenCalled();
            });
        });

        test('fail to add', async () => {
            axiosMock.onPost('/api/group').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction
            });

            // add name
            obj.insertText('group-name-field', 'New group');
            // select one user
            obj.insertText('group-users-field', ['1']);

            await wait(() => {
                expect(obj.getByText('Add')).not.toHaveAttribute('disabled');
            });

            obj.clickAdd();

            await wait(() => {
                expect(axiosMock.postSpy).toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Add')).toHaveAttribute('disabled');
        });

        test('fail to load users', async () => {
            axiosMock.onGet('/api/user').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction
            });

            await wait(() => {
                expect(axiosMock.getSpy).toHaveBeenCalled();
                expect(mockOnAction).not.toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Add')).toHaveAttribute('disabled');
        });
    });

    describe('edit mode', () => {
        test('happy path', async () => {
            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction,
                group: groupsFullMockData[0]
            });

            // check title
            expect(obj.getByText('Edit group')).toBeInTheDocument();
            // check action button
            expect(obj.getByText('Edit')).toBeInTheDocument();

            await wait(() => {
                expect(axiosMock.getSpy).toHaveBeenCalled();
                expect(obj.queryByText('User 1 (user1@email.com)')).toBeInTheDocument();
                expect(obj.queryByText('You')).toBeInTheDocument();
            });

            expect(obj.getByText('Edit')).not.toHaveAttribute('disabled');

            // main action
            obj.clickEdit();

            await wait(() => {
                expect(axiosMock.putSpy).toHaveBeenCalled();
                expect(mockOnAction).toHaveBeenCalled();
            });
        });

        test('fail to edit', async () => {
            axiosMock.onPut('/api/group').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction,
                group: groupsFullMockData[0]
            });

            await wait(() => {
                expect(axiosMock.getSpy).toHaveBeenCalled();
                expect(obj.queryByText('User 1 (user1@email.com)')).toBeInTheDocument();
            });

            expect(obj.getByText('Edit')).not.toHaveAttribute('disabled');

            obj.clickEdit();

            await wait(() => {
                expect(axiosMock.putSpy).toHaveBeenCalled();
                expect(mockOnAction).not.toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Edit')).toHaveAttribute('disabled');
        });

        test('fail to load users', async () => {
            axiosMock.onGet('/api/user').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction,
                group: groupsFullMockData[0]
            });

            await wait(() => {
                expect(axiosMock.getSpy).toHaveBeenCalled();
                expect(mockOnAction).not.toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Edit')).toHaveAttribute('disabled');
        });
    });
});
