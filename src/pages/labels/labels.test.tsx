import { setConfiguration } from '../../configurations/configurationManager';
import { LabelsPageObject } from './labels.pageTest';

describe.skip('<LabelsPage />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('add new item button (open dialog)', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('on action', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('on close', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('on delete', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('on edit', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('error loading items', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('empty list', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('check number of items', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });

    test('positive and negative values', async () => {
        const page = new LabelsPageObject();
        await page.initialiseComponent();

        expect(page).toBeDefined();
    });
});
