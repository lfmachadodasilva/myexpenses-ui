import React, { memo, useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { hasValue } from '../../helpers/utilHelper';
import { LoadingComponent } from '../loading/loading';

const useStyles = makeStyles(theme => ({
    cards: {
        // maxWidth: 250,
        // margin: 5,
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

export interface ItemProps {
    id: number;
    title: string;
    onEdit?: (id: number) => Promise<void>;
    onDelete?: (id: number) => Promise<void>;
}

export const ItemComponent: React.FC<React.PropsWithChildren<ItemProps>> = memo(
    (props: React.PropsWithChildren<ItemProps>) => {
        const classes = useStyles();
        const [isLoadingEdit, setLoadingEdit] = useState<boolean>(false);
        const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);

        const handleEdit = useCallback(() => {
            setLoadingEdit(true);
            if (hasValue(props.onEdit)) {
                const action = props.onEdit as (id: number) => Promise<void>;
                action(props.id)
                    .then(() => {})
                    .finally(() => setLoadingEdit(false));
            }
        }, [props]);

        const handleDelete = useCallback(() => {
            setLoadingDelete(true);
            if (hasValue(props.onDelete)) {
                const action = props.onDelete as (id: number) => Promise<void>;
                action(props.id)
                    .then(() => {})
                    .finally(() => setLoadingDelete(false));
            }
        }, [props]);

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.cards}>
                    <Box display="flex" className={classes.header}>
                        <Box width="100%">
                            <Typography variant="body2" noWrap={false}>
                                <strong>{props.title}</strong>
                            </Typography>
                        </Box>
                        <Box flexShrink={1}>
                            {hasValue(props.onEdit) && (
                                <IconButton size="small" onClick={handleEdit} disabled={isLoadingDelete}>
                                    <LoadingComponent showLoading={isLoadingEdit} size={17}>
                                        <EditIcon fontSize="inherit" data-testid="edit-element" />
                                    </LoadingComponent>
                                </IconButton>
                            )}
                        </Box>
                        <Box flexShrink={1}>
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
                        </Box>
                    </Box>
                    <CardContent className={classes.content}>{props.children}</CardContent>
                </Card>
            </Grid>
        );
    }
);
