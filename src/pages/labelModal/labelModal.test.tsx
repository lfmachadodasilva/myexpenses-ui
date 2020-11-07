import { wait } from '@testing-library/react';

import { setConfiguration } from '../../configurations/configManager';
import { AxiosMock } from '../../helpers/axiosMock';
import { labelsFullMockData, labelsMockData } from '../../mockData/label';
import { ApiType } from '../../models/config';
import { StatusCodes } from '../../services/base';
import { LabelModalProps } from './labelModal';
import { LabelModalTestObject } from './labelModal.testObject';

async function defaultInitialise(props: Partial<LabelModalProps> = {}) {
    const obj = new LabelModalTestObject();
    await obj.initialiseObject(props);

    return obj;
}

describe('<LabelModalPage />', () => {
    let axiosMock: AxiosMock;

    beforeEach(() => {
        setConfiguration({
            apiUrl: ApiType.TEST_API
        });

        axiosMock = new AxiosMock();
        axiosMock.onPost('/api/label').reply(StatusCodes.OK, labelsMockData[0]);
        axiosMock.onPut('/api/label').reply(StatusCodes.OK);
    });

    afterEach(() => {
        axiosMock.reset();
    });

    describe('add mode', () => {
        test('happy path', async () => {
            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction
            });

            // check title
            expect(obj.getByText('Add new label')).toBeInTheDocument();
            // check action button
            expect(obj.getByText('Add')).toBeInTheDocument();

            // with empty name and users should be disabled action button
            expect(obj.getByText('Add')).toHaveAttribute('disabled');

            // add name
            obj.insertText('label-name-field', 'New label');

            await wait(() => {
                expect(obj.getByText('Add')).not.toHaveAttribute('disabled');
            });

            // main action
            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.postSpy).toHaveBeenCalled();
                expect(mockOnAction).toHaveBeenCalled();
            });
        });

        test('fail to add', async () => {
            axiosMock.onPost('/api/label').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction
            });

            // add name
            obj.insertText('label-name-field', 'New label');

            await wait(() => {
                expect(obj.getByText('Add')).not.toHaveAttribute('disabled');
            });

            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.postSpy).toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Add')).toHaveAttribute('disabled');
        });
    });

    describe('edit mode', () => {
        test('happy path', async () => {
            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction,
                label: labelsFullMockData[0]
            });

            // check title
            expect(obj.getByText('Edit label')).toBeInTheDocument();
            // check action button
            expect(obj.getByText('Edit')).toBeInTheDocument();

            expect(obj.getByText('Edit')).not.toHaveAttribute('disabled');

            // main action
            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.putSpy).toHaveBeenCalled();
                expect(mockOnAction).toHaveBeenCalled();
            });
        });

        test('fail to edit', async () => {
            axiosMock.onPut('/api/label').reply(StatusCodes.ERROR);

            const mockOnAction = jest.fn();
            const obj = await defaultInitialise({
                show: true,
                onAction: mockOnAction,
                label: labelsFullMockData[0]
            });

            expect(obj.getByText('Edit')).not.toHaveAttribute('disabled');

            obj.modalTestObject.clickAction();

            await wait(() => {
                expect(axiosMock.putSpy).toHaveBeenCalled();
                expect(mockOnAction).not.toHaveBeenCalled();
                expect(obj.queryByText('Something went wrong. Try again later.')).toBeInTheDocument();
            });

            expect(obj.getByText('Edit')).toHaveAttribute('disabled');
        });
    });
});
