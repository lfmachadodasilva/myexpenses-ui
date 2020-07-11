import { setConfiguration } from '../../configurations/configurationManager';
import { ExpensesManagePageObject } from './expensesManage.pageTest';

describe.skip('<ExpensesManagePage />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should', async () => {
        const page = new ExpensesManagePageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });
});
