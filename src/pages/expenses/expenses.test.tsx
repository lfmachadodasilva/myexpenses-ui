import { setConfiguration } from '../../configurations/configurationManager';
import { ExpensesPageObject } from './expenses.pageTest';

describe.skip('<ExpensesPage />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should', async () => {
        const page = new ExpensesPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });
});
