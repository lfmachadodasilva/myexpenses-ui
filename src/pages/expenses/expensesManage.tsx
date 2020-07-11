import React from 'react';
import { DateType } from '@date-io/type';
import { useTranslation } from 'react-i18next';

import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { ExpenseFullModel, ExpenseType } from '../../models/expense';
import { globalContext } from '../../contexts/globalContext';
import { ConfigurationManager } from '../../configurations/configurationManager';
import { AppConfig } from '../../configurations/appConfig';
import { DialogComponent } from '../../components/dialog/dialog';
import { hasValue } from '../../helpers/utilHelper';
import { ExpenseService } from '../../services/expenseService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: '100%'
        }
    })
);

export type ExpensesManageProps = {
    show: boolean;
    expense?: ExpenseFullModel;
    onAction: () => void;
    onClose: () => void;
};

export const ExpensesManagePage: React.FC<ExpensesManageProps> = React.memo((props: ExpensesManageProps) => {
    const [t] = useTranslation();
    const global = React.useContext(globalContext);
    const classes = useStyles();

    const [config] = React.useState<AppConfig>(ConfigurationManager.get());
    const [title, setTitle] = React.useState<string>('');
    const [button, setButton] = React.useState<string>('');
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState<string>('');
    const [type, setType] = React.useState<ExpenseType>(ExpenseType.Outcoming);
    const [value, setValue] = React.useState<number>();
    const [label, setLabel] = React.useState<string>('');
    const [date, setDate] = React.useState<DateType | null>(new Date());
    const [comments, setComments] = React.useState<string>();

    const labelsMenuItems = React.useMemo(() => {
        if (!hasValue(label) && global.labels.length > 0) {
            const lastLabel = localStorage.getItem('label') as string;
            if (!hasValue(props.expense) && hasValue(lastLabel) && global.labels.some(x => x.id === +lastLabel)) {
                setLabel(global.labels[+lastLabel]?.id.toString());
            } else {
                setLabel(global.labels[0]?.id.toString());
            }
        }
        return global.labels.map(label => (
            <option key={label.id} value={label.id}>
                {label.name}
            </option>
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [global.labels, props.expense]);

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(+(event.target as HTMLInputElement).value as ExpenseType);
    };

    const handleChangeLabel = React.useCallback((event: React.ChangeEvent<{ value: string }>) => {
        setLabel(event.target.value);
        localStorage.setItem('label', event.target.value);
    }, []);

    const handleChangeName = React.useCallback((value: React.ChangeEvent<{ value: string }>) => {
        setName(value.target.value);
    }, []);

    const handleChangeValue = React.useCallback((value: React.ChangeEvent<{ value: string }>) => {
        if (+value.target.value === 0) {
            setValue(undefined);
        } else {
            setValue(+value.target.value);
        }
    }, []);

    const handleChangeDate = (date: DateType | null) => {
        setDate(date);
    };

    const handleChangeComments = React.useCallback((value: React.ChangeEvent<{ value: string }>) => {
        setComments(value.target.value);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        props.onClose();
    }, [props]);

    const handleAction = React.useCallback(async () => {
        if (hasValue(props.expense)) {
            return new ExpenseService(config)
                .update({
                    id: props.expense?.id as number,
                    name: name,
                    type: type,
                    comments: comments as string,
                    date: date as Date,
                    groupId: global.group?.id as number,
                    labelId: +label as number,
                    value: value as number
                })
                .then(() => {
                    props.onAction();
                    handleClose();
                });
        } else {
            return new ExpenseService(config)
                .add({
                    name: name,
                    type: type,
                    comments: comments as string,
                    date: date as Date,
                    groupId: global.group?.id as number,
                    labelId: +label as number,
                    value: value as number
                })
                .then(() => {
                    props.onAction();
                    handleClose();
                });
        }
    }, [props, type, date, label, name, value, comments, config, global.group, handleClose]);

    React.useEffect(() => {
        setOpen(props.show);

        if (!props.show) {
            // does not need to update anything
            return;
        }
        if (hasValue(props.expense)) {
            const e = props.expense as ExpenseFullModel;
            setType(e.type);
            setDate(e.date);
            setName(e.name);
            setValue(e.value);
            setComments(e.comments);

            setTitle(t('EXPENSES.MANAGE.EDIT.TITLE'));
            setButton(t('COMMON.EDIT'));
        } else {
            setType(ExpenseType.Outcoming);
            setDate(new Date());
            setName('');
            setValue(undefined);
            setComments('');

            setTitle(t('EXPENSES.MANAGE.ADD.TITLE'));
            setButton(t('COMMON.ADD'));
        }
    }, [props, config, t]);
    return (
        <>
            <DialogComponent
                show={open}
                title={title}
                actionText={button}
                disableAction={!hasValue(name) || !hasValue(value) || !hasValue(label)}
                onAction={handleAction}
                onClose={handleClose}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel required component="label">
                                {t('EXPENSES.MANAGE.TYPE')}
                            </FormLabel>
                            <RadioGroup aria-label="type" name="type" value={type} onChange={handleChangeType}>
                                <FormControlLabel
                                    value={ExpenseType.Incoming}
                                    control={<Radio size="small" />}
                                    label={t('EXPENSES.INCOMING')}
                                />
                                <FormControlLabel
                                    value={ExpenseType.Outcoming}
                                    control={<Radio size="small" />}
                                    label={t('EXPENSES.OUTCOMING')}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                required
                                autoOk
                                // showTodayButton
                                format="dd/MM/yyyy"
                                label={t('EXPENSES.MANAGE.DATE')}
                                value={date}
                                onChange={handleChangeDate}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name" required>
                                {t('COMMON.NAME')}
                            </InputLabel>
                            <Input required id="name" onChange={handleChangeName} value={name} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="value" required>
                                {t('EXPENSES.MANAGE.VALUE')}
                            </InputLabel>
                            <Input required type="number" id="value" onChange={handleChangeValue} value={value} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="label-select" required>
                                {t('EXPENSES.MANAGE.LABEL')}
                            </InputLabel>
                            <NativeSelect
                                id="label-select"
                                value={label}
                                onChange={handleChangeLabel}
                                disabled={global.isLoading}
                            >
                                {labelsMenuItems}
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="comments">{t('EXPENSES.MANAGE.COMMENTS')}</InputLabel>
                            <Input multiline id="comments" onChange={handleChangeComments} value={comments} />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogComponent>
        </>
    );
});
