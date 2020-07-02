import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { hasValue } from '../../helpers/utilHelper';
import { LoadingComponent } from '../loading/loading';

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
    }
}));

export type ItemProps = {
    id: number | string;
    title: string;
    onEdit?: (id: number | string) => Promise<void>;
    onDelete?: (id: number | string) => Promise<void>;
};

export const ItemComponent: React.FC<React.PropsWithChildren<ItemProps>> = React.memo(
    (props: React.PropsWithChildren<ItemProps>) => {
        const classes = useStyles();
        const [isLoadingEdit, setLoadingEdit] = React.useState<boolean>(false);
        const [isLoadingDelete, setLoadingDelete] = React.useState<boolean>(false);

        const handleEdit = React.useCallback(() => {
            setLoadingEdit(true);
            if (hasValue(props.onEdit)) {
                const action = props.onEdit as (id: number | string) => Promise<void>;
                action(props.id)
                    .then(() => {})
                    .finally(() => setLoadingEdit(false));
            }
        }, [props]);

        const handleDelete = React.useCallback(() => {
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
                <ListItem>
                    <ListItemText key={props.id} primary={props.title} secondary={props.children} />
                    <ListItemSecondaryAction>
                        <>
                            {hasValue(props.onEdit) && (
                                <IconButton size="small" onClick={handleEdit} disabled={isLoadingDelete}>
                                    <LoadingComponent showLoading={isLoadingEdit} size={17}>
                                        <EditIcon fontSize="inherit" data-testid="edit-element" />
                                    </LoadingComponent>
                                </IconButton>
                            )}
                            {hasValue(props.onDelete) && (
                                <IconButton
                                    size="small"
                                    onClick={handleDelete}
                                    disabled={isLoadingEdit}
                                    className={classes.deleteButton}
                                >
                                    <LoadingComponent showLoading={isLoadingDelete} size={17}>
                                        <DeleteIcon fontSize="inherit" data-testid="delete-element" />
                                    </LoadingComponent>
                                </IconButton>
                            )}
                        </>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </>
        );
    }
);
