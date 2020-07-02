import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

import Typography from '@material-ui/core/Typography';

import { GroupModel } from '../models/group';
import { SearchModel } from '../models/search';
import { GroupService } from '../services/groupService';
import { PrivateRoute } from '../helpers/privateRouter';
import { Routes } from './routes';
import { GroupsPage } from './groups/groups';
import { globalContext } from '../contexts/globalContext';
import { LabelsPage } from './labels/labels';
import { ExpensesPage } from './expenses/expenses';
import { AuthPage } from './auth/authPage';
import { AppConfig } from '../configurations/appConfig';
import { ConfigurationManager } from '../configurations/configurationManager';
import { hasValue } from '../helpers/utilHelper';
import { userContext } from '../contexts/userContext';

export const Main: React.FC = React.memo(() => {
    const { isReady } = React.useContext(userContext);

    const history = useHistory();
    const location = useLocation();

    const [config] = React.useState<AppConfig>(ConfigurationManager.get());

    const [groups, setGroups] = React.useState<GroupModel[]>([]);
    const [years] = React.useState<number[]>([new Date().getFullYear()]);
    const [group, setGroup] = React.useState<GroupModel>();
    const [month, setMonth] = React.useState<number>(new Date().getMonth());
    const [year, setYear] = React.useState<number>(new Date().getFullYear());
    const [isLoading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!isReady) {
            return;
        }

        const jsonString = JSON.stringify(queryString.parse(location.search));
        const searchParams = JSON.parse(jsonString) as SearchModel;
        setLoading(true);

        const setup = async () => {
            let groupsResults: GroupModel[];
            let groupResults: GroupModel | undefined;
            let monthResults: number;
            let yearResults: number;

            try {
                groupsResults = await new GroupService(config).getFullAll();
            } catch {
                groupsResults = [];
            }

            setGroups(groupsResults);
            if (hasValue(searchParams.group) && groupsResults.some(x => x.id === searchParams.group)) {
                groupResults = groupsResults.find(x => x.id === searchParams.group) as GroupModel;
            } else if (hasValue(groupsResults)) {
                groupResults = groupsResults[0];
            } else {
                // groupResults = {} as Partial<GroupModel>;
                // show error - does not have groups loaded
            }
            setGroup(groupResults);

            if (hasValue(searchParams.month) && searchParams.month >= 1 && searchParams.month <= 12) {
                monthResults = searchParams.month;
            } else {
                monthResults = new Date().getMonth();
            }
            setMonth(monthResults);

            // TODO get years from expenses
            if (hasValue(searchParams.year)) {
                yearResults = searchParams.year;
            } else {
                yearResults = new Date().getFullYear();
            }
            setYear(yearResults);

            history.push({
                pathname: location.pathname,
                search: queryString.stringify({
                    group: groupResults?.id,
                    month: monthResults,
                    year: yearResults
                })
            });

            setLoading(false);
        };
        setup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, location.search, isReady]);

    return (
        <>
            <globalContext.Provider
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
                            <Typography variant="h6">Build Version: {config.buildVersion}</Typography>
                        </>
                    </Route>
                    <Route path="*">
                        <h1> 404 </h1>
                    </Route>
                </Switch>
            </globalContext.Provider>
        </>
    );
});
