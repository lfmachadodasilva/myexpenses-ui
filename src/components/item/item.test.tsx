import { fireEvent, wait } from '@testing-library/react';
import { ItemPageObject } from './item.pageTest';

describe('<ItemComponent />', () => {
    test('should show the title', async () => {
        const page = new ItemPageObject();
        await page.initialiseComponent({ title: 'Title' });
        expect(page.getElement('Title')).toBeInTheDocument();
    });

    test('should show/hide edit and delete elements', async () => {
        const page = new ItemPageObject();
        await page.initialiseComponent({ title: 'Title' });

        expect(page.editElement).not.toBeInTheDocument();
        expect(page.deleteElement).not.toBeInTheDocument();

        await page.rerender({ title: 'Title', onEdit: jest.fn(), onDelete: jest.fn() });
        expect(page.editElement).toBeInTheDocument();
        expect(page.deleteElement).toBeInTheDocument();
    });

    test('should be able to click', async () => {
        const waitFunction = () =>
            new Promise<void>(resolve => {
                setTimeout(() => {
                    resolve();
                });
            });
        const editMock = jest.fn().mockImplementation(waitFunction);
        const deleteMock = jest.fn().mockImplementation(waitFunction);
        const page = new ItemPageObject();
        await page.initialiseComponent({ title: 'Title', onEdit: editMock, onDelete: deleteMock });

        page.clickEdit();
        expect(editMock).toBeCalled();
        expect(page.loadingPage.loading).toBeInTheDocument();
        expect((page.deleteElement as Element).closest('button')).toHaveAttribute('disabled');

        // wait action to finish
        await wait(() => expect(page.loadingPage.loading).not.toBeInTheDocument());
        expect((page.deleteElement as Element).closest('button')).not.toHaveAttribute('disabled');

        page.clickDelete();
        expect(deleteMock).toBeCalled();
        expect(page.loadingPage.loading).toBeInTheDocument();
        expect((page.editElement as Element).closest('button')).toHaveAttribute('disabled');

        // wait action to finish
        await wait(() => expect(page.loadingPage.loading).not.toBeInTheDocument());
        expect((page.editElement as Element).closest('button')).not.toHaveAttribute('disabled');
    });
});
