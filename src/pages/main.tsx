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
import { ImportPage } from './import/import';
import { LabelModel } from '../models/label';
import { LabelService } from '../services/label';
import { ExportPage } from './export/export';

export type MainProps = {};

export const MainPage: React.FC<MainProps> = React.memo((_props: MainProps) => {
    const { isReady } = useContext(userContext);
    const history = useHistory();
    const location = useLocation();

    const [config] = React.useState<ConfigModel>(ConfigManager.get());

    const [isLoadingGroups, setLoadingGroups] = React.useState<boolean>(true);
    const [isLoadingLabels, setLoadingLabels] = React.useState<boolean>(true);
    const [isLoadingYears, setLoadingYears] = React.useState<boolean>(true);
    const [isSelectingGroup, setSelectingGroup] = React.useState<boolean>(true);
    const [isSelectingMonth, setSelectingMonth] = React.useState<boolean>(true);
    const [isSelectingYear, setSelectingYear] = React.useState<boolean>(true);
    const [isPushing, setPushing] = React.useState<boolean>(true);
    const isLoading = React.useMemo(
        () =>
            isLoadingGroups ||
            isLoadingLabels ||
            isLoadingYears ||
            isSelectingGroup ||
            isSelectingMonth ||
            isSelectingYear ||
            isPushing,
        [
            isLoadingGroups,
            isLoadingLabels,
            isLoadingYears,
            isSelectingGroup,
            isSelectingMonth,
            isSelectingYear,
            isPushing
        ]
    );

    const [labels, setLabels] = React.useState<LabelModel[]>([]);
    const [groups, setGroups] = React.useState<GroupModel[]>([]);
    const [years, setYears] = React.useState<number[]>([]);

    const [loadGroups, setLoadGroups] = React.useState<boolean>(true);
    const [loadLabels, setLoadLabels] = React.useState<boolean>(true);

    const [group, setGroup] = React.useState<GroupModel>();
    const [month, setMonth] = React.useState<number>();
    const [year, setYear] = React.useState<number>();

    const searchParams = React.useMemo(() => {
        const jsonString = JSON.stringify(queryString.parse(location.search));
        return JSON.parse(jsonString) as SearchModel;
    }, [location]);

    // #region load groups
    React.useEffect(() => {
        if (!loadGroups) {
            return;
        }

        const runAsync = async () => {
            let results: GroupModel[] = [];

            if (!isReady) {
                setGroups(results);
                return;
            }

            setLoadingGroups(true);
            try {
                results = await new GroupService(config).getAll();
            } catch {
                results = [];
            }

            console.log('load Groups', results);
            setGroups(results);
            setLoadingGroups(false);
            setLoadGroups(!loadGroups);
        };
        runAsync();
    }, [isReady, config, loadGroups]);
    // #endregion

    // #region select group
    React.useEffect(() => {
        if (!isReady || !hasValue(groups)) {
            setGroup(undefined);
            return;
        }

        setSelectingGroup(true);

        let selected: GroupModel | undefined;
        const lastGroup = localStorage.getItem('group') as string;
        if (hasValue(searchParams.group) && groups.some(x => x.id === +searchParams.group)) {
            selected = groups.find(x => x.id === +searchParams.group) as GroupModel;
        } else if (hasValue(lastGroup) && groups.some(x => x.id === +lastGroup)) {
            selected = groups.find(x => x.id === +lastGroup) as GroupModel;
        } else if (hasValue(groups)) {
            selected = groups[0];
        } else {
            // groupResults = {} as Partial<GroupModel>;
            // show error - does not have groups loaded
            // setLoading(false);
            // return undefined;
        }

        console.log('setGroup', selected, searchParams.group);
        setGroup(selected);
        if (selected) {
            localStorage.setItem('group', selected.id.toString());
        }
        setSelectingGroup(false);
    }, [groups, isReady, searchParams.group]);
    // #endregion

    // #region load labels
    React.useEffect(() => {
        if (!loadLabels) {
            return;
        }

        const runAsync = async () => {
            let results: LabelModel[] = [];

            if (!isReady || !hasValue(group)) {
                setLabels(results);
                return;
            }

            setLoadingLabels(true);

            try {
                results = await new LabelService(config).getAll(group?.id ?? 0);
            } catch {
                results = [];
            }

            console.log('load Labels', results);
            setLabels(results);
            setLoadingLabels(false);
            setLoadLabels(!loadLabels);
        };
        runAsync();
    }, [isReady, config, group, loadLabels]);
    // #endregion

    // #region load years
    React.useEffect(() => {
        const runAsync = async () => {
            let results: number[] = [];

            if (!isReady || !hasValue(group)) {
                setYears(results);
                return;
            }

            setLoadingYears(true);
            try {
                results = await new ExpenseService(config).getYears(group?.id ?? 0);
            } catch {
                results = [];
            }

            if (!hasValue(results)) {
                results = [new Date().getFullYear()];
            }

            console.log('load Years', results, group);
            setYears(results);
            setLoadingYears(false);
        };
        runAsync();
    }, [isReady, config, group]);
    // #endregion

    // #region select year
    React.useEffect(() => {
        if (!isReady || !hasValue(years)) {
            return;
        }

        setSelectingYear(true);

        let selected = new Date().getFullYear();

        const lastYear = localStorage.getItem('year') as string;
        if (hasValue(searchParams.year) && years.some(x => x === +searchParams.year)) {
            selected = +searchParams.year;
        } else if (hasValue(lastYear) && years.some(x => x === +lastYear)) {
            selected = +lastYear;
        }

        console.log('setYear', selected, +searchParams.year);
        setYear(selected);
        localStorage.setItem('year', selected.toString());
        setSelectingYear(false);
    }, [years, isReady, searchParams.year]);
    // #endregion

    // #region select month
    React.useEffect(() => {
        if (!isReady) {
            return;
        }

        setSelectingMonth(true);

        let selected = new Date().getMonth();
        const lastMonth = localStorage.getItem('month') as string;
        if (hasValue(searchParams.month) && searchParams.month >= 1 && searchParams.month <= 12) {
            selected = searchParams.month;
        } else if (hasValue(lastMonth) && +lastMonth >= 1 && +lastMonth <= 12) {
            selected = +lastMonth;
        }

        console.log('setMonth', selected, searchParams.month);
        setMonth(selected);
        localStorage.setItem('month', selected.toString());
        setSelectingMonth(false);
    }, [isReady, searchParams.month]);
    // #endregion

    // #region push changes
    React.useEffect(() => {
        if (
            !isReady ||
            !hasValue(group) ||
            !hasValue(year) ||
            !hasValue(month) ||
            isSelectingGroup ||
            isSelectingMonth ||
            isSelectingYear
        ) {
            return;
        }

        setPushing(true);
        console.log('history.push', group, month, year);
        history.push({
            pathname: location.pathname,
            search: queryString.stringify({
                group: group?.id,
                month: month,
                year: year
            })
        });
        setPushing(false);
    }, [isReady, group, month, year, history, location.pathname, isSelectingGroup, isSelectingMonth, isSelectingYear]);
    // #endregion

    const handleToReloadLabels = React.useCallback(() => {
        setLoadLabels(!loadLabels);
    }, [loadLabels]);

    const handleToReloadGroups = React.useCallback(() => {
        setLoadGroups(!loadGroups);
        setLoadLabels(!loadLabels);
    }, [loadGroups, loadLabels]);

    const enablePrivateRoute = React.useMemo(() => {
        return isReady;
    }, [isReady]);

    return (
        <>
            <globalContext.Provider
                value={{
                    isLoading: isLoading,

                    labels: labels,

                    groups: groups,
                    years: years,

                    group: group?.id ?? 0,
                    month: month ?? 0,
                    year: year ?? 0,

                    reloadLabels: handleToReloadLabels,
                    reloadGroups: handleToReloadGroups
                }}
            >
                <Container className="mt-2 pl-1 pr-1">
                    <Switch>
                        {enablePrivateRoute && (
                            <PrivateRoute key={Routes.group} path={Routes.group} component={GroupPage} />
                        )}
                        {enablePrivateRoute && (
                            <PrivateRoute key={Routes.label} path={Routes.label} component={LabelPage} />
                        )}
                        {enablePrivateRoute && (
                            <PrivateRoute key={Routes.expense} path={Routes.expense} component={ExpensePage} />
                        )}
                        {enablePrivateRoute && (
                            <PrivateRoute key={Routes.settings} path={Routes.settings} component={SettingsPage} />
                        )}
                        {enablePrivateRoute && (
                            <PrivateRoute key={Routes.import} path={Routes.import} component={ImportPage} />
                        )}
                        {enablePrivateRoute && (
                            <PrivateRoute key={Routes.export} path={Routes.export} component={ExportPage} />
                        )}

                        <Route key={Routes.auth} path={Routes.auth} component={AuthPage} />
                        <Route key={Routes.home} exact path={Routes.home}>
                            <>
                                <h3>HOME</h3>
                                <h6>Build Version: {config.buildVersion}</h6>
                            </>
                        </Route>

                        {isReady && (
                            <Route key={'*'} path="*">
                                <h1> 404 </h1>
                            </Route>
                        )}
                    </Switch>
                </Container>
            </globalContext.Provider>
        </>
    );
});
