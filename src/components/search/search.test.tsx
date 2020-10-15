import { setConfiguration } from '../../configurations/configManager';
import { SearchProps } from './search';
import { SearchTestObject } from './search.testObject';

async function defaultInitialise(props: Partial<SearchProps> = {}) {
    const obj = new SearchTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<SearchComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should render', async () => {
        const searchProps: SearchProps = {
            groups: [
                { id: 1, name: 'Group 1' },
                { id: 2, name: 'Group 2' }
            ],
            group: 2,
            month: 10,
            years: [2019, 2020],
            year: 2020
        };
        const obj = await defaultInitialise(searchProps);

        expect(obj.getText('Search Component')).toBeInTheDocument();
    });
});
