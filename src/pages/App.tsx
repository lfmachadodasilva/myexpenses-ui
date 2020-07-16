import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { makeStyles, Theme, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';

import { Header } from '../components/header/header';
import { ConfigurationManager } from '../configurations/configurationManager';
import { AppConfig } from '../configurations/appConfig';
import { hasValue } from '../helpers/utilHelper';
import { userContext } from '../contexts/userContext';
import { useAuth } from '../services/authService';
import { UserService } from '../services/userService';
import { UserModel } from '../models/user';
import { LoadingComponent } from '../components/loading/loading';
import { Main } from './main';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            flexGrow: 1,
            marginTop: 10
        }
    })
);

const Application: React.FC = React.memo(() => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const classes = useStyles();
    const [config] = React.useState<AppConfig>(ConfigurationManager.get());
    const { user, initialising } = useAuth();
    const [isReady, setReady] = React.useState<boolean>(false);
    const [isDarkTheme, setDarkTheme] = React.useState<boolean>();

    const handleDarkTheme = React.useCallback(
        (dark: boolean) => {
            console.log(isDarkTheme, !isDarkTheme);
            setDarkTheme(dark);
        },
        [isDarkTheme]
    );

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

    const theme = React.useMemo(() => {
        let theme = prefersDarkMode;

        if (hasValue(localStorage.getItem('darkTheme'))) {
            console.log('localStorage ', hasValue(localStorage.getItem('darkTheme')));
            theme = JSON.parse(localStorage.getItem('darkTheme') as string);
            setDarkTheme(theme);
        }

        if (hasValue(isDarkTheme) && isDarkTheme !== theme) {
            theme = isDarkTheme as boolean;
            setDarkTheme(theme);
            localStorage.setItem('darkTheme', theme.toString());
        }

        return createMuiTheme({
            palette: {
                type: theme ? 'dark' : 'light'
            },
            typography: {
                button: {
                    textTransform: 'none'
                }
            }
        });
    }, [prefersDarkMode, isDarkTheme]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <userContext.Provider
                    value={{
                        user: user,
                        initialising: initialising,
                        isReady: isReady,
                        isDarkTheme: isDarkTheme ?? prefersDarkMode,
                        setDarkTheme: handleDarkTheme
                    }}
                >
                    <BrowserRouter basename={process.env.PUBLIC_URL ?? undefined}>
                        <Header />
                        <Container key={'MainContainer'} maxWidth="md" className={classes.container}>
                            <LoadingComponent showLoading={initialising}>
                                <Main />
                            </LoadingComponent>
                        </Container>
                    </BrowserRouter>
                </userContext.Provider>
            </ThemeProvider>
        </>
    );
});

export const App = Application;
