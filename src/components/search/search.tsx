import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';

import { GroupModel } from '../../models/group';
import { LoadingComponent, LoadingType } from '../loading/loading';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            maxWidth: 180
        },
        formControl: {
            width: '100%'
        },
        details: {
            alignItems: 'center'
        }
    })
);

export type SearchProps = {
    loading: boolean;

    // data to fill
    groups: GroupModel[];
    years: number[];

    // selected items
    group?: GroupModel;
    month: number;
    year: number;
};

export const SearchComponent: React.FC<SearchProps> = memo((props: SearchProps) => {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();

    const [t] = useTranslation();

    const [isExpanded, setExpanded] = React.useState<boolean>(false);

    const [groups, setGroups] = React.useState<GroupModel[]>(props.groups ?? []);
    const [months] = React.useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [years, setYears] = React.useState<number[]>(props.years);

    const [selectedGroup, setSelectedGroup] = React.useState<number | string>(props.group?.id ?? '');
    const selectedGroupName = React.useMemo<string>(() => groups.find(x => x.id === selectedGroup)?.name ?? '', [
        groups,
        selectedGroup
    ]);
    const [selectedMonth, setSelectedMonth] = React.useState<number>(props.month);
    const [selectedYear, setSelectedYear] = React.useState<number>(props.year);

    const groupsMenuItems = React.useMemo(
        () =>
            groups.map(group => (
                <option key={group.id} value={group.id}>
                    {group.name}
                </option>
            )),
        [groups]
    );

    const monthsMenuItems = React.useMemo(
        () =>
            months.map(month => (
                <option key={month} value={month}>
                    {t('SEARCH.MONTHS.' + month)}
                </option>
            )),
        [months, t]
    );

    const yearsMenuItems = React.useMemo(
        () =>
            years.map(year => (
                <option key={year} value={year}>
                    {year}
                </option>
            )),
        [years]
    );

    const handleChangeGroup = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedGroup(event.target.value as number);
    }, []);

    const handleChangeMonth = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedMonth(event.target.value as number);
    }, []);

    const handleChangeYear = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedYear(event.target.value as number);
    }, []);

    const handleChangeAccordion = React.useCallback((_event: object, expanded: boolean) => {
        setExpanded(expanded);
    }, []);

    const handleAction = React.useCallback(() => {
        setExpanded(false);

        history.push({
            pathname: location.pathname,
            search: queryString.stringify({
                group: selectedGroup,
                month: selectedMonth,
                year: selectedYear
            })
        });
    }, [history, location, selectedGroup, selectedMonth, selectedYear]);

    React.useEffect(() => {
        // update internal stuff
        setGroups(props.groups);
        setYears(props.years);
        setSelectedGroup(props.group?.id ?? '');
        setSelectedMonth(props.month);
        setSelectedYear(props.year);
    }, [props.groups, props.years, props.group, props.month, props.year]);

    return (
        <>
            <Accordion onChange={handleChangeAccordion} disabled={props.loading} expanded={isExpanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon data-testid="expand-element" />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <LoadingComponent showLoading={props.loading} size={25} type={LoadingType.linear}>
                        {isExpanded && (
                            <Typography variant="h6">
                                <strong>{t('SEARCH.TITLE')}</strong>
                            </Typography>
                        )}
                        {!isExpanded && (
                            <Grid container direction="row" justify="space-around" alignItems="center">
                                <Typography variant="body1" noWrap={true} className={classes.title}>
                                    {selectedGroupName}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography variant="body1">{t('SEARCH.MONTHS.' + selectedMonth)}</Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography variant="body1">{selectedYear}</Typography>
                            </Grid>
                        )}
                    </LoadingComponent>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="group-select">{t('SEARCH.GROUP')}</InputLabel>
                                <NativeSelect
                                    id="group-select"
                                    defaultValue=""
                                    value={selectedGroup}
                                    onChange={handleChangeGroup}
                                >
                                    {groupsMenuItems}
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="month-label">{t('SEARCH.MONTH')}</InputLabel>
                                <NativeSelect
                                    id="month-select"
                                    defaultValue=""
                                    value={selectedMonth}
                                    onChange={handleChangeMonth}
                                >
                                    {monthsMenuItems}
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="year-select">{t('SEARCH.YEAR')}</InputLabel>
                                <NativeSelect
                                    id="year-select"
                                    defaultValue=""
                                    value={selectedYear}
                                    onChange={handleChangeYear}
                                >
                                    {yearsMenuItems}
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button variant="contained" color="primary" startIcon={<SearchIcon />} onClick={handleAction}>
                        {t('SEARCH.BUTTON')}
                    </Button>
                </AccordionActions>
            </Accordion>
        </>
    );
});
