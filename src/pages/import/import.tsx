import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { format, isValid } from 'date-fns';

import Form from 'react-bootstrap/Form';

import { globalContext } from '../../contexts/global';
import { AlertComponent } from '../../components/alert/alert';
import { ItemsHeaderComponent } from '../../components/itemsHeader/itemsHeader';
import { ExpenseFullModel, ExpenseType } from '../../models/expense';
import { hasValue } from '../../helpers/util';
import { LabelService } from '../../services/label';
import { ExpenseService } from '../../services/expense';
import { ConfigModel } from '../../models/config';
import { ConfigManager } from '../../configurations/configManager';
import { csvToExpenses } from '../../helpers/csvToExpenses';

export type ImportProps = {};

const defaultSeparator = ';';

export const ImportPage: React.FC<ImportProps> = React.memo((props: ImportProps) => {
    const [t] = useTranslation();
    const { groups, group: groupGlobal, labels } = useContext(globalContext);
    const [config] = React.useState<ConfigModel>(ConfigManager.get());

    enum StatusType {
        NOT_PROCESSED = 'to do',
        PROCESSING = 'doing',
        PROCESSED = 'done',
        ERROR = 'error'
    }

    const [isLoading, setLoading] = React.useState(false);
    const [group, setGroup] = React.useState(groupGlobal);
    const [data, setData] = React.useState('');
    const [expenses, setExpenses] = React.useState<ExpenseFullModel[]>([]);
    const [status, setStatus] = React.useState<StatusType[]>([]);
    const [separator, setSeparator] = React.useState<string>(defaultSeparator);
    const [error, setError] = React.useState('');

    const groupsOptions = React.useMemo(
        () =>
            groups.map(x => (
                <option key={'GROUP_' + x.id} value={x.id}>
                    {x.name}
                </option>
            )),
        [groups]
    );

    const disabledAction = React.useMemo(() => {
        if (!hasValue(separator) || isLoading) {
            return true;
        }
        return false;
    }, [separator, isLoading]);

    const handleOnAction = React.useCallback(async () => {
        setLoading(true);
        for (let index = 0; index < expenses.length; index++) {
            const expense = expenses[index];

            status[index] = StatusType.PROCESSING;
            setStatus({ ...status });

            // check if the label already exist
            let label = labels.find(l => l.name.trim().toLowerCase() === expense.label.name.trim().toLowerCase());
            if (!hasValue(label)) {
                try {
                    // create if not
                    label = await new LabelService(config).add({ name: expense.label.name.trim(), groupId: group });
                    labels.push(label);
                } catch {
                    status[index] = StatusType.ERROR;
                    setStatus({ ...status });
                    return;
                }
            }

            try {
                await new ExpenseService(config).add({ ...expense, labelId: label?.id });
            } catch {
                status[index] = StatusType.ERROR;
                setStatus({ ...status });
                return;
            }

            status[index] = StatusType.PROCESSED;
            setStatus({ ...status });
        }
        setLoading(false);
    }, [group, labels, expenses, config, status, StatusType.ERROR, StatusType.PROCESSING, StatusType.PROCESSED]);

    const handleOnChangeGroup = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setGroup(+event.target.value);
    }, []);

    const handleOnChangeSeparator = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSeparator(event.target.value);
    }, []);

    const handleOnChangeData = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value);
    }, []);

    React.useEffect(() => {
        if (!hasValue(separator)) {
            setExpenses([]);
            return;
        }

        try {
            const tmpExpenses = csvToExpenses(group, data, '\n', separator, t('EXPENSE.DATE_FORMAT'));
            setStatus(tmpExpenses.map(_ => StatusType.NOT_PROCESSED));
            setExpenses(tmpExpenses);
        } catch {
            setError('IMPORT.ERROR');
            setExpenses([]);
        }
    }, [separator, data, group, t, StatusType.NOT_PROCESSED]);

    const expensesRows = React.useMemo(() => {
        return expenses.map((expense, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td
                        className={
                            status[index] === StatusType.ERROR
                                ? 'text-danger'
                                : status[index] === StatusType.PROCESSED
                                ? 'text-success'
                                : ''
                        }
                    >
                        {status[index].toString()}
                    </td>
                    <td>{expense.type === ExpenseType.INCOMING ? t('EXPENSE.INCOMING') : t('EXPENSE.OUTCOMING')}</td>
                    <td>{expense.name}</td>
                    <td>{expense.value.toFixed(2)}</td>
                    <td>
                        {isValid(expense.date)
                            ? format(new Date(expense.date), t('IMPORT.TABLE.DATE_FORMAT'))
                            : t('IMPORT.TABLE.INVALID_DATE')}
                    </td>
                    <td>{expense.label.name}</td>
                    <td>{expense.comments}</td>
                </tr>
            );
        });
    }, [expenses, status, t, StatusType.ERROR, StatusType.PROCESSED]);

    return (
        <>
            <ItemsHeaderComponent
                title={t('IMPORT.TITLE')}
                action={t('IMPORT.ACTION')}
                onAction={handleOnAction}
                disableAction={disabledAction}
            />
            <AlertComponent message={error} type="danger" />
            <Form>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <Form.Group>
                            <Form.Label>{t('IMPORT.GROUP')}</Form.Label>
                            <Form.Control
                                as="select"
                                value={group}
                                onChange={handleOnChangeGroup}
                                data-testid="import-group-field"
                            >
                                {groupsOptions}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <Form.Group>
                            <Form.Label>{t('IMPORT.SEPARATOR')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={separator}
                                onChange={handleOnChangeSeparator}
                                data-testid="import-separator-field"
                            />
                        </Form.Group>
                    </div>
                    <div className="col-sm-12">
                        <Form.Group controlId="formImportData">
                            <Form.Label>{t('IMPORT.DATA')}</Form.Label>
                            <Form.Text className="text-muted">{t('IMPORT.DATA_TEXT')}</Form.Text>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                placeholder={t('IMPORT.DATA_PLACEHOLDER')}
                                value={data}
                                onChange={handleOnChangeData}
                                data-testid="import-data-field"
                            />
                        </Form.Group>
                    </div>
                </div>
            </Form>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{t('IMPORT.TABLE.NUMBER')}</th>
                            <th scope="col">{t('IMPORT.TABLE.STATUS')}</th>
                            <th scope="col">{t('IMPORT.TABLE.TYPE')}</th>
                            <th scope="col">{t('IMPORT.TABLE.NAME')}</th>
                            <th scope="col">{t('IMPORT.TABLE.VALUE')}</th>
                            <th scope="col">{t('IMPORT.TABLE.DATE')}</th>
                            <th scope="col">{t('IMPORT.TABLE.LABEL')}</th>
                            <th scope="col">{t('IMPORT.TABLE.COMMENTS')}</th>
                        </tr>
                    </thead>
                    <tbody>{expensesRows}</tbody>
                </table>
            </div>
        </>
    );
});
