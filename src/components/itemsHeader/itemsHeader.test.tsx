import { wait } from '@testing-library/react';
import { setConfiguration } from '../../configurations/configManager';
import { ItemsHeaderProps } from './itemsHeader';
import { ItemsHeaderTestObject } from './itemsHeader.testObject';

async function defaultInitialise(props: Partial<ItemsHeaderProps> = {}) {
    const obj = new ItemsHeaderTestObject();
    await obj.initialiseObject(props);

    expect(obj).toBeDefined();

    return obj;
}

describe('<ItemsHeaderComponent />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should render', async () => {
        const mockAction = jest.fn();
        const obj = await defaultInitialise({ title: 'Title', action: 'Action', onAction: mockAction });

        expect(mockAction).not.toBeCalled();

        expect(obj.getByText('Title')).toBeInTheDocument();
        expect(obj.getByText('Action')).toBeInTheDocument();

        obj.clickByText('Action');

        await wait(() => {
            expect(mockAction).toBeCalled();
        });
    });
});
