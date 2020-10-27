import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { LoadingComponent, LoadingProps } from './loading';

export class LoadingTestObject extends TestObjectBase<LoadingProps> {
    defaultParams: Partial<LoadingProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: LoadingProps) {
        return (
            <LoadingComponent {...props}>
                <div>Loading Component</div>
            </LoadingComponent>
        );
    }

    get getLoading() {
        return this.querySelector('.spinner-border');
    }
}
