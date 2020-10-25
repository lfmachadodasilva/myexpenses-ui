import { setConfiguration } from '../../configurations/configManager';
import { SettingsProps } from './settings';
import { SettingsTestObject } from './settings.testObject';

async function defaultInitialise(props: Partial<SettingsProps> = {}) {
    const obj = new SettingsTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<SettingsPage />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should render', async () => {
        const obj = await defaultInitialise();

        expect(obj.getByText('Settings page')).toBeInTheDocument();
    });
});
