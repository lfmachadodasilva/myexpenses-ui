import { setConfiguration } from '../../configurations/configManager';
import { ErrorProps } from './error';
import { ErrorTestObject } from './error.testObject';

async function defaultInitialise(props: Partial<ErrorProps> = {}) {
    const obj = new ErrorTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<ErrorComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should not show alert', async () => {
        const obj = await defaultInitialise({ message: '' });

        expect(obj.getAlert).not.toBeInTheDocument();
    });

    test('should not show alert', async () => {
        const obj = await defaultInitialise({ message: undefined });

        expect(obj.getAlert).not.toBeInTheDocument();
    });

    test('should show alert', async () => {
        const obj = await defaultInitialise({ message: 'Show alert' });

        expect(obj.getAlert).toBeInTheDocument();
        expect(obj.queryByText('Show alert')).toBeInTheDocument();
    });
});
