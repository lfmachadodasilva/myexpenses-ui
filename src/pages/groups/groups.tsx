import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { userContext } from '../../contexts/userContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { AppConfig } from '../../configurations/appConfig';
import { ConfigurationManager } from '../../configurations/configurationManager';
import { GroupService } from '../../services/groupService';
import { GroupFullModel } from '../../models/group';
import { ItemComponent, ItemType } from '../../components/item/item';
import { LoadingComponent } from '../../components/loading/loading';
import { GroupsManageDialog } from './groupsManage';
import { AvatarChipComponent } from '../../components/avatar/avatar';

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
    }
}));

export type GroupsProps = {};

export const GroupsPage: React.FC<GroupsProps> = React.memo(() => {
    const { isReady } = React.useContext(userContext);

    const classes = useStyles();
    const [t] = useTranslation();
    const [config] = React.useState<AppConfig>(ConfigurationManager.get());
    const [data, setData] = React.useState<GroupFullModel[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [show, setShow] = React.useState<boolean>(false);
    const [group, setGroup] = React.useState<GroupFullModel>();
    const [reload, setReload] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>('');
    const [info, setInfo] = React.useState<string>('');

    const handleEdit = React.useCallback(
        async (id: number | string) => {
            setGroup(data.find(x => x.id === id));
            setShow(true);
            return Promise.resolve();
        },
        [data]
    );

    const handleDelete = React.useCallback(
        async (id: number | string) => {
            return new GroupService(config)
                .remove(id as number)
                .then(() => {
                    setReload(true);
                })
                .catch(() => setError(t('COMMON.ERROR')));
        },
        [config, t]
    );

    const handleAdd = React.useCallback(() => {
        setGroup(undefined);
        setShow(true);
    }, []);

    const handleAction = React.useCallback(() => {
        setReload(true);
        setShow(false);
    }, []);

    const handleClose = React.useCallback(() => {
        setShow(false);
    }, []);

    React.useEffect(() => {
        if (!isReady) {
            // not ready to requet
            return;
        }

        if (reload) {
            setReload(false);
        } else {
            return;
        }

        setError('');
        setInfo('');
        setLoading(true);
        new GroupService(config)
            .getFullAll()
            .then(value => {
                setData(value);
                if (value.length === 0) {
                    setInfo(t('COMMON.EMPTY'));
                }
            })
            .catch(() => setError(t('COMMON.ERROR')))
            .finally(() => {
                setLoading(false);
            });
    }, [config, isReady, reload, t]);

    return (
        <div key={'GroupComponent'}>
            <Grid container justify="space-between" alignItems="center" className={classes.root} spacing={1}>
                <Typography variant="h5" className={classes.title}>
                    {t('GROUPS.LIST.TITLE')}
                </Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
                    {t('COMMON.ADD')}
                </Button>
            </Grid>
            <Grid container justify="flex-start" alignItems="center" className={classes.root} spacing={1}>
                <LoadingComponent showLoading={isLoading || !isReady} error={error} info={info}>
                    <List className={classes.list}>
                        {data.map(group => (
                            <>
                                <ItemComponent
                                    key={group.id}
                                    id={group.id}
                                    title={group.name}
                                    type={ItemType.Menu}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                >
                                    <Grid container justify="flex-start" alignItems="center">
                                        {group.users.map(u => (
                                            <AvatarChipComponent key={`groups-page-${u.id}`} user={u} />
                                        ))}
                                    </Grid>
                                </ItemComponent>
                                <Divider />
                            </>
                        ))}
                    </List>
                </LoadingComponent>
            </Grid>
            <GroupsManageDialog group={group} show={show} onAction={handleAction} onClose={handleClose} />
        </div>
    );
});
