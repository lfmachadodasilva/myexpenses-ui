import { fireEvent, wait } from '@testing-library/react';
import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { ItemComponent, ItemProps } from './item';

export class ItemTestObject extends TestObjectBase<ItemProps> {
    defaultParams: Partial<ItemProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: ItemProps) {
        return (
            <ItemComponent {...props}>
                <div>Some stuff</div>
            </ItemComponent>
        );
    }

    async clickEditFor(id: number) {
        return this.clickFor(id, 'Edit');
    }

    async clickDeleteFor(id: number) {
        return this.clickFor(id, 'Delete');
    }

    async clickDuplicateFor(id: number) {
        return this.clickFor(id, 'Duplicate');
    }

    private async clickFor(id: number, text: string) {
        fireEvent.click(this.querySelector(`#menu-${id}`) as Element);

        await wait(() => {
            expect(this.queryByText(text)).toBeInTheDocument();
        });

        fireEvent.click(this.getByText(text));
    }
}
