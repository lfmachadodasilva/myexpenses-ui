import React from 'react';
import { fireEvent } from '@testing-library/react';

import { BasePage } from '../../helpers/basePageTest';
import { ItemComponent, ItemProps } from './item';
import { LoadingPageObject } from '../loading/loading.pageTest';

export class ItemPageObject extends BasePage<ItemProps> {
    defaultParams: Partial<ItemProps> = {};

    loadingPage = new LoadingPageObject();

    protected initialiseSubComponents(): void {
        this.loadingPage.initialiseWithParentComponent(this.wrapper);
    }

    clickEdit() {
        fireEvent.click(this.editElement as Element);
    }

    clickDelete() {
        fireEvent.click(this.deleteElement as Element);
    }

    getElement(text: string) {
        return this.queryByText(text);
    }

    protected render(props: ItemProps) {
        return <ItemComponent {...props}></ItemComponent>;
    }

    get editElement() {
        return this.queryByTestId('edit-element');
    }

    get deleteElement() {
        return this.queryByTestId('delete-element');
    }
}
