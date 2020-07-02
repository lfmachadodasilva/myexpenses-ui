import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { DialogComponent, DialogProps } from './dialog';
import { fireEvent } from '@testing-library/react';

export class DialogPageObject extends BasePage<DialogProps> {
    defaultParams: Partial<DialogProps> = {};

    protected initialiseSubComponents(): void {}

    getElement(text: string) {
        return this.queryByText(text);
    }

    clickCloseButton() {
        fireEvent.click(this.actionButton as Element);
    }

    clickActionButton(text: string) {
        fireEvent.click(this.getByText(text) as Element);
    }

    protected render(props: DialogProps) {
        return <DialogComponent {...props}>content</DialogComponent>;
    }

    get content() {
        return this.queryByText('content');
    }

    get actionButton() {
        return this.queryByLabelText('close');
    }

    get actionButtonIsDisabled() {
        return this.actionButton?.closest('button')?.hasAttribute('disabled');
    }
}
