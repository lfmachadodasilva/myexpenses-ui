import React from 'react';

import { GlobalContext, globalContext } from '../../contexts/global';
import { userContext } from '../../contexts/user';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { LabelPage, LabelProps } from './label';
import { LabelModalTestObject } from '../labelModal/labelModal.testObject';
import { ItemTestObject } from '../../components/item/item.testObject';

export class AppTestObject extends TestObjectBase<LabelProps> {
    defaultParams: Partial<LabelProps> = {};

    user: firebase.User | null = null;
    initialising: boolean = false;
    isReady: boolean = false;

    global!: GlobalContext;

    modalObject!: LabelModalTestObject;
    itemObject!: ItemTestObject;

    protected initialiseSubObjects(): void {
        this.modalObject = new LabelModalTestObject();
        this.modalObject.initialiseWithParentObject(this.wrapper);

        this.itemObject = new ItemTestObject();
        this.itemObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: LabelProps) {
        return (
            <userContext.Provider
                value={{
                    user: this.user,
                    initialising: this.initialising,
                    isReady: this.isReady
                }}
            >
                <globalContext.Provider value={this.global}>
                    <LabelPage {...props} />
                </globalContext.Provider>
            </userContext.Provider>
        );
    }

    clickAdd() {
        this.clickByText('Add new label');
    }
}
