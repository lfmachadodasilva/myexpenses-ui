import { setConfiguration } from '../../configurations/configManager';
import { LoadingProps } from './loading';
import { LoadingTestObject } from './loading.testObject';

async function defaultInitialise(props: Partial<LoadingProps> = {}) {
    const obj = new LoadingTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<LoadingComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should show loading', async () => {
        const obj = await defaultInitialise({ isLoading: true });

        expect(obj.getLoading).toBeInTheDocument();
        expect(obj.queryByText('Loading Component')).not.toBeInTheDocument();
    });

    test('should not show loading', async () => {
        const obj = await defaultInitialise({ isLoading: false });

        expect(obj.getLoading).not.toBeInTheDocument();
        expect(obj.queryByText('Loading Component')).toBeInTheDocument();
    });
});
