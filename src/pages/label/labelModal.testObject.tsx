import { fireEvent, wait } from '@testing-library/react';
import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { LabelModalPage, LabelModalProps } from './labelModal';

export class LabelModalTestObject extends TestObjectBase<LabelModalProps> {
    defaultParams: Partial<LabelModalProps> = {};

    protected initialiseSubObjects(): void {}

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

    clickAdd() {
        this.clickByText('Add');
    }

    clickEdit() {
        this.clickByText('Edit');
    }

    clickClose() {
        fireEvent.click(this.CloseButton as Element);
    }

    async waitModalToShow() {
        await wait(() => expect(this.Modal).toBeInTheDocument());
    }

    async waitModalToHide() {
        await wait(() => expect(this.Modal).not.toBeInTheDocument());
    }

    get Modal() {
        return this.querySelector('.modal-content');
    }

    get CloseButton() {
        return this.querySelector('.close');
    }
}
