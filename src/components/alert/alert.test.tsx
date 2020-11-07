import { setConfiguration } from '../../configurations/configManager';
import { AlertProps } from './alert';
import { AlertTestObject } from './alert.testObject';

async function defaultInitialise(props: Partial<AlertProps> = {}) {
    const obj = new AlertTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<AlertComponent />', () => {
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
        expect(obj.querySelector('.alert-danger')).toBeInTheDocument();
    });

    test('should show alert with warning color', async () => {
        const obj = await defaultInitialise({ message: 'Show alert', type: 'warning' });

        expect(obj.getAlert).toBeInTheDocument();
        expect(obj.queryByText('Show alert')).toBeInTheDocument();
        expect(obj.querySelector('.alert-warning')).toBeInTheDocument();
    });
});
