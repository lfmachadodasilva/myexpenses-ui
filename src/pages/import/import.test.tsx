import { wait } from '@testing-library/react';
import { setConfiguration } from '../../configurations/configManager';
import { GlobalContext } from '../../contexts/global';
import { AxiosMock } from '../../helpers/axiosMock';
import { globalMockData } from '../../mockData/global';
import { ApiType } from '../../models/config';
import { LabelModel } from '../../models/label';
import { ImportProps } from './import';
import { ImportTestObject } from './import.testObject';

async function defaultInitialise(props: Partial<ImportProps> = {}, global: GlobalContext = globalMockData) {
    const obj = new ImportTestObject();
    obj.global = global;
    await obj.initialiseObject(props);

    return obj;
}

describe('<ImportPage />', () => {
    let axiosMock: AxiosMock;

    beforeEach(() => {
        setConfiguration({ apiUrl: ApiType.TEST_API });

        axiosMock = new AxiosMock();
    });

    afterEach(() => {
        axiosMock.reset();
        axiosMock.mockClearSpy();
    });

    test('happy path', async () => {
        axiosMock.onPost('/api/expense').reply(200);
        axiosMock.onPost('/api/label').reply(200, { id: 10, name: 'Label 10' } as LabelModel);

        const obj = await defaultInitialise();

        // check title
        expect(obj.getByText('Import')).toBeInTheDocument();

        // change the group
        // TODO
        // change the separator
        obj.insertText('import-separator-field', ',');
        // change the data
        obj.insertText(
            'import-data-field',
            '1,Name 1,1.1,10/10/20,Label 1,Comment 1\n2,Name 2,1.1,11/10/20,Label 10,Comment 10'
        );

        // wait to show all rows
        await wait(() => {
            // 1 header + 2 rows
            expect(obj.queryAllSelector('tr').length).toBe(3);
        });

        // check the table by name
        expect(obj.getByText('Name 1')).toBeInTheDocument();
        expect(obj.getByText('Name 2')).toBeInTheDocument();
        // check the table by status
        expect(obj.getAllByText('to do').length).toBe(2);

        // press process
        obj.clickByText('Process');

        // wait to all show done
        await wait(() => {
            expect(obj.getAllByText('done').length).toBe(2);
            // 2 expenses + 1 label
            expect(axiosMock.postSpy).toHaveBeenCalledTimes(3);
        });
    });

    test('fail to add label', async () => {
        axiosMock.onPost('/api/label').reply(500);

        const obj = await defaultInitialise();

        // change the data
        obj.insertText('import-data-field', '1;Name;1.1;10/10/20;New label;Comment 1');

        // press process
        obj.clickByText('Process');

        // wait to all show one error
        await wait(() => {
            expect(axiosMock.postSpy).toHaveBeenCalledTimes(1);
            expect(obj.queryByText('error')).toBeInTheDocument();
            // 1 header + 2 rows
            expect(obj.queryAllSelector('tr').length).toBe(2);
        });
    });

    test('fail to add expense', async () => {
        axiosMock.onPost('/api/expense').reply(500);

        const obj = await defaultInitialise();

        // change the data
        obj.insertText('import-data-field', '1;Name;1.1;10/10/20;Label 1;Comment 1');

        // press process
        obj.clickByText('Process');

        // wait to all show one error
        await wait(() => {
            expect(axiosMock.postSpy).toHaveBeenCalledTimes(1);
            expect(obj.queryByText('error')).toBeInTheDocument();
            // 1 header + 2 rows
            expect(obj.queryAllSelector('tr').length).toBe(2);
        });
    });

    test('fail with empty separator', async () => {
        const obj = await defaultInitialise();

        // change the data
        obj.insertText('import-separator-field', '');
        obj.insertText('import-data-field', '1;Name;1.1;10/10/20;Label 1;Comment 1');

        await wait(() => {
            // 1 header + empty rows
            expect(obj.queryAllSelector('tr').length).toBe(1);
        });
    });

    test('invalid date', async () => {
        const obj = await defaultInitialise();

        // change the data
        obj.insertText('import-data-field', '1;Name;1.1;10/10/2020;Label 1;Comment 1');

        await wait(() => {
            expect(obj.queryByText('Invalid date')).toBeInTheDocument();
            // 1 header + 1 rows
            expect(obj.queryAllSelector('tr').length).toBe(2);
        });
    });

    test('invalid value', async () => {
        const obj = await defaultInitialise();

        // change the data
        obj.insertText('import-data-field', '1;Name;Test;10/10/2020;Label 1;Comment 1');

        await wait(() => {
            expect(obj.queryByText('NaN')).toBeInTheDocument();
            // 1 header + 1 rows
            expect(obj.queryAllSelector('tr').length).toBe(2);
        });
    });

    test('number of items', async () => {
        const obj = await defaultInitialise();

        // change the data to be invalid number of items
        obj.insertText('import-data-field', '1;Name;1.1;10/10/2020');

        await wait(() => {
            // 1 header + empty rows
            expect(obj.queryAllSelector('tr').length).toBe(1);
        });

        // change the data to have enought number of items and without comments
        obj.insertText('import-data-field', '1;Name;1.1;10/10/2020;Label 1');

        await wait(() => {
            // 1 header + 1 rows
            expect(obj.queryAllSelector('tr').length).toBe(2);
        });

        // change the data to have full number of items
        obj.insertText('import-data-field', '1;Name;1.1;10/10/2020;Label 1;Comments 1');

        await wait(() => {
            // 1 header + 1 rows
            expect(obj.queryAllSelector('tr').length).toBe(2);
            expect(obj.queryByText('Comments 1')).toBeInTheDocument();
        });
    });
});
