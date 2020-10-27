import { fireEvent, wait } from '@testing-library/react';
import { setConfiguration } from '../../configurations/configManager';
import { GlobalContext } from '../../contexts/global';
import { globalMockData } from '../../mockData/global';
import { SearchProps } from './search';
import { SearchTestObject } from './search.testObject';

async function defaultInitialise(props: Partial<SearchProps> = {}, global: GlobalContext = globalMockData) {
    const obj = new SearchTestObject();

    obj.global = global;

    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<SearchComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test.skip('happy path', async () => {
        const obj = await defaultInitialise();

        expect(obj.getByText('Search by')).not.toBeInTheDocument();
        expect(obj.getByText('Group 1')).toBeInTheDocument();

        // expand
        fireEvent.click(obj.querySelector('.card') as Element);

        await wait(() => {
            expect(obj.getByText('Search by')).toBeInTheDocument();
        });

        // TODO change all parameters

        obj.clickByText('Search');

        await wait(() => {
            expect(obj.checkPageHaveBeenChanged);
        });
    });

    test('loading', async () => {
        const obj = await defaultInitialise({}, { ...globalMockData, isLoading: true });

        expect(obj.queryByText('Search by')).not.toBeInTheDocument();
        expect(obj.loading).toBeInTheDocument();
    });
});
