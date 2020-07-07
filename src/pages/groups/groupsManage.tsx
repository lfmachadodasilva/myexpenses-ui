import React from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import { DialogComponent } from '../../components/dialog/dialog';
import { LoadingComponent } from '../../components/loading/loading';
import { GroupFullModel } from '../../models/group';
import { hasValue } from '../../helpers/utilHelper';
import { UserModel } from '../../models/user';
import { UserService } from '../../services/userService';
import { AppConfig } from '../../configurations/appConfig';
import { ConfigurationManager } from '../../configurations/configurationManager';
import { AvatarChipComponent, AvatarMenuComponent } from '../../components/avatar/avatar';
import { userContext } from '../../contexts/userContext';
import { GroupService } from '../../services/groupService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        chip: {
            margin: 2
        },
        noLabel: {
            marginTop: theme.spacing(3)
        }
    })
);

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

export type GroupsManageProps = {
    show: boolean;
    group?: GroupFullModel;
    onAction: () => void;
    onClose: () => void;
};

export const GroupsManageDialog: React.FC<GroupsManageProps> = React.memo((props: GroupsManageProps) => {
    const { user } = React.useContext(userContext);
    const classes = useStyles();
    const [t] = useTranslation();

    const [config] = React.useState<AppConfig>(ConfigurationManager.get());
    const [title, setTitle] = React.useState<string>('');
    const [button, setButton] = React.useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState<string>('');
    const [selectedUsers, setSelectedUsers] = React.useState<UserModel[]>([]);
    const [isLoadingUsers, setLoadingUsers] = React.useState<boolean>(false);
    const [users, setUsers] = React.useState<UserModel[]>([]);
    const [errorUsers, setErrorUsers] = React.useState<string>('');
    const selectedUsersId = React.useMemo(() => selectedUsers.map(x => x.id), [selectedUsers]);

    const handleChangeName = React.useCallback((value: React.ChangeEvent<{ value: string }>) => {
        setName(value.target.value);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        props.onClose();
    }, [props]);

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<{ value: unknown }>) => {
            const usersId = event.target.value as string[];
            const us = usersId.map(userId => users.find(u => u.id === userId));
            setSelectedUsers(us as UserModel[]);
        },
        [users]
    );

    const handleAction = React.useCallback(async () => {
        if (hasValue(props.group)) {
            return new GroupService(config)
                .update({
                    id: props.group?.id as number,
                    name: name,
                    users: selectedUsers
                })
                .then(() => {
                    props.onAction();
                    handleClose();
                });
        } else {
            return new GroupService(config)
                .add({
                    id: 0,
                    name: name,
                    users: selectedUsers
                })
                .then(() => {
                    props.onAction();
                    handleClose();
                });
        }
    }, [props, name, selectedUsers, config, handleClose]);

    const usersElement = React.useMemo(
        () =>
            users.map(u => (
                <MenuItem key={`menu-${u.id}`} value={u.id} disabled={u.id === user?.uid}>
                    <AvatarMenuComponent user={u} />
                </MenuItem>
            )),
        [user, users]
    );

    const renderValues = React.useCallback(
        (selected: string[]) => (
            <div className={classes.chips}>
                {selected.map(userId => (
                    <AvatarChipComponent
                        key={`multiple-${userId}`}
                        user={users.find(u => u.id === userId) as UserModel}
                    />
                ))}
            </div>
        ),
        [users, classes.chips]
    );

    React.useEffect(() => {
        setOpen(props.show);

        if (!props.show) {
            // does not need to update anything
            return;
        }

        if (props.show && users.length === 0) {
            setLoadingUsers(true);
            new UserService(config)
                .getAll()
                .then(value => setUsers(value))
                .catch(() => setErrorUsers(t('COMMON.ERROR')))
                .finally(() => setLoadingUsers(false));
        }

        if (hasValue(props.group)) {
            const g = props.group as GroupFullModel;
            setName(g.name);
            setSelectedUsers(g.users);

            setTitle(t('GROUPS.MANAGE.EDIT.TITLE'));
            setButton(t('COMMON.EDIT'));
        } else {
            setName('');
            if (hasValue(users)) {
                setSelectedUsers([users.find(x => x.id === user?.uid)] as UserModel[]);
            }

            setTitle(t('GROUPS.MANAGE.ADD.TITLE'));
            setButton(t('COMMON.ADD'));
        }
    }, [props, config, users, user, t]);

    return (
        <>
            <DialogComponent
                show={open}
                title={title}
                actionText={button}
                disableAction={!hasValue(name) || !hasValue(selectedUsers) || isLoadingUsers}
                onAction={handleAction}
                onClose={handleClose}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">{t('COMMON.NAME')}</InputLabel>
                            <Input required id="name" onChange={handleChangeName} value={name} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="mutiple-users-label">{t('COMMON.MODEL.GROUP.USERS')}</InputLabel>
                            <LoadingComponent showLoading={isLoadingUsers} error={errorUsers}>
                                <Select
                                    labelId="mutiple-users-label"
                                    id="users-mutiple-chip"
                                    multiple
                                    value={selectedUsersId}
                                    onChange={handleChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={selected => renderValues(selected as string[])}
                                    MenuProps={MenuProps}
                                >
                                    {usersElement}
                                </Select>
                            </LoadingComponent>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogComponent>
        </>
    );
});
