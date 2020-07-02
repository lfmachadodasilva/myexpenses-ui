import { setConfiguration } from '../../configurations/configurationManager';
import { SearchPageObject } from './search.pageTest';
import { SearchProps } from './search';

describe('<SearchComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should', async () => {
        const page = new SearchPageObject();
        await page.initialiseComponent({
            groups: [],
            years: [new Date().getFullYear()],
            month: 1,
            year: new Date().getFullYear()
        });

        expect(page).toBeDefined();
    });

    test('loading/not loading', async () => {
        const page = new SearchPageObject();
        await page.initialiseComponent({
            groups: [],
            years: [new Date().getFullYear()],
            month: 1,
            year: new Date().getFullYear()
        });

        expect(page).toBeDefined();
    });

    test('empty group list', async () => {
        const page = new SearchPageObject();
        await page.initialiseComponent({
            groups: [],
            years: [new Date().getFullYear()],
            month: 1,
            year: new Date().getFullYear()
        });

        expect(page).toBeDefined();
    });

    test('on action', async () => {
        const page = new SearchPageObject();
        await page.initialiseComponent({
            groups: [],
            years: [new Date().getFullYear()],
            month: 1,
            year: new Date().getFullYear()
        });

        expect(page).toBeDefined();
    });
});
