import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { ErrorComponent, ErrorProps } from './error';

export class ErrorTestObject extends TestObjectBase<ErrorProps> {
    defaultParams: Partial<ErrorProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: ErrorProps) {
        return <ErrorComponent {...props} />;
    }

    get getAlert() {
        return this.querySelector('.alert');
    }
}
