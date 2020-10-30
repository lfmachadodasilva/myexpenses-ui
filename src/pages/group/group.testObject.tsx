import React from 'react';

import { UserContext, userContext } from '../../contexts/user';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { GroupPage, GroupProps } from './group';
import { GroupModalTestObject } from '../groupModal/groupModal.testObject';
import { ItemTestObject } from '../../components/item/item.testObject';

export class GroupTestObject extends TestObjectBase<GroupProps> {
    defaultParams: Partial<GroupProps> = {};
    user!: UserContext;

    modalObject!: GroupModalTestObject;
    itemObject!: ItemTestObject;

    protected initialiseSubObjects(): void {
        this.modalObject = new GroupModalTestObject();
        this.modalObject.initialiseWithParentObject(this.wrapper);

        this.itemObject = new ItemTestObject();
        this.itemObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: GroupProps) {
        return (
            <userContext.Provider value={this.user}>
                <GroupPage {...props} />
            </userContext.Provider>
        );
    }

    clickAdd() {
        this.clickByText('Add new group');
    }
}
