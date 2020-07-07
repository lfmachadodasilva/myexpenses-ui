import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigurationManager } from '../../configurations/configurationManager';
import { AppConfig } from '../../configurations/appConfig';
import { LabelFullModel } from '../../models/label';
import { DialogComponent } from '../../components/dialog/dialog';
import { hasValue } from '../../helpers/utilHelper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { LabelService } from '../../services/labelService';
import { globalContext } from '../../contexts/globalContext';

export type LabelsManageProps = {
    show: boolean;
    label?: LabelFullModel;
    onAction: () => void;
    onClose: () => void;
};

export const LabelsManagePage: React.FC<LabelsManageProps> = React.memo((props: LabelsManageProps) => {
    const [t] = useTranslation();
    const global = React.useContext(globalContext);

    const [config] = React.useState<AppConfig>(ConfigurationManager.get());
    const [title, setTitle] = React.useState<string>('');
    const [button, setButton] = React.useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState<string>('');

    const handleChangeName = React.useCallback((value: React.ChangeEvent<{ value: string }>) => {
        setName(value.target.value);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        props.onClose();
    }, [props]);

    const handleAction = React.useCallback(async () => {
        if (hasValue(props.label)) {
            return new LabelService(config)
                .update({
                    id: props.label?.id as number,
                    name: name
                })
                .then(() => {
                    props.onAction();
                    handleClose();
                });
        } else {
            return new LabelService(config)
                .add(global.group?.id as number, {
                    id: 0,
                    name: name
                })
                .then(() => {
                    props.onAction();
                    handleClose();
                });
        }
    }, [props, name, config, global.group, handleClose]);

    React.useEffect(() => {
        setOpen(props.show);

        if (!props.show) {
            // does not need to update anything
            return;
        }
        if (hasValue(props.label)) {
            const g = props.label as LabelFullModel;
            setName(g.name);

            setTitle(t('LABELS.MANAGE.EDIT.TITLE'));
            setButton(t('COMMON.EDIT'));
        } else {
            setName('');

            setTitle(t('LABELS.MANAGE.ADD.TITLE'));
            setButton(t('COMMON.ADD'));
        }
    }, [props, config, t]);

    return (
        <>
            <DialogComponent
                show={open}
                title={title}
                actionText={button}
                disableAction={!hasValue(name)}
                onAction={handleAction}
                onClose={handleClose}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">{t('COMMON.NAME')}</InputLabel>
                            <Input required id="name" onChange={handleChangeName} value={name} />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogComponent>
        </>
    );
});
