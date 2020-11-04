import React from 'react';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import useMedia from 'use-media/lib/useMedia';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase';

import { HeaderComponent } from '../components/header/header';
import { ConfigManager } from '../configurations/configManager';
import { ConfigModel } from '../models/config';

import { GlobalStyles } from './globalSyles';
import { darkTheme, lightTheme } from './theme';
import { hasValue } from '../helpers/util';
import { userContext } from '../contexts/user';
import { MainPage } from './main';
import { UserService } from '../services/user';
import { UserModel } from '../models/user';

export type AppProps = {};

export const AppPage: React.FC<AppProps> = React.memo((_props: AppProps) => {
    const [user, initialising] = useAuthState(auth());
    const colorScheme = useMedia('(prefers-color-scheme: dark)');

    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const [isDarkTheme, setDarkTheme] = React.useState<boolean>();
    const [isReady, setReady] = React.useState<boolean>(false);

    const handleDarkTheme = React.useCallback((dark: boolean) => {
        setDarkTheme(dark);
    }, []);

    const theme = React.useMemo(() => {
        let theme = colorScheme;

        if (hasValue(localStorage.getItem('darkTheme'))) {
            theme = JSON.parse(localStorage.getItem('darkTheme') as string);
            setDarkTheme(theme);
        }

        if (hasValue(isDarkTheme) && isDarkTheme !== theme) {
            theme = isDarkTheme as boolean;
            setDarkTheme(theme);
            localStorage.setItem('darkTheme', theme.toString());
        }

        return theme ? darkTheme : lightTheme;
    }, [isDarkTheme, colorScheme]);

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
            <ThemeProvider theme={theme}>
                <>
                    <GlobalStyles />
                    <userContext.Provider
                        value={{
                            user: user,
                            initialising: initialising,
                            isReady: isReady,
                            isDarkTheme: isDarkTheme ?? true,
                            setDarkTheme: handleDarkTheme
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
