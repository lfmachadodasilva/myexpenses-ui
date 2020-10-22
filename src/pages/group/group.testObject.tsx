import { fireEvent, wait } from '@testing-library/react';
import React from 'react';

import { userContext } from '../../contexts/user';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { GroupPage, GroupProps } from './group';
import { GroupModalTestObject } from './groupModal.testObject';

export class GroupTestObject extends TestObjectBase<GroupProps> {
    defaultParams: Partial<GroupProps> = {};

    user: firebase.User | null = null;
    initialising: boolean = false;
    isReady: boolean = false;

    modalObject!: GroupModalTestObject;

    protected initialiseSubObjects(): void {
        this.modalObject = new GroupModalTestObject();
        this.modalObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: GroupProps) {
        return (
            <userContext.Provider
                value={{
                    user: this.user,
                    initialising: this.initialising,
                    isReady: this.isReady
                }}
            >
                <GroupPage {...props} />
            </userContext.Provider>
        );
    }

    clickAdd() {
        this.clickByText('Add new group');
    }

    async clickEditFor(id: number) {
        fireEvent.click(this.querySelector(`#group-menu-${id}`) as Element);

        await wait(() => {
            expect(this.queryByText('Edit')).toBeInTheDocument();
        });

        fireEvent.click(this.getByText('Edit'));
    }

    async clickDeleteFor(id: number) {
        fireEvent.click(this.querySelector(`#group-menu-${id}`) as Element);

        await wait(() => {
            expect(this.queryByText('Delete')).toBeInTheDocument();
        });

        fireEvent.click(this.getByText('Delete'));
    }
}
