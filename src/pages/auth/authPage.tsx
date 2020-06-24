import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { LoginPage, LoginPageType } from './loginPage';
import { FacebookPage } from './facebookPage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        center: {
            textAlign: 'center'
        },
        actionButton: {
            textTransform: 'none'
        }
    })
);

export const AuthPage: React.FC = memo(() => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
                <Grid item xs={12} className={classes.center}>
                    <FacebookPage />
                </Grid>
                {Object.values(LoginPageType).map((value: LoginPageType) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <LoginPage type={value} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
});
