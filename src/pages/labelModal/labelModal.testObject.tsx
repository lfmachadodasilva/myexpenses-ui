import { fireEvent } from '@testing-library/react';
import React from 'react';
import { ModalTestObject } from '../../components/modal/modal.testObject';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { LabelModalPage, LabelModalProps } from './labelModal';

export class LabelModalTestObject extends TestObjectBase<LabelModalProps> {
    defaultParams: Partial<LabelModalProps> = {};
    modalTestObject!: ModalTestObject;

    protected initialiseSubObjects(): void {
        this.modalTestObject = new ModalTestObject();
        this.modalTestObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: LabelModalProps) {
        return <LabelModalPage {...props} />;
    }

    insertText(id: string, value: string | string[]) {
        const input = this.getByTestId(id);
        fireEvent.change(input, { target: { value: value } });
    }

    async makeReadyToAdd() {
        // add name
        this.insertText('label-name-field', 'New group');
    }
}
