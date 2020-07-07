import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { hasValue } from '../../helpers/utilHelper';
import { LoadingComponent } from '../loading/loading';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(theme => ({
    cards: {
        flex: 1
    },
    header: {
        padding: theme.spacing(2),
        paddingBottom: 0
    },
    content: {
        padding: theme.spacing(2),
        '&:last-child': {
            paddingBottom: theme.spacing(2)
        }
    },
    deleteButton: {
        marginLeft: theme.spacing(3)
    },
    menu: {
        padding: 0
    },
    moreButton: {
        padding: 0
    },
    menuButton: {
        padding: 0
    }
}));

export enum ItemType {
    Row,
    Column,
    Menu
}

export type ItemProps = {
    id: number | string;
    type: ItemType;
    title?: string;
    onEdit?: (id: number | string) => Promise<void>;
    onDelete?: (id: number | string) => Promise<void>;
};

export const ItemComponent: React.FC<React.PropsWithChildren<ItemProps>> = React.memo(
    (props: React.PropsWithChildren<ItemProps>) => {
        const classes = useStyles();
        const [isLoadingEdit, setLoadingEdit] = React.useState<boolean>(false);
        const [isLoadingDelete, setLoadingDelete] = React.useState<boolean>(false);

        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleEdit = React.useCallback(() => {
            handleClose();
            setLoadingEdit(true);
            if (hasValue(props.onEdit)) {
                const action = props.onEdit as (id: number | string) => Promise<void>;
                action(props.id)
                    .then(() => {})
                    .finally(() => setLoadingEdit(false));
            }
        }, [props]);

        const handleDelete = React.useCallback(() => {
            handleClose();
            setLoadingDelete(true);
            if (hasValue(props.onDelete)) {
                const action = props.onDelete as (id: number | string) => Promise<void>;
                action(props.id)
                    .then(() => {})
                    .finally(() => setLoadingDelete(false));
            }
        }, [props]);

        return (
            <>
                <ListItem divider disableGutters>
                    <ListItemText key={props.id} primary={props.title} secondary={props.children} />
                    <ListItemSecondaryAction>
                        {props.type === ItemType.Menu && (
                            <>
                                <IconButton onClick={handleClick} disableRipple className={classes.moreButton}>
                                    <MoreVertIcon fontSize="inherit" className={classes.moreButton} />
                                </IconButton>
                                <Menu
                                    id={'simple-menu-' + props.id}
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleEdit}>
                                        <ListItemIcon>
                                            <EditIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Edit" />
                                    </MenuItem>
                                    <MenuItem onClick={handleDelete}>
                                        <ListItemIcon>
                                            <DeleteIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Delete" />
                                    </MenuItem>
                                </Menu>
                            </>
                        )}

                        {props.type !== ItemType.Menu && (
                            <Grid
                                container
                                direction={props.type === ItemType.Row ? 'row' : 'column'}
                                justify="center"
                                spacing={2}
                            >
                                <Grid item>
                                    {hasValue(props.onEdit) && (
                                        <IconButton size="small" onClick={handleEdit} disabled={isLoadingDelete}>
                                            <LoadingComponent showLoading={isLoadingEdit} size={17}>
                                                <EditIcon fontSize="inherit" data-testid="edit-element" />
                                            </LoadingComponent>
                                        </IconButton>
                                    )}
                                </Grid>
                                <Grid item>
                                    {hasValue(props.onDelete) && (
                                        <IconButton size="small" onClick={handleDelete} disabled={isLoadingEdit}>
                                            <LoadingComponent showLoading={isLoadingDelete} size={17}>
                                                <DeleteIcon fontSize="inherit" data-testid="delete-element" />
                                            </LoadingComponent>
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </>
        );
    }
);
