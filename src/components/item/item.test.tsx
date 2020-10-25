import { setConfiguration } from '../../configurations/configManager';
import { ItemProps } from './item';
import { ItemTestObject } from './item.testObject';

async function defaultInitialise(props: Partial<ItemProps> = {}) {
    const obj = new ItemTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<ItemComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('render', async () => {
        const obj = await defaultInitialise({ id: 1, name: 'Item name' });

        expect(obj.getByText('Item name')).toBeInTheDocument();
    });

    // TODO
});
