import React from 'react';

import { TestObjectBase } from '../helpers/testObjectBase';
import { AppPage, AppProps } from './app';

export class AppTestObject extends TestObjectBase<AppProps> {
    defaultParams: Partial<AppProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: AppProps) {
        return <AppPage {...props} />;
    }

    getText(text: string) {
        return this.queryByText(text);
    }
}
