import { LoadingPageObject } from './loading.pageTest';

describe('<LoadingComponent />', () => {
    test('should show a loading', async () => {
        const page = new LoadingPageObject();
        await page.initialiseComponent({ showLoading: true });
        expect(page.loading).toBeInTheDocument();
    });
    test('should not show a loading', async () => {
        const page = new LoadingPageObject();
        await page.initialiseComponent({ showLoading: false });
        expect(page.loading).not.toBeInTheDocument();
    });
});
