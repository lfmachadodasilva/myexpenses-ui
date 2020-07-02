import React, { memo, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { loginWithEmail, createUserWithEmail, resetPassword } from '../../services/authService';
import { Routes } from '../routes';
import { hasValue } from '../../helpers/utilHelper';

export enum LoginPageType {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RESET = 'RESET'
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch'
            }
        }
    })
);

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface LoginProps {
    type: LoginPageType;
}

export const LoginPage: React.FC<LoginProps> = memo((props: LoginProps) => {
    const classes = useStyles();
    const [t] = useTranslation();
    const history = useHistory();

    const [error, setError] = useState<string>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const disableAction = useMemo(
        () => (props.type === LoginPageType.RESET ? !hasValue(email) : !(hasValue(email) && hasValue(password))),
        [email, password, props.type]
    );

    const handleChangeEmail = useCallback((value: any) => {
        setEmail(value.target.value);
    }, []);
    const handleChangePassword = useCallback((value: any) => {
        setPassword(value.target.value);
    }, []);

    const [isLoading, setLoading] = useState<boolean>(false);

    const handleAction = useCallback(async () => {
        setLoading(true);
        setError(undefined);

        let promise: Promise<void>;
        switch (props.type) {
            case LoginPageType.LOGIN:
                promise = loginWithEmail(email, password);
                break;
            case LoginPageType.REGISTER:
                promise = createUserWithEmail(email, password);
                break;
            case LoginPageType.RESET:
                promise = resetPassword(email);
                break;
        }
        promise
            .then(() => {
                setTimeout(() => history.push(Routes.home));
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [email, password, history, props.type]);

    const [title, button] = useMemo(() => {
        return [t(`AUTH.${props.type}.TITLE`), t(`AUTH.${props.type}.BUTTON`)];
    }, [props.type, t]);

    return (
        <>
            <Card>
                <CardHeader title={title} />
                <CardContent>
                    {hasValue(error) && <Alert severity="error">{error}</Alert>}
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid container>
                            <Grid container item xs={12}>
                                <TextField
                                    required
                                    id={`${props.type}-email-required`}
                                    label={t('AUTH.EMAIL')}
                                    disabled={isLoading}
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                            </Grid>
                            {props.type !== LoginPageType.RESET && (
                                <Grid container item xs={12}>
                                    <TextField
                                        required
                                        id={`${props.type}-password-required`}
                                        label={t('AUTH.PASSWORD')}
                                        type="password"
                                        disabled={isLoading}
                                        value={password}
                                        onChange={handleChangePassword}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </CardContent>
                <CardActions>
                    <Button
                        id={`${props.type}-action`}
                        variant="contained"
                        color="primary"
                        size="small"
                        endIcon={isLoading && <CircularProgress size={12} />}
                        disabled={isLoading || disableAction}
                        onClick={handleAction}
                    >
                        {button}
                    </Button>
                </CardActions>
            </Card>
        </>
    );
});
