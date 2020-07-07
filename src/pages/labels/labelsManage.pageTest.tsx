import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { LabelsManageProps, LabelsManagePage } from './labelsManage';

export class LabelsManagePageObject extends BasePage<LabelsManageProps> {
    defaultParams: Partial<LabelsManageProps> = {};

    protected initialiseSubComponents(): void {}

    protected render(props: LabelsManageProps) {
        return <LabelsManagePage {...props} />;
    }
}
