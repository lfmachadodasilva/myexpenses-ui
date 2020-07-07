import React from 'react';
// import { Switch, Route, useHistory, useLocation } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
// import queryString from 'query-string';

import { makeStyles, Theme, createStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';

import { Header } from '../components/header/header';
// import { ExpensesPage } from './expenses/expenses';
import { ConfigurationManager } from '../configurations/configurationManager';
import { AppConfig } from '../configurations/appConfig';
// import { LabelsPage } from './labels/labelsPage';
import { hasValue } from '../helpers/utilHelper';
import { userContext } from '../contexts/userContext';
// import { PrivateRoute } from '../helpers/privateRouter';
// import { AuthPage } from './auth/authPage';
import { useAuth } from '../services/authService';
// import { GroupsPage } from './groups/groups';
// import { Routes } from './routes';
import { UserService } from '../services/userService';
import { UserModel } from '../models/user';
import { LoadingComponent } from '../components/loading/loading';
import { Main } from './main';
// import { globalContext } from '../contexts/globalContext';
// import { GroupModel } from '../models/groupModel';
// import { SearchModel } from '../models/search';
// import { GroupService } from '../services/groupService';
// import { setgroups } from 'process';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            flexGrow: 1,
            marginTop: 10
        }
    })
);

const Application: React.FC = React.memo(() => {
    // const history = useHistory();
    // const location = useLocation();

    const classes = useStyles();
    const [config] = React.useState<AppConfig>(ConfigurationManager.get());

    // const [groups, setGroups] = React.useState<GroupModel[]>([]);
    // const [years, setYears] = React.useState<number[]>([new Date().getFullYear()]);
    // const [group, setGroup] = React.useState<GroupModel>();
    // const [month, setMonth] = React.useState<number>(new Date().getMonth());
    // const [year, setYear] = React.useState<number>(new Date().getFullYear());
    // const [isLoading, setLoading] = React.useState<boolean>(false);

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

    // React.useEffect(() => {
    //     const jsonString = JSON.stringify(queryString.parse(location.search));
    //     const searchParams = JSON.parse(jsonString) as SearchModel;
    //     setLoading(true);

    //     const setup = async () => {
    //         let groupsResults: GroupModel[];
    //         let groupResults: GroupModel | undefined;
    //         let monthResults: number;
    //         let yearResults: number;

    //         console.log(searchParams);

    //         try {
    //             groupsResults = await new GroupService(config).getFullAll();
    //         } catch {
    //             groupsResults = [];
    //         }

    //         console.log(groupsResults);

    //         setGroups(groupsResults);
    //         if (hasValue(searchParams.group) && groupsResults.some(x => x.id === searchParams.group)) {
    //             groupResults = groupsResults.find(x => x.id === searchParams.group) as GroupModel;
    //         } else if (hasValue(groupsResults)) {
    //             groupResults = groupsResults[0];
    //         } else {
    //             // groupResults = {} as Partial<GroupModel>;
    //             // show error - does not have groups loaded
    //         }
    //         setGroup(groupResults);

    //         console.log(groupResults);

    //         if (hasValue(searchParams.month) && searchParams.month >= 1 && searchParams.month <= 12) {
    //             monthResults = searchParams.month;
    //         } else {
    //             monthResults = new Date().getMonth();
    //         }
    //         setMonth(monthResults);

    //         console.log(monthResults);

    //         // TODO get years from expenses
    //         if (hasValue(searchParams.year)) {
    //             yearResults = searchParams.year;
    //         } else {
    //             yearResults = new Date().getFullYear();
    //         }
    //         setMonth(yearResults);

    //         console.log(yearResults);

    //         // history.push({
    //         //     pathname: location.pathname,
    //         //     search: queryString.stringify({
    //         //         group: groupResults,
    //         //         month: monthResults,
    //         //         year: yearResults
    //         //     })
    //         // });

    //         setLoading(false);
    //     };
    //     setup();
    // }, [config, location.search]);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light'
                },
                typography: {
                    button: {
                        textTransform: 'none'
                    }
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
                        initialising: initialising,
                        isReady: isReady
                    }}
                >
                    <BrowserRouter basename={process.env.PUBLIC_URL ?? undefined}>
                        <Header />
                        <Container maxWidth="md" className={classes.container}>
                            <LoadingComponent showLoading={initialising}>
                                <Main />
                                {/* <globalContext.Provider
                                    value={{
                                        isLoading: isLoading,
                                        groups: groups,
                                        years: years,
                                        group: group,
                                        month: month,
                                        year: year
                                    }}
                                >
                                    <Switch>
                                        <PrivateRoute path={Routes.groups} component={GroupsPage} />
                                        <PrivateRoute path={Routes.labels} component={LabelsPage} />
                                        <PrivateRoute path={Routes.expenses} component={ExpensesPage} />

                                        <Route path={Routes.auth} component={AuthPage} />
                                        <Route exact path={Routes.home}>
                                            <>
                                                <Typography variant="h3">HOME</Typography>
                                                <Typography variant="h6">
                                                    Build Version: {config.buildVersion}
                                                </Typography>
                                            </>
                                        </Route>
                                        <Route path="*">
                                            <h1> 404 </h1>
                                        </Route>
                                    </Switch>
                                </globalContext.Provider> */}
                            </LoadingComponent>
                        </Container>
                    </BrowserRouter>
                </userContext.Provider>
            </ThemeProvider>
        </>
    );
});

export const App = Application;
