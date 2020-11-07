import { wait } from '@testing-library/react';

import { setConfiguration } from '../../configurations/configManager';
import { AxiosMock } from '../../helpers/axiosMock';
import { expensesMockData } from '../../mockData/expense';
import { globalMockData } from '../../mockData/global';
import { ApiType } from '../../models/config';
import { StatusCodes } from '../../services/base';
import { ExportProps } from './export';
import { ExportTestObject } from './export.testObject';

async function defaultInitialise(props: Partial<ExportProps> = {}) {
    const obj = new ExportTestObject();
    obj.global = globalMockData;
    await obj.initialiseObject(props);

    return obj;
}

describe('<ExportPage />', () => {
    let axiosMock: AxiosMock;

    beforeEach(() => {
        setConfiguration({ apiUrl: ApiType.TEST_API });

        axiosMock = new AxiosMock();
        axiosMock.onGet('/api/expense').reply(StatusCodes.OK, expensesMockData);
    });

    afterEach(() => {
        axiosMock.reset();
        axiosMock.mockClearSpy();
    });

    test('happy path', async () => {
        const obj = await defaultInitialise();

        // check the title
        expect(obj.getByText('Export')).toBeInTheDocument();

        obj.clickByText('Process');

        await wait(() => {
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(1);
            expect(obj.queryByLabelText('data-input')).not.toBe('');
        });
    });

    test('fail to load', async () => {
        axiosMock.onGet('/api/expense').reply(StatusCodes.ERROR);

        const obj = await defaultInitialise();

        obj.clickByText('Process');

        await wait(() => {
            expect(axiosMock.getSpy).toHaveBeenCalled();
            expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
        });
    });

    test('empty list of expenses', async () => {
        axiosMock.onGet('/api/expense').reply(StatusCodes.OK, []);

        const obj = await defaultInitialise();

        obj.clickByText('Process');

        await wait(() => {
            expect(axiosMock.getSpy).toHaveBeenCalled();
            expect(obj.queryByText("You don't have any expense. Please create new one to start.")).toBeInTheDocument();
        });
    });
});
