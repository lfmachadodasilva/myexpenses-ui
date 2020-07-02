import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { LoadingProps, LoadingComponent } from './loading';

export class LoadingPageObject extends BasePage<LoadingProps> {
    defaultParams: Partial<LoadingProps> = {};

    protected initialiseSubComponents(): void {}

    protected render(props: LoadingProps) {
        return <LoadingComponent {...props}>Test</LoadingComponent>;
    }

    get loading() {
        return this.queryByTestId('loading-element');
    }
}
