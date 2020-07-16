import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FacebookIcon from '@material-ui/icons/Facebook';
import Badge from '@material-ui/core/Badge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { userContext } from '../../contexts/userContext';
import { LoadingComponent } from '../../components/loading/loading';
import { updateUser } from '../../services/authService';
import { hasValue } from '../../helpers/utilHelper';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    avatar: {
        width: 100,
        height: 100
    }
}));

export type SettingsProps = {};

export const SettingsPage: React.FC<SettingsProps> = React.memo(() => {
    const classes = useStyles();
    const [t] = useTranslation();
    const user = React.useContext(userContext);

    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [displayName, setDisplayName] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');

    const handleChangeDisplayName = React.useCallback((value: React.ChangeEvent<{ value: string }>) => {
        setDisplayName(value.target.value);
    }, []);

    const handleUpdate = React.useCallback(() => {
        setLoading(true);
        setError('');
        updateUser(user.user, displayName)
            .catch(() => setError(t('COMMON.ERROR')))
            .finally(() => setLoading(false));
    }, [displayName, user.user, t]);

    const handleDarkTheme = React.useCallback(() => {
        console.log(user.isDarkTheme, !user.isDarkTheme);
        user.setDarkTheme(!user.isDarkTheme);
    }, [user]);

    React.useEffect(() => {
        setDisplayName(user.user?.displayName ?? '');
    }, [user.user]);

    return (
        <>
            <LoadingComponent showLoading={user.initialising || !user.isReady} error={error}>
                <Grid container justify="center" alignItems="center" className={classes.root}>
                    <Badge
                        badgeContent={<FacebookIcon />}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                    >
                        <Avatar
                            alt={user.user?.displayName as string}
                            src={(user.user?.photoURL as string) + '?type=large'}
                            className={classes.avatar}
                        >
                            {(user.user?.displayName as string)[0]}
                        </Avatar>
                    </Badge>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="email">{t('SETTINGS.EMAIL')}</InputLabel>
                        <Input required id="email" value={user.user?.email} disabled />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="displayName" required>
                            {t('SETTINGS.DISPLAY_NAME')}
                        </InputLabel>
                        <Input required id="displayName" onChange={handleChangeDisplayName} value={displayName} />
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch checked={user.isDarkTheme} onChange={handleDarkTheme} name="switch-dark-theme" />
                        }
                        label={t('SETTINGS.DARK_THEME')}
                    />
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            // size="small"
                            endIcon={isLoading && <CircularProgress size={12} />}
                            disabled={isLoading || !hasValue(displayName)}
                            onClick={handleUpdate}
                        >
                            {t('SETTINGS.BUTTON')}
                        </Button>
                    </Grid>
                </Grid>
            </LoadingComponent>
        </>
    );
});
