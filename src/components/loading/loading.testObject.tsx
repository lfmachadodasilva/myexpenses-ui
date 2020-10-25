import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { LoadingComponent, LoadingProps } from './loading';

export class LoadingTestObject extends TestObjectBase<LoadingProps> {
    defaultParams: Partial<LoadingProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: LoadingProps) {
        return <LoadingComponent {...props} />;
    }
}
