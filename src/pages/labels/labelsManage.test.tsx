import { setConfiguration } from '../../configurations/configurationManager';
import { LabelsManagePageObject } from './labelsManage.pageTest';

describe('<LabelsManagePage />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should', async () => {
        const page = new LabelsManagePageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });
});
