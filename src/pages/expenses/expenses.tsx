import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LabelIcon from '@material-ui/icons/Label';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TodayIcon from '@material-ui/icons/Today';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

import { globalContext } from '../../contexts/globalContext';
import { SearchComponent } from '../../components/search/search';
import { hasValue } from '../../helpers/utilHelper';
import { userContext } from '../../contexts/userContext';
import { ExpenseFullModel, ExpenseType } from '../../models/expense';
import { AppConfig } from '../../configurations/appConfig';
import { ConfigurationManager } from '../../configurations/configurationManager';
import { ExpenseService } from '../../services/expenseService';
import { ExpensesManagePage } from './expensesManage';
import { LoadingComponent } from '../../components/loading/loading';
import { ItemType, ItemComponent } from '../../components/item/item';
import Chip from '@material-ui/core/Chip';
import { TabPanel } from '../../components/tabPanel/tabPanel';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        '&:last-child': {
            paddingBottom: theme.spacing(2)
        }
    },
    tab: {
        flexGrow: 1
    },
    tabs: {
        flexGrow: 1,
        width: '100%'
    },
    title: {
        margin: theme.spacing(2),
        marginLeft: 0
    },
    list: {
        width: '100%'
    },
    listValues: {
        flexGrow: 1
    },
    separatorTitle: {
        margin: theme.spacing(1)
    }
}));

export type ExpensesProps = {};

export const ExpensesPage: React.FC<ExpensesProps> = React.memo(() => {
    const global = React.useContext(globalContext);
    const { isReady } = React.useContext(userContext);
    const [config] = React.useState<AppConfig>(ConfigurationManager.get());
    const classes = useStyles();
    const [t] = useTranslation();

    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<ExpenseFullModel[]>([]);
    const [reload, setReload] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>('');
    const [info, setInfo] = React.useState<string>('');
    const [expense, setExpense] = React.useState<ExpenseFullModel>();
    const [show, setShow] = React.useState<boolean>(false);
    const [tab, setTab] = React.useState(0);

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    const calculateTotal = React.useCallback(
        (type: ExpenseType) =>
            data
                .filter(expense => expense.type === type)
                .reduce((sum, current) => sum + current.value, 0)
                .toFixed(2),
        [data]
    );

    const calculateSize = React.useCallback(
        (type: ExpenseType) => data.filter(expense => expense.type === type).length,
        [data]
    );

    const [totalLeftValue, totalLeftPerc] = React.useMemo(() => {
        const totalIncoming = +calculateTotal(ExpenseType.Incoming);
        const totalOutcoming = +calculateTotal(ExpenseType.Outcoming);
        const totalLeft = totalIncoming - totalOutcoming;

        return [totalLeft.toFixed(2), ((totalLeft / totalIncoming) * 100).toFixed(0)];
    }, [calculateTotal]);

    const handleEdit = React.useCallback(
        async (id: number | string) => {
            setExpense(data.find(x => x.id === id));
            setShow(true);
            return Promise.resolve();
        },
        [data]
    );

    const handleDelete = React.useCallback(
        async (id: number | string) => {
            return new ExpenseService(config)
                .remove(id as number)
                .then(() => {
                    setReload(!reload);
                })
                .catch(() => setError(t('COMMON.ERROR')));
        },
        [config, reload, t]
    );

    const handleAdd = React.useCallback(() => {
        setExpense(undefined);
        setShow(true);
    }, []);

    const handleAction = React.useCallback(() => {
        setReload(!reload);
        setShow(false);
    }, [reload]);

    const handleClose = React.useCallback(() => {
        setShow(false);
    }, []);

    React.useEffect(() => {
        if (!isReady || global.isLoading || !hasValue(global.group)) {
            // not ready to requet
            return;
        }

        // if (reload) {
        //     setReload(false);
        // } else {
        //     return;
        // }

        setError('');
        setInfo('');
        setLoading(true);
        new ExpenseService(config)
            .getFullAll(global.group?.id as number, global.month, global.year)
            .then(value => {
                setData(value);
                if (value.length === 0) {
                    setInfo(t('COMMON.EMPTY'));
                }
            })
            .catch(() => setError(t('COMMON.ERROR')))
            .finally(() => setLoading(false));
    }, [isReady, config, reload, t, global.isLoading, global.group, global.month, global.year]);

    const listOfExpenses = React.useCallback(
        (type: ExpenseType) => (
            <List className={classes.list}>
                {data
                    .filter(expense => expense.type === type)
                    .map((expense, i) => (
                        <>
                            <ItemComponent
                                key={expense.id}
                                id={expense.id}
                                title={expense.name}
                                type={ItemType.Menu}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            >
                                <Grid container direction="row" justify="space-around" alignItems="center">
                                    <Button startIcon={<TodayIcon />}>
                                        {format(new Date(expense.date), t('COMMON.DATE_FORMAT'))}
                                    </Button>
                                    <Button startIcon={<LabelIcon />}>{expense.label.name}</Button>
                                    <Button startIcon={<AccountBalanceWalletIcon />}>{expense.value.toFixed(2)}</Button>
                                </Grid>
                            </ItemComponent>
                        </>
                    ))}
            </List>
        ),
        [t, data, classes.list, handleEdit, handleDelete]
    );

    return (
        <div key={'ExpensesComponent'}>
            <SearchComponent
                loading={global.isLoading}
                groups={global.groups}
                years={global.years}
                group={global.group}
                month={global.month}
                year={global.year}
            />
            <Divider />
            <Grid container justify="space-between" alignItems="center" className={classes.root} spacing={1}>
                <Typography variant="h5" className={classes.title}>
                    {t('EXPENSES.LIST.TITLE')}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    disabled={isLoading || global.isLoading || !isReady}
                >
                    {t('COMMON.ADD')}
                </Button>
            </Grid>

            <Grid container justify="flex-start" alignItems="center" className={classes.root} spacing={1}>
                <LoadingComponent showLoading={isLoading || !isReady} error={error} info={info}>
                    <div className={classes.tabs}>
                        <Paper className={classes.tab}>
                            <Tabs value={tab} onChange={handleChangeTab} centered variant="fullWidth">
                                <Tab label={t('COMMON.SUMMARY')} />
                                <Tab
                                    label={
                                        <Badge badgeContent={calculateSize(ExpenseType.Incoming)} color="primary">
                                            {t('EXPENSES.INCOMING')}
                                        </Badge>
                                    }
                                />
                                <Tab
                                    label={
                                        <Badge badgeContent={calculateSize(ExpenseType.Outcoming)} color="primary">
                                            {t('EXPENSES.OUTCOMING')}
                                        </Badge>
                                    }
                                />
                            </Tabs>
                        </Paper>
                        <TabPanel value={tab} index={0}>
                            <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Typography variant="body2" className={classes.separatorTitle}>
                                        {t('EXPENSES.LIST.TOTAL_INCOMING')}
                                    </Typography>
                                    <Typography variant="h6" className={classes.separatorTitle}>
                                        {`${calculateTotal(ExpenseType.Incoming)}`}
                                    </Typography>
                                </Grid>
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Typography variant="body2" className={classes.separatorTitle}>
                                        {t('EXPENSES.LIST.TOTAL_OUTCOMING')}
                                    </Typography>
                                    <Typography variant="h6" className={classes.separatorTitle}>
                                        {`${calculateTotal(ExpenseType.Outcoming)}`}
                                    </Typography>
                                </Grid>
                                <Divider />
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Typography variant="body2" className={classes.separatorTitle}>
                                        {t('EXPENSES.LIST.TOTAL_LEFT')}
                                    </Typography>
                                    <Chip
                                        color={+totalLeftValue >= 0 ? 'primary' : 'secondary'}
                                        label={totalLeftValue}
                                        className={classes.separatorTitle}
                                    />
                                    <Chip
                                        color={+totalLeftValue >= 0 ? 'primary' : 'secondary'}
                                        size="small"
                                        label={`${totalLeftPerc}%`}
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            {listOfExpenses(ExpenseType.Incoming)}
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                            {listOfExpenses(ExpenseType.Outcoming)}
                        </TabPanel>
                    </div>
                </LoadingComponent>
            </Grid>
            <ExpensesManagePage expense={expense} show={show} onAction={handleAction} onClose={handleClose} />
        </div>
    );
});
