import { fireEvent, wait, within } from '@testing-library/react';

import { setConfiguration } from '../../configurations/configManager';
import { AxiosMock } from '../../helpers/axiosMock';
import { expensesFullMockData } from '../../mockData/expense';
import { globalMockData } from '../../mockData/global';
import { labelsMockData } from '../../mockData/label';
import { ApiType } from '../../models/config';
import { StatusCodes } from '../../services/base';
import { ExpenseProps } from './expense';
import { ExpenseTestObject } from './expense.testObject';

async function defaultInitialise(props: Partial<ExpenseProps> = {}) {
    const obj = new ExpenseTestObject();
    obj.global = globalMockData;
    await obj.initialiseObject(props);

    return obj;
}

describe('<ExpensePage />', () => {
    let axiosMock: AxiosMock;

    beforeEach(() => {
        setConfiguration({ apiUrl: ApiType.TEST_API });

        axiosMock = new AxiosMock();
        axiosMock.onGet('/api/label').reply(StatusCodes.OK, labelsMockData);
        axiosMock.onGet('/api/expense/full').reply(StatusCodes.OK, expensesFullMockData);
        axiosMock.onPost('/api/expense').reply(StatusCodes.OK, expensesFullMockData[0]);
        axiosMock.onPut('/api/expense').reply(StatusCodes.OK);
        axiosMock.onDelete('/api/expense/1').reply(StatusCodes.OK);
    });

    afterEach(() => {
        axiosMock.reset();
        axiosMock.mockClearSpy();
    });

    test('summary', async () => {
        const obj = await defaultInitialise();
        [
            // titles
            'Expenses',
            'Total incoming',
            '7.22',
            'Total outcoming',
            '3.22',
            'Total left',
            '4.00 - 55.40%'
        ].forEach(x => expect(obj.getByText(x)).toBeInTheDocument());
    });

    test('show all expenses', async () => {
        const obj = await defaultInitialise();

        // check the title
        expect(obj.getByText('Expenses')).toBeInTheDocument();

        // wait to show all available expenses for this user
        await wait(() => {
            expensesFullMockData.forEach(e => {
                expect(obj.getByText(e.name)).toBeInTheDocument();
            });
        });
    });

    test('fail to get all expenses', async () => {
        axiosMock.onGet('/api/expense/full').reply(StatusCodes.ERROR);

        const obj = await defaultInitialise();

        await wait(() => {
            expect(axiosMock.getSpy).toHaveBeenCalled();
            expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
        });
    });

    test('add new expense', async () => {
        const obj = await defaultInitialise();

        obj.clickAdd();

        // wait to show the modal
        await obj.modalObject.modalTestObject.waitModalToShow();
        fireEvent.click(obj.modalObject.modalTestObject.CloseButton as Element);
        // wait to hide the modal
        await obj.modalObject.modalTestObject.waitModalToHide();

        obj.clickAdd();

        // wait to show the modal
        await obj.modalObject.modalTestObject.waitModalToShow();

        // add name and select a user
        await obj.modalObject.makeReadyToAdd();
        obj.modalObject.modalTestObject.clickAction();
        // wait to hide the modal and refresh main page
        await obj.modalObject.modalTestObject.waitModalToHide();

        await wait(() => {
            // 1 - get all expenses
            // 2 - after add new expense main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(2);
        });
    });

    test('edit expense', async () => {
        const obj = await defaultInitialise();

        // open modal on edit mode and close
        await obj.itemObject.clickEditFor(1);
        await obj.modalObject.modalTestObject.waitModalToShow();
        obj.modalObject.modalTestObject.clickClose();
        await obj.modalObject.modalTestObject.waitModalToHide();

        // open modal on edit mode and edit
        await obj.itemObject.clickEditFor(1);
        await obj.modalObject.modalTestObject.waitModalToShow();

        // hack to avoid duplicate "Edit" expenses
        const { getByText } = within(obj.modalObject.modalTestObject.Modal as HTMLElement);
        fireEvent.click(getByText('Edit'));

        await obj.modalObject.modalTestObject.waitModalToHide();

        await wait(() => {
            // 1 - get all expenses
            // 2 - after edit expense main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(2);

            expect(axiosMock.putSpy).toHaveBeenCalledTimes(1);
        });
    });

    test.skip('duplicate expense', async () => {
        const obj = await defaultInitialise();

        // open modal on duplicate mode and close
        await obj.itemObject.clickDeleteFor(1);
        await obj.modalObject.modalTestObject.waitModalToShow();
        obj.modalObject.modalTestObject.clickClose();
        await obj.modalObject.modalTestObject.waitModalToHide();

        // open modal on duplicate mode and edit
        await obj.itemObject.clickDeleteFor(1);
        await obj.modalObject.modalTestObject.waitModalToShow();

        // hack to avoid duplicate "Edit" expenses
        const { getByText } = within(obj.modalObject.modalTestObject.Modal as HTMLElement);
        fireEvent.click(getByText('Duplicate'));

        await obj.modalObject.modalTestObject.waitModalToHide();

        await wait(() => {
            // 1 - get all expenses
            // 2 - after duplicate expense main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(2);

            expect(axiosMock.postSpy).toHaveBeenCalledTimes(1);
        });
    });

    test('delete expense', async () => {
        const obj = await defaultInitialise();

        await obj.itemObject.clickDeleteFor(1);

        await wait(() => {
            // 1 - get all expenses
            // 2 - after delete expense main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(2);

            expect(axiosMock.deleteSpy).toHaveBeenCalledTimes(1);
        });
    });

    test('fail to delete expense', async () => {
        axiosMock.onDelete('/api/expense/1').reply(StatusCodes.ERROR);

        const obj = await defaultInitialise();

        await obj.itemObject.clickDeleteFor(1);

        await wait(() => {
            expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            expect(axiosMock.deleteSpy).toHaveBeenCalledTimes(1);
        });
    });
});
