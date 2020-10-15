import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { LabelPage, LabelProps } from './label';

export class AppTestObject extends TestObjectBase<LabelProps> {
    defaultParams: Partial<LabelProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: LabelProps) {
        return <LabelPage {...props} />;
    }

    getText(text: string) {
        return this.queryByText(text);
    }
}
