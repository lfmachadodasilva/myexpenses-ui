import React from 'react';
import { HeaderTestObject } from '../components/header/header.testObject';

import { TestObjectBase } from '../helpers/testObjectBase';
import { AppPage, AppProps } from './app';

export class AppTestObject extends TestObjectBase<AppProps> {
    defaultParams: Partial<AppProps> = {};

    headerObject!: HeaderTestObject;

    protected initialiseSubObjects(): void {
        this.headerObject = new HeaderTestObject();
        this.headerObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: AppProps) {
        return <AppPage {...props} />;
    }

    getText(text: string) {
        return this.queryByText(text);
    }
}
