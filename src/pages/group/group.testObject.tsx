import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { GroupPage, GroupProps } from './group';

export class GroupTestObject extends TestObjectBase<GroupProps> {
    defaultParams: Partial<GroupProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: GroupProps) {
        return <GroupPage {...props} />;
    }

    getText(text: string) {
        return this.queryByText(text);
    }
}
