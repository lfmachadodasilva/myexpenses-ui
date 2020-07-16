import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { AvatarChipComponent, AvatarChipProps, AvatarMenuProps, AvatarMenuComponent } from './avatar';
import { userContext } from '../../contexts/userContext';
import { User } from 'firebase/app';

export class AvatarChipPageObject extends BasePage<AvatarChipProps> {
    protected user1 = {
        uid: 'user1',
        displayName: 'Name 1',
        email: 'user1@test.com',
        photoURL: 'url'
    } as Partial<User>;

    defaultParams: Partial<AvatarChipProps> = {};

    protected initialiseSubComponents(): void {}

    getElement(text: string) {
        return this.queryByText(text);
    }

    protected render(props: AvatarChipProps) {
        return (
            <userContext.Provider
                value={{
                    user: this.user1 as User | null,
                    initialising: false,
                    isReady: true,

                    isDarkTheme: false,
                    setDarkTheme: jest.fn()
                }}
            >
                <AvatarChipComponent {...props} />
            </userContext.Provider>
        );
    }
}

export class AvatarMenuPageObject extends BasePage<AvatarMenuProps> {
    protected user1 = {
        uid: 'user1',
        displayName: 'Name 1',
        email: 'user1@test.com',
        photoURL: 'url'
    } as Partial<User>;

    defaultParams: Partial<AvatarMenuProps> = {};

    protected initialiseSubComponents(): void {}

    getElement(text: string) {
        return this.queryByText(text);
    }

    protected render(props: AvatarMenuProps) {
        return (
            <userContext.Provider
                value={{
                    user: this.user1 as User | null,
                    initialising: false,
                    isReady: true,

                    isDarkTheme: false,
                    setDarkTheme: jest.fn()
                }}
            >
                <AvatarMenuComponent {...props} />
            </userContext.Provider>
        );
    }
}
