import React from 'react';

import { UserContext, userContext } from '../../contexts/user';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { GroupPage, GroupProps } from './group';
import { GroupModalTestObject } from '../groupModal/groupModal.testObject';
import { ItemTestObject } from '../../components/item/item.testObject';
import { GlobalContext, globalContext } from '../../contexts/global';

export class GroupTestObject extends TestObjectBase<GroupProps> {
    defaultParams: Partial<GroupProps> = {};
    user!: UserContext;
    global!: GlobalContext;

    groupModalObject!: GroupModalTestObject;
    itemObject!: ItemTestObject;

    protected initialiseSubObjects(): void {
        this.groupModalObject = new GroupModalTestObject();
        this.groupModalObject.initialiseWithParentObject(this.wrapper);

        this.itemObject = new ItemTestObject();
        this.itemObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: GroupProps) {
        return (
            <userContext.Provider value={this.user}>
                <globalContext.Provider value={this.global}>
                    <GroupPage {...props} />
                </globalContext.Provider>
            </userContext.Provider>
        );
    }

    clickAdd() {
        this.clickByText('Add new group');
    }
}
