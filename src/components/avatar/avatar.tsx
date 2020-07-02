import React, { memo, useContext } from 'react';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import { UserModel } from '../../models/user';
import { hasValue } from '../../helpers/utilHelper';
import { userContext } from '../../contexts/userContext';
import { useTranslation } from 'react-i18next';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const getDisplayName = (user: UserModel, currentUserId: string = '', youText: string = '') => {
    if (user.id === currentUserId) {
        return youText;
    }
    if (hasValue(user.displayName)) {
        return user.displayName.split(' ')[0];
    }
    return user.email.split('@')[0];
};

const useStyles = makeStyles(() => ({
    chip: {
        margin: 2
    }
}));

export type AvatarChipProps = {
    user: UserModel;
};

export const AvatarChipComponent: React.FC<AvatarChipProps> = memo((props: AvatarChipProps) => {
    const classes = useStyles();
    const { user } = useContext(userContext);
    const [t] = useTranslation();

    return (
        <Chip
            label={getDisplayName(props.user, user?.uid, t('COMMON.YOU'))}
            className={classes.chip}
            avatar={
                <Avatar alt={props.user.email} src={props.user.photoUrl}>
                    {getDisplayName(props.user)[0]}
                </Avatar>
            }
        />
    );
});

export interface AvatarMenuProps {
    user: UserModel;
}

export const AvatarMenuComponent: React.FC<AvatarMenuProps> = memo((props: AvatarMenuProps) => {
    const { user } = useContext(userContext);
    const [t] = useTranslation();

    return (
        <>
            <ListItemIcon>
                <Avatar alt={props.user.email} src={props.user.photoUrl}>
                    {getDisplayName(props.user)[0]}
                </Avatar>
            </ListItemIcon>
            <ListItemText
                primary={getDisplayName(props.user, user?.uid, t('COMMON.YOU'))}
                secondary={props.user.email}
            />
        </>
    );
});
