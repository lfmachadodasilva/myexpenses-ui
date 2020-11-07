import { fireEvent, wait } from '@testing-library/react';
import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { ModalComponent, ModalProps } from './modal';

export class ModalTestObject extends TestObjectBase<ModalProps> {
    defaultParams: Partial<ModalProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: ModalProps) {
        return (
            <ModalComponent {...props}>
                <div>Some stuff</div>
            </ModalComponent>
        );
    }

    clickClose() {
        fireEvent.click(this.CloseButton as Element);
    }

    async waitClickClose() {
        await this.waitModalToShow();
        await wait(() => expect(this.CloseButton).toBeInTheDocument());
        this.clickClose();
        await this.waitModalToHide();
    }

    clickAction() {
        fireEvent.click(this.ActionButton as Element);
    }

    async waitClickAction() {
        await this.waitModalToShow();
        await wait(() => expect(this.ActionButton).toBeInTheDocument());
        this.clickAction();
        await this.waitModalToHide();
    }

    async waitModalToShow() {
        return await wait(() => expect(this.Modal).toBeInTheDocument());
    }

    async waitModalToHide() {
        return await wait(() => expect(this.Modal).not.toBeInTheDocument());
    }

    get Modal() {
        return this.querySelector('.modal-content');
    }

    get CloseButton() {
        return this.querySelector('.close');
    }

    get ActionButton() {
        return this.getByTestId('action-button');
    }
}
