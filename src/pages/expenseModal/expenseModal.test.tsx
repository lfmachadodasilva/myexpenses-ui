import { wait } from '@testing-library/react';

import { setConfiguration } from '../../configurations/configManager';
import { AxiosMock } from '../../helpers/axiosMock';
import { expensesFullMockData, expensesMockData } from '../../mockData/expense';
import { globalMockData } from '../../mockData/global';
import { labelsMockData } from '../../mockData/label';
import { ApiType } from '../../models/config';
import { StatusCodes } from '../../services/base';
import { ExpenseModalProps, ExpenseModalType } from './expenseModal';
import { ExpenseModalTestObject } from './expenseModal.testObject';

async function defaultInitialise(props: Partial<ExpenseModalProps> = {}) {
    const obj = new ExpenseModalTestObject();
    obj.global = globalMockData;
    await obj.initialiseObject(props);

    return obj;
}

describe('<ExpenseModalPage />', () => {
    let axiosMock: AxiosMock;

    beforeEach(() => {
        setConfiguration({
            apiUrl: ApiType.TEST_API
        });

        axiosMock = new AxiosMock();
        axiosMock.onGet('/api/label').reply(StatusCodes.OK, labelsMockData);
        axiosMock.onPost('/api/expense').reply(StatusCodes.OK, expensesMockData[0]);
        axiosMock.onPut('/api/expense').reply(StatusCodes.OK);
    });

    afterEach(() => {
        axiosMock.reset();
    });

    describe('add mode', () => {
        test('happy path', async () => {
            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                type: ExpenseModalType.ADD,
                show: true,
                onAction: mockOnAction,
                onHide: jest.fn()
            });

            // check title
            expect(obj.getByText('Add new expense')).toBeInTheDocument();
            // check action button
            expect(obj.getByText('Add')).toBeInTheDocument();

            // with fields should be disabled action button
            expect(obj.getByText('Add')).toHaveAttribute('disabled');

            obj.makeReadyToAdd();

            await wait(() => {
                expect(obj.getByText('Add')).not.toHaveAttribute('disabled');
            });

            // main action
            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.postSpy).toHaveBeenCalled();
                expect(mockOnAction).toHaveBeenCalled();
            });
        });

        test('fail to add', async () => {
            axiosMock.onPost('/api/expense').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                type: ExpenseModalType.ADD,
                show: true,
                onAction: mockOnAction
            });

            obj.makeReadyToAdd();

            await wait(() => {
                expect(obj.getByText('Add')).not.toHaveAttribute('disabled');
            });

            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.postSpy).toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Add')).toHaveAttribute('disabled');
        });
    });

    describe('edit mode', () => {
        test('happy path', async () => {
            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                type: ExpenseModalType.EDIT,
                show: true,
                onAction: mockOnAction,
                expense: expensesFullMockData[0]
            });

            // check title
            expect(obj.getByText('Edit expense')).toBeInTheDocument();
            // check action button
            expect(obj.getByText('Edit')).toBeInTheDocument();

            expect(obj.getByText('Edit')).not.toHaveAttribute('disabled');

            // main action
            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.putSpy).toHaveBeenCalled();
                expect(mockOnAction).toHaveBeenCalled();
            });
        });

        test('fail to edit', async () => {
            axiosMock.onPut('/api/expense').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                type: ExpenseModalType.EDIT,
                show: true,
                onAction: mockOnAction,
                expense: expensesFullMockData[0]
            });

            expect(obj.getByText('Edit')).not.toHaveAttribute('disabled');

            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.putSpy).toHaveBeenCalled();
                expect(mockOnAction).not.toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Edit')).toHaveAttribute('disabled');
        });
    });

    describe('duplicate mode', () => {
        test('happy path', async () => {
            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                type: ExpenseModalType.DUPLICATE,
                show: true,
                onAction: mockOnAction,
                expense: expensesFullMockData[0]
            });

            // check title
            expect(obj.getByText('Duplicate expense')).toBeInTheDocument();
            // check action button
            expect(obj.getByText('Duplicate')).toBeInTheDocument();

            expect(obj.getByText('Duplicate')).not.toHaveAttribute('disabled');

            // main action
            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.postSpy).toHaveBeenCalled();
                expect(mockOnAction).toHaveBeenCalled();
            });
        });

        test('fail to edit', async () => {
            axiosMock.onPost('/api/expense').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                type: ExpenseModalType.DUPLICATE,
                show: true,
                onAction: mockOnAction,
                expense: expensesFullMockData[0]
            });

            expect(obj.getByText('Duplicate')).not.toHaveAttribute('disabled');

            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.postSpy).toHaveBeenCalled();
                expect(mockOnAction).not.toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Duplicate')).toHaveAttribute('disabled');
        });
    });
});
