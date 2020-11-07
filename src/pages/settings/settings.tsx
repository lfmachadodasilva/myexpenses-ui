import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'firebase';

import Form from 'react-bootstrap/Form';

import { userContext } from '../../contexts/user';
import { ItemsHeaderComponent } from '../../components/itemsHeader/itemsHeader';
import { ConfigModel } from '../../models/config';
import { ConfigManager } from '../../configurations/configManager';
import { updateUser } from '../../services/auth';
import { AlertComponent } from '../../components/alert/alert';

export type SettingsProps = {};

export const SettingsPage: React.FC<SettingsProps> = React.memo((props: SettingsProps) => {
    const user = useContext(userContext);
    const [t] = useTranslation();

    const [displayName, setDisplayName] = React.useState<string>('');
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const [error, setError] = React.useState<string>('');

    const handleOnChangeDarkTheme = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            user.setDarkTheme(event.target.checked);
        },
        [user]
    );

    const handleOnChangeDisplayName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(event.target.value);
    }, []);

    const handleOnUpdate = React.useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            await updateUser(config, user.user as User, displayName);
        } catch {
            setError(t('SETTINGS.ERROR'));
        } finally {
            setLoading(false);
        }
    }, [displayName, config, user.user, t]);

    React.useEffect(() => {
        setDisplayName(user.user?.displayName ?? '');
    }, [user.user]);

    return (
        <>
            <div className="m-2 d-flex justify-content-center">
                <div className="col-xs-12 col-sm-8 col-md-6">
                    <ItemsHeaderComponent
                        title={t('SETTINGS.TITLE')}
                        action={t('SETTINGS.UPDATE')}
                        onAction={handleOnUpdate}
                        disableAction={isLoading}
                    />
                    <AlertComponent message={error} type="danger" />
                    <Form>
                        <Form.Check
                            className="mb-2"
                            type="switch"
                            id="custom-switch"
                            label={t('SETTINGS.DARK_THEME')}
                            checked={user.isDarkTheme}
                            onChange={handleOnChangeDarkTheme}
                        />
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>{t('SETTINGS.DISPLAY_NAME')}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t('SETTINGS.DISPLAY_NAME_PLACEHOLDER')}
                                value={displayName}
                                onChange={handleOnChangeDisplayName}
                            />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    );
});
