import { fireEvent } from '@testing-library/react';
import React from 'react';

import { globalContext, GlobalContext } from '../../contexts/global';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { ImportProps, ImportPage } from './import';

export class ImportTestObject extends TestObjectBase<ImportProps> {
    defaultParams: Partial<ImportProps> = {};

    global!: GlobalContext;

    protected initialiseSubObjects(): void {}

    protected render(props: ImportProps) {
        return (
            <globalContext.Provider value={{ ...this.global }}>
                <ImportPage {...props} />
            </globalContext.Provider>
        );
    }

    insertText(id: string, value: string | string[]) {
        const input = this.getByTestId(id);
        fireEvent.change(input, { target: { value: value } });
    }
}
