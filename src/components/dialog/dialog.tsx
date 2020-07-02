import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import { useTheme, WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import { hasValue } from '../../helpers/utilHelper';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            marginTop: 50,
            [theme.breakpoints.up('sm')]: {
                marginTop: 0
            },
            padding: theme.spacing(2)
        },
        closeButton: {
            marginTop: 50,
            [theme.breakpoints.up('sm')]: {
                marginTop: 0
            },
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        }
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

export type DialogProps = {
    show: boolean;
    title: string;
    actionText: string;
    disableAction: boolean;
    onAction: () => Promise<void>;
    onClose: () => void;
};

export const DialogComponent: React.FC<React.PropsWithChildren<DialogProps>> = React.memo(
    (props: React.PropsWithChildren<DialogProps>) => {
        const theme = useTheme();
        const [t] = useTranslation();
        const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
        const [isLoading, setLoading] = React.useState<boolean>(false);
        const [error, setError] = React.useState<string>('');

        const handleClose = React.useCallback(() => {
            props.onClose();
        }, [props]);

        const handleAction = React.useCallback(() => {
            setLoading(true);
            props
                .onAction()
                .catch(() => setError(t('COMMON.ERROR')))
                .finally(() => setLoading(false));
        }, [props, t]);

        React.useEffect(() => {
            setError('');
        }, [props.show]);

        return (
            <>
                <Dialog
                    fullScreen={fullScreen}
                    open={props.show}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title" onClose={handleClose}>
                        {props.title}
                    </DialogTitle>
                    <DialogContent>
                        <>
                            {hasValue(error) && <Alert severity="error">{error}</Alert>}
                            {props.children}
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            autoFocus
                            color="primary"
                            onClick={handleAction}
                            endIcon={isLoading && <CircularProgress size={12} />}
                            startIcon={hasValue(error) && <CloseIcon color="secondary" />}
                            disabled={props.disableAction || isLoading}
                        >
                            {props.actionText}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
);
