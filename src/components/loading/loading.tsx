import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import { hasValue } from '../../helpers/utilHelper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export enum LoadingType {
    circular,
    linear
}

export type LoadingProps = {
    showLoading: boolean;
    size?: number;
    error?: string;
    info?: string;
    type?: LoadingType;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        linear: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2)
            }
        }
    })
);

export const LoadingComponent: React.FC<React.PropsWithChildren<LoadingProps>> = memo(
    (props: React.PropsWithChildren<LoadingProps>) => {
        const classes = useStyles();
        const [t] = useTranslation();

        if (hasValue(props.error)) {
            return (
                <Grid container justify="center" alignItems="center">
                    <Alert severity="error">
                        <AlertTitle>{t('COMMON.ERROR_TITLE')}</AlertTitle>
                        {props.error}
                    </Alert>
                </Grid>
            );
        }
        if (hasValue(props.info)) {
            return (
                <Grid container justify="center" alignItems="center">
                    <Alert severity="info">
                        <AlertTitle>{t('COMMON.INFO_TITLE')}</AlertTitle>
                        {props.info}
                    </Alert>
                </Grid>
            );
        }
        return props.showLoading ? (
            <Grid container justify="center" alignItems="center">
                {(!hasValue(props.type) || props.type === LoadingType.circular) && (
                    <CircularProgress size={props.size ?? 40} data-testid="loading-element" />
                )}
                {props.type === LoadingType.linear && (
                    <div className={classes.linear}>
                        <LinearProgress data-testid="loading-element" />
                    </div>
                )}
            </Grid>
        ) : (
            <>{props.children}</>
        );
    }
);