import React, { memo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { makeStyles, Theme, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { Header } from '../components/header/header';
import { ExpensesPage } from './expenses/expensesPage';
import { ConfigurationManager } from '../configurations/configurationManager';
import { AppConfig } from '../configurations/appConfig';
import { LabelsPage } from './labels/labelsPage';
import { hasValue } from '../helpers/utilHelper';
import { userContext } from '../contexts/userContext';
import { PrivateRoute } from '../helpers/privateRouter';
import { AuthPage } from './auth/authPage';
import { useAuth } from '../services/authService';
import { GroupsPage } from './groups/groupsPage';
import { Routes } from './routes';
import { UserService } from '../services/userService';
import { UserModel } from '../models/userModel';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            flexGrow: 1,
            marginTop: 10
        }
    })
);

const Application: React.FC = memo(() => {
    const classes = useStyles();
    const [config] = useState<AppConfig>(ConfigurationManager.get());

    const { user, initialising } = useAuth();
    useEffect(() => {
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
                    photoURL: user.photoURL
                } as UserModel);
            });
        }
    }, [user, initialising, config]);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light'
                }
            }),
        [prefersDarkMode]
    );

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <userContext.Provider
                    value={{
                        user: user,
                        initialising: initialising
                    }}
                >
                    <BrowserRouter>
                        <Header />
                        <Container maxWidth="md" className={classes.container}>
                            {!initialising ? (
                                <Switch>
                                    <PrivateRoute path={Routes.groups} component={GroupsPage} />
                                    <PrivateRoute path={Routes.labels} component={LabelsPage} />
                                    <PrivateRoute path={Routes.expenses} component={ExpensesPage} />

                                    <Route path={Routes.auth} component={AuthPage} />
                                    <Route exact path={Routes.home}>
                                        <>
                                            <Typography variant="h3">HOME</Typography>
                                            <Typography variant="h6">Build Version: {config.buildVersion}</Typography>
                                        </>
                                    </Route>
                                    <Route path="*">
                                        <h1> 404 </h1>
                                    </Route>
                                </Switch>
                            ) : (
                                <>
                                    <Typography variant="h3">HOME</Typography>
                                    <Typography variant="h6">Build Version: {config.buildVersion}</Typography>
                                </>
                            )}
                        </Container>
                    </BrowserRouter>
                </userContext.Provider>
            </ThemeProvider>
        </>
    );
});

export const App = Application;
