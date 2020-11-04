import { wait } from '@testing-library/react';
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
        expect(obj.getByText('Some stuff')).toBeInTheDocument();
    });

    test('on edit', async () => {
        const mockOnEdit = jest.fn((id: number) => {});
        const mockOnDuplicate = jest.fn((id: number) => {});
        const mockOnDelete = jest.fn((id: number) => {});
        const obj = await defaultInitialise({
            id: 1,
            name: 'Item name',
            onEdit: mockOnEdit,
            onDelete: mockOnDelete,
            onDuplicate: mockOnDuplicate
        });

        await obj.clickEditFor(1);

        await wait(() => {
            expect(mockOnEdit).toHaveBeenCalled();
            expect(mockOnDuplicate).not.toHaveBeenCalled();
            expect(mockOnDelete).not.toHaveBeenCalled();
        });
    });

    test('on delete', async () => {
        const mockOnEdit = jest.fn((id: number) => {});
        const mockOnDuplicate = jest.fn((id: number) => {});
        const mockOnDelete = jest.fn((id: number) => {});
        const obj = await defaultInitialise({
            id: 1,
            name: 'Item name',
            onEdit: mockOnEdit,
            onDelete: mockOnDelete,
            onDuplicate: mockOnDuplicate
        });

        await obj.clickDeleteFor(1);

        await wait(() => {
            expect(mockOnEdit).not.toHaveBeenCalled();
            expect(mockOnDuplicate).not.toHaveBeenCalled();
            expect(mockOnDelete).toHaveBeenCalled();
        });
    });

    test('on duplicate', async () => {
        const mockOnEdit = jest.fn((id: number) => {});
        const mockOnDuplicate = jest.fn((id: number) => {});
        const mockOnDelete = jest.fn((id: number) => {});
        const obj = await defaultInitialise({
            id: 1,
            name: 'Item name',
            onEdit: mockOnEdit,
            onDelete: mockOnDelete,
            onDuplicate: mockOnDuplicate
        });

        await obj.clickDuplicateFor(1);

        await wait(() => {
            expect(mockOnEdit).not.toHaveBeenCalled();
            expect(mockOnDuplicate).toHaveBeenCalled();
            expect(mockOnDelete).not.toHaveBeenCalled();
        });
    });
});
