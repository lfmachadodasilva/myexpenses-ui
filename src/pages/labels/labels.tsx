import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

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
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ExposureIcon from '@material-ui/icons/Exposure';

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
    badge: {}
}));

export type LabelsProps = {};

export const LabelsPage: React.FC<LabelsProps> = React.memo(() => {
    const { isReady } = React.useContext(userContext);
    const global = React.useContext(globalContext);
    const [config] = React.useState<AppConfig>(ConfigurationManager.get());
    const classes = useStyles();
    const [t] = useTranslation();

    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<LabelFullModel[]>([]);
    const [reload, setReload] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>('');
    const [info, setInfo] = React.useState<string>('');
    const [label, setLabel] = React.useState<LabelFullModel>();
    const [show, setShow] = React.useState<boolean>(false);

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
        setLoading(true);
        new LabelService(config)
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
                    <List className={classes.list}>
                        <ItemComponent key={0} id={0}>
                            <Grid container justify="space-around" alignItems="center" className={classes.gridItem}>
                                <Typography variant="subtitle1">{t('LABELS.LIST.CURRENT_VALUE')}</Typography>
                                <Typography variant="subtitle1">{t('LABELS.LIST.LAST_VALUE')}</Typography>
                                <Typography variant="subtitle1">{t('LABELS.LIST.AVERAGE_VALUE')}</Typography>
                            </Grid>
                        </ItemComponent>
                        {dataElements}
                    </List>
                </LoadingComponent>
            </Grid>
            <LabelsManagePage label={label} show={show} onAction={handleAction} onClose={handleClose} />
        </div>
    );
});
