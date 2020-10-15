import { setConfiguration } from '../../configurations/configManager';
import { GroupProps } from './group';
import { GroupTestObject } from './group.testObject';

async function defaultInitialise(props: Partial<GroupProps> = {}) {
    const obj = new GroupTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<GroupPage />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should render', async () => {
        const obj = await defaultInitialise();

        expect(obj.getText('Group page')).toBeInTheDocument();
    });
});
