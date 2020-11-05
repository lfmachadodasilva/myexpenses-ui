import React from 'react';
import { fireEvent } from '@testing-library/react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { GroupModalPage, GroupModalProps } from './groupModal';
import { UserContext, userContext } from '../../contexts/user';
import { ModalTestObject } from '../../components/modal/modal.testObject';

export class GroupModalTestObject extends TestObjectBase<GroupModalProps> {
    defaultParams: Partial<GroupModalProps> = {};
    modalTestObject!: ModalTestObject;
    user!: UserContext;

    protected initialiseSubObjects(): void {
        this.modalTestObject = new ModalTestObject();
        this.modalTestObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: GroupModalProps) {
        return (
            <userContext.Provider value={this.user}>
                <GroupModalPage {...props} />
            </userContext.Provider>
        );
    }

    insertText(id: string, value: string | string[]) {
        const input = this.getByTestId(id);
        fireEvent.change(input, { target: { value: value } });
    }

    async makeReadyToAdd() {
        // add name
        this.insertText('group-name-field', 'New group');
        // select one user
        this.insertText('group-users-field', ['1']);
    }
}
