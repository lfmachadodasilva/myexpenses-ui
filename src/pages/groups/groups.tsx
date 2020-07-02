import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { userContext } from '../../contexts/userContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { AppConfig } from '../../configurations/appConfig';
import { ConfigurationManager } from '../../configurations/configurationManager';
import { GroupService } from '../../services/groupService';
import { GroupFullModel } from '../../models/group';
import { ItemComponent } from '../../components/item/item';
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
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(1)
    },
    cards: {
        maxWidth: 345
    },
    item: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(1)
    },
    person: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(2)
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

    const handleEdit = React.useCallback(
        async (id: number) => {
            setGroup(data.find(x => x.id === id));
            setShow(true);
            return Promise.resolve();
        },
        [data]
    );

    const handleDelete = React.useCallback(
        async (id: number) => {
            return new GroupService(config).remove(id).then(() => {
                setReload(true);
            });
        },
        [config]
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

        setLoading(true);
        new GroupService(config)
            .getFullAll()
            .then(value => {
                setData(value);
            })
            .catch(() => setError(t('COMMON.ERROR')))
            .finally(() => {
                setLoading(false);
            });
    }, [config, isReady, reload, t]);

    return (
        <>
            <Grid container justify="space-between" alignItems="center" className={classes.root} spacing={1}>
                <Typography variant="h5" className={classes.title}>
                    {t('GROUPS.LIST.TITLE')}
                </Typography>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
                    {t('COMMON.ADD')}
                </Button>
            </Grid>
            <Grid container justify="flex-start" alignItems="center" className={classes.root} spacing={1}>
                <LoadingComponent showLoading={isLoading || !isReady} error={error}>
                    {data.map(group => (
                        <ItemComponent
                            key={group.id}
                            id={group.id}
                            title={group.name}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        >
                            <Grid container justify="flex-start" alignItems="center">
                                {group.users.map(u => (
                                    <AvatarChipComponent key={`groups-page-${u.id}`} user={u} />
                                ))}
                            </Grid>
                        </ItemComponent>
                    ))}
                </LoadingComponent>
            </Grid>
            <GroupsManageDialog group={group} show={show} onAction={handleAction} onClose={handleClose} />
        </>
    );
});
