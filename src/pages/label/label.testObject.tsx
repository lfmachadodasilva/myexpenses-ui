import React from 'react';

import { GlobalContext, globalContext } from '../../contexts/global';
import { UserContext, userContext } from '../../contexts/user';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { LabelPage, LabelProps } from './label';
import { LabelModalTestObject } from '../labelModal/labelModal.testObject';
import { ItemTestObject } from '../../components/item/item.testObject';

export class AppTestObject extends TestObjectBase<LabelProps> {
    defaultParams: Partial<LabelProps> = {};

    user!: UserContext;
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
            <userContext.Provider value={this.user}>
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
