import React from 'react';

import { globalContext, GlobalContext } from '../../contexts/global';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { ExportPage, ExportProps } from './export';

export class ExportTestObject extends TestObjectBase<ExportProps> {
    defaultParams: Partial<ExportProps> = {};

    global!: GlobalContext;

    protected initialiseSubObjects(): void {}

    protected render(props: ExportProps) {
        return (
            <globalContext.Provider value={{ ...this.global }}>
                <ExportPage {...props} />
            </globalContext.Provider>
        );
    }
}
