import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { GroupsProps, GroupsPage } from './groups';

export class GroupsPageObject extends BasePage<GroupsProps> {
    defaultParams: Partial<GroupsProps> = {};

    protected initialiseSubComponents(): void {}

    protected render(props: GroupsProps) {
        return <GroupsPage {...props} />;
    }
}
