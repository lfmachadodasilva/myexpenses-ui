import React from 'react';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';

import { HeaderComponent } from '../components/header/header';
import { ConfigManager } from '../configurations/configManager';
import { ConfigModel } from '../models/config';
import { useAuth } from '../services/auth';

import { GlobalStyles } from './globalSyles';
import { darkTheme } from './theme';
import { hasValue } from '../helpers/util';
import { userContext } from '../contexts/user';
import { MainPage } from './main';
import { UserService } from '../services/user';
import { UserModel } from '../models/user';

export type AppProps = {};

export const AppPage: React.FC<AppProps> = React.memo((_props: AppProps) => {
    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const isDarkMode = React.useMemo(
        () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        []
    );
    const { user, initialising } = useAuth();

    const [isReady, setReady] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (initialising || !user) {
            return;
        }

        if (hasValue(user)) {
            user.getIdTokenResult().then((value: any) => {
                axios.defaults.headers.common.Authorization = value.token;
                new UserService(config).addOrUpdate({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoUrl: user.photoURL
                } as UserModel);
                setReady(true);
            });
        }
    }, [user, initialising, config]);

    return (
        <>
            <ThemeProvider theme={isDarkMode ? darkTheme : {}}>
                <>
                    <GlobalStyles />
                    <userContext.Provider
                        value={{
                            user: user,
                            initialising: initialising,
                            isReady: isReady
                        }}
                    >
                        {config.useHashRouter && (
                            <HashRouter basename="/">
                                <HeaderComponent />
                                <MainPage />
                            </HashRouter>
                        )}
                        {!config.useHashRouter && (
                            <BrowserRouter basename="/">
                                <HeaderComponent />
                                <MainPage />
                            </BrowserRouter>
                        )}
                    </userContext.Provider>
                </>
            </ThemeProvider>
        </>
    );
});
