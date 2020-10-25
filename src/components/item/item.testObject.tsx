import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { ItemComponent, ItemProps } from './item';

export class ItemTestObject extends TestObjectBase<ItemProps> {
    defaultParams: Partial<ItemProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: ItemProps) {
        return <ItemComponent {...props} />;
    }
}
