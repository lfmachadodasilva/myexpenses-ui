import { fireEvent, wait } from '@testing-library/react';
import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { ModalTestObject } from '../modal/modal.testObject';
import { ItemComponent, ItemProps } from './item';

export class ItemTestObject extends TestObjectBase<ItemProps> {
    defaultParams: Partial<ItemProps> = {};
    modalTestObject!: ModalTestObject;

    protected initialiseSubObjects(): void {
        this.modalTestObject = new ModalTestObject();
        this.modalTestObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: ItemProps) {
        return (
            <ItemComponent {...props}>
                <div>Some stuff</div>
            </ItemComponent>
        );
    }

    async clickEditFor(id: number) {
        return await this.clickFor(id, 'Edit');
    }

    async clickDeleteFor(id: number) {
        await this.clickFor(id, 'Delete');

        await this.modalTestObject.waitClickAction();
    }

    async clickDeleteAndCloseFor(id: number) {
        await this.clickFor(id, 'Delete');

        await this.modalTestObject.waitClickClose();
    }

    async clickDuplicateFor(id: number) {
        return await this.clickFor(id, 'Duplicate');
    }

    private async clickFor(id: number, text: string) {
        fireEvent.click(this.querySelector(`#menu-${id}`) as Element);

        await wait(() => {
            expect(this.queryByText(text)).toBeInTheDocument();
        });

        fireEvent.click(this.getByText(text));
    }
}
