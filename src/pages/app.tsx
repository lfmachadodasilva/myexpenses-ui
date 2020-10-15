import React from 'react';
import Container from 'react-bootstrap/Container';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';

import { HeaderComponent } from '../components/header/header';
import { ConfigManager } from '../configurations/configManager';
import { ConfigModel } from '../models/config';
import { useAuth } from '../services/auth';
import { AuthPage } from './auth/auth';
import { ExpensePage } from './expense/expense';
import { GlobalStyles } from './globalSyles';
import { GroupPage } from './group/group';
import { LabelPage } from './label/label';
import { Routes } from './routes';
import { SettingsPage } from './settings/settings';
import { darkTheme, lightTheme } from './theme';
import { hasValue } from '../helpers/util';
import { userContext } from '../contexts/user';

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
                // new UserService(config).addOrUpdate({
                //     id: user.uid,
                //     email: user.email,
                //     displayName: user.displayName,
                //     photoUrl: user.photoURL
                // } as UserModel);
                setReady(true);
            });
        }
    }, [user, initialising, config]);

    return (
        <>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <>
                    <GlobalStyles />
                    <userContext.Provider
                        value={{
                            user: user,
                            initialising: initialising,
                            isReady: isReady
                        }}
                    >
                        <HashRouter basename="/">
                            <HeaderComponent />
                            <Container className="mt-2">
                                <Switch>
                                    <Route key={Routes.group} path={Routes.group} component={GroupPage} />
                                    <Route key={Routes.label} path={Routes.label} component={LabelPage} />
                                    <Route key={Routes.expense} path={Routes.expense} component={ExpensePage} />
                                    <Route key={Routes.settings} path={Routes.settings} component={SettingsPage} />
                                    <Route key={Routes.auth} path={Routes.auth} component={AuthPage} />
                                    <Route key={Routes.home} exact path={Routes.home}>
                                        <>
                                            <h3>HOME</h3>
                                            <h6>Build Version: {config.buildVersion}</h6>
                                        </>
                                    </Route>
                                    <Route key={'*'} path="*">
                                        <h1> 404 </h1>
                                    </Route>
                                </Switch>
                            </Container>
                        </HashRouter>
                    </userContext.Provider>
                </>
            </ThemeProvider>
        </>
    );
});
