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
        fireEvent.click(this.querySelector(`#menu-${id}`) as Element);

        await wait(() => {
            expect(this.queryByText('Edit')).toBeInTheDocument();
        });

        fireEvent.click(this.getByText('Edit'));
    }

    async clickDeleteFor(id: number) {
        fireEvent.click(this.querySelector(`#menu-${id}`) as Element);

        await wait(() => {
            expect(this.queryByText('Delete')).toBeInTheDocument();
        });

        fireEvent.click(this.getByText('Delete'));
    }
}
