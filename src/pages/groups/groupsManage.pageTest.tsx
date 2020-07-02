import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { GroupsManageProps, GroupsManageDialog } from './groupsManage';

export class GroupsManagePageObject extends BasePage<GroupsManageProps> {
    defaultParams: Partial<GroupsManageProps> = {};

    protected initialiseSubComponents(): void {}

    protected render(props: GroupsManageProps) {
        return <GroupsManageDialog {...props} />;
    }
}
