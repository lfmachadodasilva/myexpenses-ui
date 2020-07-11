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
import { LabelModel } from '../models/label';
import { LabelService } from '../services/labelService';

export const Main: React.FC = React.memo(() => {
    const { isReady } = React.useContext(userContext);

    const history = useHistory();
    const location = useLocation();

    const [config] = React.useState<AppConfig>(ConfigurationManager.get());

    const [groups, setGroups] = React.useState<GroupModel[]>([]);
    const [years] = React.useState<number[]>([new Date().getFullYear()]);
    const [labels, setLabels] = React.useState<LabelModel[]>([]);
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
            let labelsResults: LabelModel[];
            let groupResults: GroupModel | undefined;
            let monthResults: number;
            let yearResults: number;

            if (groups.length > 0) {
                groupsResults = groups;
            } else {
                try {
                    groupsResults = await new GroupService(config).getAll();
                } catch {
                    groupsResults = [];
                }
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

            if (groupResults !== group) {
                // group changes, need o reload labels
                try {
                    labelsResults = await new LabelService(config).getAll(groupResults?.id as number);
                } catch {
                    labelsResults = [];
                }
                setLabels(labelsResults);
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

            // TODO get years from expenses
            const lastYear = localStorage.getItem('year') as string;
            if (hasValue(searchParams.year)) {
                yearResults = searchParams.year;
            } else if (hasValue(lastYear)) {
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
    }, [config, location.search, isReady]);

    return (
        <>
            <globalContext.Provider
                value={{
                    isLoading: isLoading,
                    groups: groups,
                    labels: labels,
                    years: years,
                    group: group,
                    month: month,
                    year: year
                }}
            >
                <Switch>
                    <PrivateRoute key={Routes.groups} path={Routes.groups} component={GroupsPage} />
                    <PrivateRoute key={Routes.labels} path={Routes.labels} component={LabelsPage} />
                    <PrivateRoute key={Routes.expenses} path={Routes.expenses} component={ExpensesPage} />

                    <Route key={Routes.auth} path={Routes.auth} component={AuthPage} />
                    <Route key={Routes.home} exact path={Routes.home}>
                        <>
                            <Typography variant="h3">HOME</Typography>
                            <Typography variant="h6">Build Version: {config.buildVersion}</Typography>
                        </>
                    </Route>
                    <Route key={'*'} path="*">
                        <h1> 404 </h1>
                    </Route>
                </Switch>
            </globalContext.Provider>
        </>
    );
});
