import React, { memo, useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LabelModel } from '../../models/groupModel';
import { AppConfig } from '../../configurations/appConfig';
import { ConfigurationManager } from '../../configurations/configurationManager';
import { LabelService } from '../../services/labelService';
import { hasValue } from '../../helpers/utilHelper';

export const LabelsPage: React.FC = memo(() => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<LabelModel[]>([]);
    const [config] = useState<AppConfig>(ConfigurationManager.get());

    useEffect(() => {
        const setup = async () => {
            try {
                setLoading(true);
                const labels = await new LabelService(config).getAll();
                setData(labels);
            } catch {
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        setup();
    }, [config]);

    return (
        <>
            <Typography variant="h4">List of labels:</Typography>
            {isLoading && <CircularProgress />}
            {!isLoading && <Typography variant="h6">#{data.length}</Typography>}

            <List component="nav" aria-label="secondary mailbox folders">
                {hasValue(data) &&
                    data.map(label => {
                        return (
                            <div key={JSON.stringify(label)}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${label.id} - ${label.name}`}
                                        secondary={`Group: ${label.group.name}`}
                                    />
                                </ListItem>
                            </div>
                        );
                    })}
            </List>
        </>
    );
});
