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

    test('should render', async () => {
        const obj = await defaultInitialise();

        expect(obj.getByText('Loading Component')).toBeInTheDocument();
    });
});
