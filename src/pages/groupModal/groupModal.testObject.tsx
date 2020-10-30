import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { GroupModalPage, GroupModalProps } from './groupModal';
import { UserContext, userContext } from '../../contexts/user';

export class GroupModalTestObject extends TestObjectBase<GroupModalProps> {
    defaultParams: Partial<GroupModalProps> = {};
    user!: UserContext;

    protected initialiseSubObjects(): void {}

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

    clickAdd() {
        this.clickByText('Add');
    }

    clickEdit() {
        this.clickByText('Edit');
    }

    clickClose() {
        fireEvent.click(this.CloseButton as Element);
    }

    async waitModalToShow() {
        await wait(() => expect(this.Modal).toBeInTheDocument());
    }

    async waitModalToHide() {
        await wait(() => expect(this.Modal).not.toBeInTheDocument());
    }

    get Modal() {
        return this.querySelector('.modal-content');
    }

    get CloseButton() {
        return this.querySelector('.close');
    }
}
