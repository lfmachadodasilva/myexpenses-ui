import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ExposureIcon from '@material-ui/icons/Exposure';
import Badge from '@material-ui/core/Badge';

import { SearchComponent } from '../../components/search/search';
import { globalContext } from '../../contexts/globalContext';
import { LabelService } from '../../services/labelService';
import { AppConfig } from '../../configurations/appConfig';
import { ConfigurationManager } from '../../configurations/configurationManager';
import { LabelFullModel } from '../../models/label';
import { LoadingComponent } from '../../components/loading/loading';
import { ItemComponent, ItemType } from '../../components/item/item';
import { userContext } from '../../contexts/userContext';
import { LabelsManagePage } from './labelsManage';
import { hasValue } from '../../helpers/utilHelper';
import { TabPanel } from '../../components/tabPanel/tabPanel';

enum LabelValueType {
    CURRENT_VALUE = 0,
    LAST_VALUE,
    AVERAGE_VALUE
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        '&:last-child': {
            paddingBottom: theme.spacing(2)
        }
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
    gridItem: {
        marginTop: theme.spacing(2)
    },
    badge: {},
    tab: {
        flexGrow: 1
    },
    tabs: {
        flexGrow: 1,
        width: '100%'
    },
    graphButtons: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export type LabelsProps = {};

export const LabelsPage: React.FC<LabelsProps> = React.memo(() => {
    const { isReady } = React.useContext(userContext);
    const global = React.useContext(globalContext);
    const [config] = React.useState<AppConfig>(ConfigurationManager.get());
    const classes = useStyles();
    const [t] = useTranslation();
    const options = {
        plugins: {
            colorschemes: {
                scheme: 'office.Excel16'
            }
        }
    };

    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<LabelFullModel[]>([]);
    const [dataSize, setDataSize] = React.useState<number>();
    const [reload, setReload] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>('');
    const [info, setInfo] = React.useState<string>('');
    const [label, setLabel] = React.useState<LabelFullModel>();
    const [show, setShow] = React.useState<boolean>(false);
    const [tab, setTab] = React.useState(0);
    const [graphType, setGraphType] = React.useState<LabelValueType>(LabelValueType.CURRENT_VALUE);

    const handleChangeGraphType = (event: React.MouseEvent<HTMLElement>, type: string) => {
        setGraphType(+type);
    };

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    const handleEdit = React.useCallback(
        async (id: number | string) => {
            setLabel(data.find(x => x.id === id));
            setShow(true);
            return Promise.resolve();
        },
        [data]
    );

    const handleDelete = React.useCallback(
        async (id: number | string) => {
            return new LabelService(config)
                .remove(id as number)
                .then(() => {
                    setReload(!reload);
                })
                .catch(() => setError(t('COMMON.ERROR')));
        },
        [config, reload, t]
    );

    const handleAdd = React.useCallback(() => {
        setLabel(undefined);
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
        setDataSize(undefined);
        setLoading(true);
        new LabelService(config)
            .getFullAll(global.group?.id as number, global.month, global.year)
            .then(value => {
                setData(value);
                setDataSize(value.length);
                if (value.length === 0) {
                    setInfo(t('COMMON.EMPTY'));
                }
            })
            .catch(() => setError(t('COMMON.ERROR')))
            .finally(() => setLoading(false));
    }, [isReady, config, reload, t, global.isLoading, global.group, global.month, global.year]);

    const dataElements = React.useMemo(
        () =>
            data.map(label => (
                <>
                    <ItemComponent
                        key={label.id}
                        id={label.id}
                        title={label.name}
                        type={ItemType.Menu}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    >
                        <Grid container justify="space-around" alignItems="center" className={classes.gridItem}>
                            <Tooltip title="Current value">
                                <Chip
                                    icon={<PlayArrowIcon />}
                                    size="small"
                                    label={label.currValue.toFixed(2)}
                                    clickable
                                    color={
                                        label.currValue >= label.lastValue || label.currValue >= label.avgValue
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                />
                            </Tooltip>
                            <Tooltip title="Last value" aria-label="add">
                                <Chip
                                    icon={<SkipPreviousIcon />}
                                    size="small"
                                    label={label.lastValue.toFixed(2)}
                                    clickable
                                    color={label.lastValue >= label.avgValue ? 'primary' : 'secondary'}
                                />
                            </Tooltip>
                            <Tooltip title="Average value" aria-label="add">
                                <Chip
                                    icon={<ExposureIcon />}
                                    size="small"
                                    label={label.avgValue.toFixed(2)}
                                    clickable
                                    color="primary"
                                />
                            </Tooltip>
                        </Grid>
                    </ItemComponent>
                </>
            )),
        [data, classes.gridItem, handleEdit, handleDelete]
    );

    const dataChart = React.useMemo(() => {
        if (data.length === 0) {
            return {
                labels: ['Empty'],
                datasets: [
                    {
                        data: [1],
                        borderWidth: 0
                    }
                ]
            };
        }

        return {
            labels: data.map(x => x.name),
            datasets: [
                {
                    data: data.map(x =>
                        graphType === LabelValueType.CURRENT_VALUE
                            ? x.currValue
                            : graphType === LabelValueType.LAST_VALUE
                            ? x.lastValue
                            : x.avgValue
                    ),
                    borderWidth: 0
                }
            ]
        };
    }, [data, graphType]);

    return (
        <div key={'LabelComponent'}>
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
                    {t('LABELS.LIST.TITLE')}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    disabled={isLoading || !isReady || global.isLoading}
                >
                    {t('COMMON.ADD')}
                </Button>
            </Grid>
            <Grid container justify="flex-start" alignItems="center" className={classes.root} spacing={1}>
                <LoadingComponent showLoading={isLoading || !isReady} error={error} info={info}>
                    <div className={classes.tabs}>
                        <Paper className={classes.tab}>
                            <Tabs value={tab} onChange={handleChangeTab} centered variant="fullWidth">
                                <Tab
                                    label={
                                        <Badge badgeContent={dataSize} color="primary">
                                            {t('LABELS.LIST.ITEMS_TAB')}
                                        </Badge>
                                    }
                                />
                                <Tab label={t('LABELS.LIST.GRAPH_TAB')} />
                            </Tabs>
                        </Paper>
                        <TabPanel value={tab} index={0}>
                            <List className={classes.list}>
                                <ItemComponent key={0} id={0}>
                                    <Grid
                                        container
                                        justify="space-around"
                                        alignItems="center"
                                        className={classes.gridItem}
                                    >
                                        <Typography variant="subtitle1">{t('LABELS.LIST.CURRENT_VALUE')}</Typography>
                                        <Typography variant="subtitle1">{t('LABELS.LIST.LAST_VALUE')}</Typography>
                                        <Typography variant="subtitle1">{t('LABELS.LIST.AVERAGE_VALUE')}</Typography>
                                    </Grid>
                                </ItemComponent>
                                {dataElements}
                            </List>
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <ToggleButtonGroup
                                    size="small"
                                    value={graphType}
                                    exclusive
                                    onChange={handleChangeGraphType}
                                    className={classes.graphButtons}
                                >
                                    <ToggleButton value={LabelValueType.CURRENT_VALUE}>
                                        <PlayArrowIcon /> {t('LABELS.LIST.CURRENT_VALUE')}
                                    </ToggleButton>
                                    <ToggleButton value={LabelValueType.LAST_VALUE}>
                                        <SkipPreviousIcon /> {t('LABELS.LIST.LAST_VALUE')}
                                    </ToggleButton>
                                    <ToggleButton value={LabelValueType.AVERAGE_VALUE}>
                                        <ExposureIcon /> {t('LABELS.LIST.AVERAGE_VALUE')}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <Grid item xs={12} sm={8} md={6}>
                                    <Pie data={dataChart} options={options} width={200} height={200} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </div>
                </LoadingComponent>
            </Grid>
            <LabelsManagePage label={label} show={show} onAction={handleAction} onClose={handleClose} />
        </div>
    );
});
