import { setConfiguration } from '../../configurations/configurationManager';
import { SearchPageObject } from './search.pageTest';
import { wait } from '@testing-library/react';

describe.skip('<SearchComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('expand/collapse', async () => {
        const page = new SearchPageObject();
        await page.initialiseComponent({
            loading: false,
            groups: [],
            years: [new Date().getFullYear()],
            month: 1,
            year: new Date().getFullYear()
        });

        // default collapsed
        expect(page.collapse).toBeInTheDocument();

        page.clickExpandElement();

        // check if is expanded
        expect(page.collapse).not.toBeInTheDocument();
    });

    test('loading/not loading', async () => {
        const page = new SearchPageObject();
        await page.initialiseComponent({
            loading: true,
            groups: [],
            years: [new Date().getFullYear()],
            month: 1,
            year: new Date().getFullYear()
        });

        // show loading
        expect(page.loadingPage.loading).toBeInTheDocument();
        // disable component
        expect(page.disabledComponent).toBeInTheDocument();

        await page.rerender({
            loading: false,
            groups: [],
            years: [new Date().getFullYear()],
            month: 1,
            year: new Date().getFullYear()
        });

        // not show loading
        expect(page.loadingPage.loading).not.toBeInTheDocument();
        // enable component
        expect(page.disabledComponent).not.toBeInTheDocument();
    });

    test('change fields and click search button', async () => {
        const page = new SearchPageObject();
        await page.initialiseComponent({
            loading: false,
            groups: [
                { id: 1, name: 'Group 1' },
                { id: 2, name: 'Group 2' }
            ],
            years: [new Date().getFullYear()],
            group: { id: 1, name: 'Group 1' },
            month: 1,
            year: new Date().getFullYear()
        });

        page.clickExpandElement();
        // TODO change fields
        page.clickSearchButton();

        // check if is expanded
        await wait(() => expect(page.collapse).toBeInTheDocument());

        page.checkPage({
            pathname: undefined,
            search: 'group=1&month=1&year=2020'
        });
    });
});
