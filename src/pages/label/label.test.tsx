import { setConfiguration } from '../../configurations/configManager';
import { LabelProps } from './label';
import { AppTestObject } from './label.testObject';

async function defaultInitialise(props: Partial<LabelProps> = {}) {
    const obj = new AppTestObject();
    await obj.initialiseObject(props);

    return obj;
}

describe('<LabelPage />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should render', async () => {
        const obj = await defaultInitialise();

        expect(obj).toBeDefined();
    });
});
