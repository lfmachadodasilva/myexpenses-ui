import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { ConfigManager } from '../configurations/configManager';
import { ConfigModel } from '../models/config';
import { AuthPage } from './auth/auth';
import { ExpensePage } from './expense/expense';
import { GroupPage } from './group/group';
import { LabelPage } from './label/label';
import { Routes } from './routes';
import { SettingsPage } from './settings/settings';

import { userContext } from '../contexts/user';
import { PrivateRoute } from '../helpers/privateRouter';
import { GroupModel } from '../models/group';
import { GroupService } from '../services/group';
import { ExpenseService } from '../services/expense';
import { globalContext } from '../contexts/global';
import { SearchModel } from '../models/search';
import { hasValue } from '../helpers/util';

export type MainProps = {};

export const MainPage: React.FC<MainProps> = React.memo((_props: MainProps) => {
    const { user, isReady } = useContext(userContext);
    const history = useHistory();
    const location = useLocation();

    const [config] = React.useState<ConfigModel>(ConfigManager.get());

    const [isLoading, setLoading] = React.useState<boolean>(true);

    const [groups, setGroups] = React.useState<GroupModel[]>([]);
    const [years, setYears] = React.useState<number[]>([]);

    const [group, setGroup] = React.useState<GroupModel>();
    const [month, setMonth] = React.useState<number>(new Date().getMonth());
    const [year, setYear] = React.useState<number>(0);

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
            let yearsResults: number[];
            let yearResults: number;

            if (groups.length > 0) {
                groupsResults = groups;
            } else {
                try {
                    groupsResults = await new GroupService(config).getAll(user?.uid ?? '');
                } catch {
                    groupsResults = [];
                }

                console.log('load again ', groupsResults);
            }

            const lastGroup = localStorage.getItem('group') as string;
            setGroups(groupsResults);
            if (hasValue(searchParams.group) && groupsResults.some(x => x.id === +searchParams.group)) {
                groupResults = groupsResults.find(x => x.id === +searchParams.group) as GroupModel;
            } else if (hasValue(lastGroup) && groupsResults.some(x => x.id === +lastGroup)) {
                groupResults = groupsResults.find(x => x.id === +lastGroup) as GroupModel;
            } else if (hasValue(groupsResults)) {
                groupResults = groupsResults[0];
            } else {
                // groupResults = {} as Partial<GroupModel>;
                // show error - does not have groups loaded
            }

            setGroup(groupResults);
            localStorage.setItem('group', groupResults?.id.toString() as string);

            const lastMonth = localStorage.getItem('month') as string;
            if (hasValue(searchParams.month) && searchParams.month >= 1 && searchParams.month <= 12) {
                monthResults = searchParams.month;
            } else if (hasValue(lastMonth) && +lastMonth >= 1 && +lastMonth <= 12) {
                monthResults = +lastMonth;
            } else {
                monthResults = new Date().getMonth();
            }
            setMonth(monthResults);
            localStorage.setItem('month', monthResults.toString());

            if (years.length > 0) {
                yearsResults = years;
            } else {
                try {
                    yearsResults = await new ExpenseService(config).getYears(groupResults?.id ?? 0);
                } catch {
                    yearsResults = [];
                }
            }

            // TODO get years from expenses
            const lastYear = localStorage.getItem('year') as string;
            setYears(yearsResults);
            if (hasValue(searchParams.year) && yearsResults.some(x => x === +searchParams.year)) {
                yearResults = searchParams.year;
            } else if (hasValue(lastYear) && yearsResults.some(x => x === +lastYear)) {
                yearResults = +lastYear;
            } else {
                yearResults = new Date().getFullYear();
            }
            setYear(yearResults);
            localStorage.setItem('year', yearResults.toString());

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
    }, [config, history, location, isReady, user]);

    return (
        <>
            <globalContext.Provider
                value={{
                    isLoading: isLoading,

                    groups: groups,
                    years: years,

                    group: group?.id ?? 0,
                    month: month,
                    year: year
                }}
            >
                <Container className="mt-2">
                    <Switch>
                        {isReady && <PrivateRoute key={Routes.group} path={Routes.group} component={GroupPage} />}
                        {isReady && <PrivateRoute key={Routes.label} path={Routes.label} component={LabelPage} />}
                        {isReady && <PrivateRoute key={Routes.expense} path={Routes.expense} component={ExpensePage} />}
                        <PrivateRoute key={Routes.settings} path={Routes.settings} component={SettingsPage} />
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
            </globalContext.Provider>
        </>
    );
});
