import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { AlertComponent, AlertProps } from './alert';

export class AlertTestObject extends TestObjectBase<AlertProps> {
    defaultParams: Partial<AlertProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: AlertProps) {
        return <AlertComponent {...props} />;
    }

    get getAlert() {
        return this.querySelector('.alert');
    }
}
