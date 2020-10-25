import { setConfiguration } from '../../configurations/configManager';
import { GlobalContext } from '../../contexts/global';
import { yearsMockData } from '../../mockData/expense';
import { groupsMockData } from '../../mockData/group';
import { SearchProps } from './search';
import { SearchTestObject } from './search.testObject';

const defaultGlobal: GlobalContext = {
    isLoading: false,

    groups: groupsMockData,
    years: yearsMockData,

    group: groupsMockData[0].id,
    month: 1,
    year: 2020
};

async function defaultInitialise(props: Partial<SearchProps> = {}, global: GlobalContext = defaultGlobal) {
    const obj = new SearchTestObject();

    obj.global = global;

    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe.skip('<SearchComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should change url when press search', async () => {
        const obj = await defaultInitialise();

        expect(obj.getByText('Search by')).toBeInTheDocument();

        // TODO
    });

    test('loading', async () => {
        const obj = await defaultInitialise({}, { ...defaultGlobal, isLoading: false });

        expect(obj.getByText('Search by')).not.toBeInTheDocument();
        expect(obj.loading).toBeInTheDocument();
    });
});
