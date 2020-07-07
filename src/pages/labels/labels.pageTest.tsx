import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { LabelsPage, LabelsProps } from './labels';

export class LabelsPageObject extends BasePage<LabelsProps> {
    defaultParams: Partial<LabelsProps> = {};

    protected initialiseSubComponents(): void {}

    protected render(props: LabelsProps) {
        return <LabelsPage {...props} />;
    }
}
