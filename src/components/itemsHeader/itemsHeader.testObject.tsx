import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { ItemsHeaderComponent, ItemsHeaderProps } from './itemsHeader';

export class ItemsHeaderTestObject extends TestObjectBase<ItemsHeaderProps> {
    defaultParams: Partial<ItemsHeaderProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: ItemsHeaderProps) {
        return <ItemsHeaderComponent {...props} />;
    }
}
