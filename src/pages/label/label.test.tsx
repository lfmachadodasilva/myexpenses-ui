import { fireEvent, wait, within } from '@testing-library/react';

import { setConfiguration } from '../../configurations/configManager';
import { defaultUserContext } from '../../contexts/user';
import { AxiosMock } from '../../helpers/axiosMock';
import { globalMockData } from '../../mockData/global';
import { labelsFullMockData } from '../../mockData/label';
import { ApiType } from '../../models/config';
import { StatusCodes } from '../../services/base';
import { LabelProps } from './label';
import { AppTestObject } from './label.testObject';

async function defaultInitialise(props: Partial<LabelProps> = {}) {
    const obj = new AppTestObject();

    obj.user = defaultUserContext;
    obj.global = globalMockData;

    await obj.initialiseObject(props);

    return obj;
}

describe('<LabelPage />', () => {
    let axiosMock: AxiosMock;

    beforeEach(() => {
        setConfiguration({ apiUrl: ApiType.TEST_API });

        axiosMock = new AxiosMock();
        axiosMock.onGet('/api/label/full').reply(StatusCodes.OK, labelsFullMockData);
        axiosMock.onPost('/api/label').reply(StatusCodes.OK, labelsFullMockData[0]);
        axiosMock.onPut('/api/label').reply(StatusCodes.OK);
        axiosMock.onDelete('/api/label/1').reply(StatusCodes.OK);

        window.HTMLCanvasElement.prototype.getContext = jest.fn();
    });

    afterEach(() => {
        axiosMock.reset();
        axiosMock.mockClearSpy();
    });

    test('show all labels', async () => {
        const obj = await defaultInitialise();

        // check the title
        expect(obj.getByText('Labels')).toBeInTheDocument();

        // wait to show all available labels for this user
        await wait(() => {
            labelsFullMockData.forEach(label => {
                expect(obj.getByText(label.name)).toBeInTheDocument();
            });
        });
    });

    test('fail to get all labels', async () => {
        axiosMock.onGet('/api/label/full').reply(StatusCodes.ERROR);

        const obj = await defaultInitialise();

        await wait(() => {
            expect(axiosMock.getSpy).toHaveBeenCalled();
            expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
        });
    });

    test('add new label', async () => {
        const obj = await defaultInitialise();

        obj.clickAdd();

        // wait to show the modal
        await obj.modalObject.modalTestObject.waitModalToShow();
        obj.modalObject.modalTestObject.clickClose();
        // wait to hide the modal
        await obj.modalObject.modalTestObject.waitModalToHide();

        obj.clickAdd();

        // wait to show the modal
        await obj.modalObject.modalTestObject.waitModalToShow();
        // add name and select a user
        await obj.modalObject.makeReadyToAdd();
        obj.modalObject.modalTestObject.clickAction();
        // wait to hide the modal and refresh main page
        await obj.modalObject.modalTestObject.waitModalToHide();

        await wait(() => {
            // 1 - get all labels
            // 2 - after add new label main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(2);
        });
    });

    test('edit label', async () => {
        const obj = await defaultInitialise();

        // open modal on edit mode and close
        await obj.itemObject.clickEditFor(1);
        await obj.modalObject.modalTestObject.waitModalToShow();
        obj.modalObject.modalTestObject.clickClose();
        await obj.modalObject.modalTestObject.waitModalToHide();

        // open modal on edit mode and edit
        await obj.itemObject.clickEditFor(1);
        await obj.modalObject.modalTestObject.waitModalToShow();

        // hack to avoid duplicate "Edit" labels
        const { getByText } = within(obj.modalObject.modalTestObject.Modal as HTMLElement);
        fireEvent.click(getByText('Edit'));

        await obj.modalObject.modalTestObject.waitModalToHide();

        await wait(() => {
            // 1 - get all labels
            // 2 - after edit label main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(2);

            expect(axiosMock.putSpy).toHaveBeenCalledTimes(1);
        });
    });

    test('delete label', async () => {
        const obj = await defaultInitialise();

        await obj.itemObject.clickDeleteFor(1);

        await wait(() => {
            // 1 - get all labels
            // 2 - after delete label main page will refresh
            expect(axiosMock.getSpy).toHaveBeenCalledTimes(2);

            expect(axiosMock.deleteSpy).toHaveBeenCalledTimes(1);
        });
    });

    test('fail to delete label', async () => {
        axiosMock.onDelete('/api/label/1').reply(StatusCodes.ERROR);

        const obj = await defaultInitialise();

        await obj.itemObject.clickDeleteFor(1);

        await wait(() => {
            expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            expect(axiosMock.deleteSpy).toHaveBeenCalledTimes(1);
        });
    });
});
