import { setConfiguration } from '../../configurations/configManager';
import { ModalProps } from './modal';
import { ModalTestObject } from './modal.testObject';

async function defaultInitialise(props: Partial<ModalProps> = {}) {
    const obj = new ModalTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe.skip('<ModalComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('render', async () => {
        const obj = await defaultInitialise();

        expect(obj.getByText('Item name')).toBeInTheDocument();
        expect(obj.getByText('Some stuff')).toBeInTheDocument();
    });
});
