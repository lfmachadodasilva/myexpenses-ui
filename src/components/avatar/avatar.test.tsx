import { AvatarChipPageObject, AvatarMenuPageObject } from './avatar.pageTest';

describe('<AvatarChipComponent />', () => {
    test('should show user', async () => {
        const page = new AvatarChipPageObject();
        await page.initialiseComponent({
            user: {
                id: 'user2',
                displayName: 'User 2',
                email: 'user2@test.com',
                photoUrl: 'url2'
            }
        });

        expect(page.getElement('User')).toBeInTheDocument();
    });

    test('should show email instead of display name', async () => {
        const page = new AvatarChipPageObject();
        await page.initialiseComponent({
            user: {
                id: 'user2',
                displayName: '',
                email: 'user2@test.com',
                photoUrl: 'url2'
            }
        });

        expect(page.getElement('user2')).toBeInTheDocument();
    });

    test('should show user as you', async () => {
        const page = new AvatarChipPageObject();
        await page.initialiseComponent({
            user: {
                id: 'user1',
                displayName: 'User 1',
                email: 'user1@test.com',
                photoUrl: 'url1'
            }
        });

        expect(page.getElement('COMMON.YOU')).toBeInTheDocument();
    });

    test('should show user first letter', async () => {
        const page = new AvatarChipPageObject();
        await page.initialiseComponent({
            user: {
                id: 'user1',
                displayName: 'User 1',
                email: 'user1@test.com',
                photoUrl: ''
            }
        });

        expect(page.getElement('U')).toBeInTheDocument();
    });
});

describe('<AvatarMenuComponent />', () => {
    test('should show user', async () => {
        const page = new AvatarMenuPageObject();
        await page.initialiseComponent({
            user: {
                id: 'user2',
                displayName: 'User 2',
                email: 'user2@test.com',
                photoUrl: 'url2'
            }
        });

        expect(page.getElement('User')).toBeInTheDocument();
        expect(page.getElement('user2@test.com')).toBeInTheDocument();
    });

    test('should show email instead of display name', async () => {
        const page = new AvatarMenuPageObject();
        await page.initialiseComponent({
            user: {
                id: 'user2',
                displayName: '',
                email: 'user2@test.com',
                photoUrl: 'url2'
            }
        });

        expect(page.getElement('user2')).toBeInTheDocument();
    });

    test('should show user as you', async () => {
        const page = new AvatarMenuPageObject();
        await page.initialiseComponent({
            user: {
                id: 'user1',
                displayName: 'User 1',
                email: 'user1@test.com',
                photoUrl: 'url1'
            }
        });

        expect(page.getElement('COMMON.YOU')).toBeInTheDocument();
    });

    test('should show user first letter', async () => {
        const page = new AvatarMenuPageObject();
        await page.initialiseComponent({
            user: {
                id: 'user1',
                displayName: 'User 1',
                email: 'user1@test.com',
                photoUrl: ''
            }
        });

        expect(page.getElement('U')).toBeInTheDocument();
    });
});
