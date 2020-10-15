import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { SettingsProps, SettingsPage } from './settings';

export class SettingsTestObject extends TestObjectBase<SettingsProps> {
    defaultParams: Partial<SettingsProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: SettingsProps) {
        return <SettingsPage {...props} />;
    }

    getText(text: string) {
        return this.queryByText(text);
    }
}
