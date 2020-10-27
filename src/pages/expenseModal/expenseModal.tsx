import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ConfigManager } from '../../configurations/configManager';
import { globalContext } from '../../contexts/global';
import { hasValue } from '../../helpers/util';
import { ConfigModel } from '../../models/config';
import { ExpenseFullModel } from '../../models/expense';
import { ExpenseService } from '../../services/expense';
import { LabelModel } from '../../models/label';
import { LabelService } from '../../services/label';
import { LoadingComponent } from '../../components/loading/loading';
import { ErrorComponent } from '../../components/error/error';

export type ExpenseModalProps = {
    show: boolean;
    expense?: ExpenseFullModel;
    onHide: () => void;
    onAction: () => void;
};

export const ExpenseModalPage: React.FC<ExpenseModalProps> = React.memo((props: ExpenseModalProps) => {
    const [t] = useTranslation();

    const { group } = useContext(globalContext);

    const [error, setError] = React.useState('');
    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const [name, setName] = React.useState<string>('');
    const [value, setValue] = React.useState<number>();
    const [date, setDate] = React.useState<Date>(new Date());
    const [label, setLabel] = React.useState<number>();
    const [labels, setLabels] = React.useState<LabelModel[]>([]);
    const [isLoadingLabels, setLoadingLabels] = React.useState<boolean>(false);
    const [comments, setComments] = React.useState<string>('');
    const [isLoadingAction, setLoadingAction] = React.useState(false);

    //#region handles
    const handleOnChangeName = React.useCallback(event => {
        setName(event.target.value);
    }, []);

    const handleOnChangeValue = React.useCallback(event => {
        setValue(event.target.value as number);
    }, []);

    const handleOnChangeDate = React.useCallback(event => {
        setDate(event.target.value);
    }, []);

    const handleOnChangeLabel = React.useCallback(event => {
        setLabel(event.target.value as number);
    }, []);

    const handleOnChangeComments = React.useCallback(event => {
        setComments(event.target.value);
    }, []);

    const handleOnAction = React.useCallback(async () => {
        setLoadingAction(true);

        if (hasValue(props.expense)) {
            try {
                await new ExpenseService(config).update({
                    ...(props.expense as ExpenseFullModel),
                    name: name,
                    value: value as number,
                    date: date,
                    labelId: label as number,
                    comments: comments
                });
                props.onAction();
            } catch {
                setError(t('EXPENSE.ERROR'));
            } finally {
                setLoadingAction(false);
            }
        } else {
            setLoadingAction(true);
            try {
                await new ExpenseService(config).add({
                    name: name,
                    value: value as number,
                    date: date,
                    labelId: label as number,
                    comments: comments,
                    groupId: group
                });
                props.onAction();
            } catch {
                setError(t('EXPENSE.ERROR'));
            } finally {
                setLoadingAction(false);
            }
        }
    }, [name, value, date, label, comments, t, config, props, group]);
    //#endregion

    React.useEffect(() => {
        if (!props.show) {
            return;
        }

        if (props.expense) {
            setName(props.expense?.name);
            setValue(props.expense?.value);
            setDate(props.expense?.date);
            setLabel(props.expense?.label.id);
            setComments(props.expense?.comments);
        } else {
            setName('');
            setValue(undefined);
            setDate(new Date());
            setLabel(labels.length > 0 ? labels[0].id : undefined);
            setComments('');
        }
    }, [props, labels]);

    React.useEffect(() => {
        const runAsync = async () => {
            setLoadingLabels(true);
            setError('');
            try {
                const data = await new LabelService(config).getAll(group);
                setLabels(data);
            } catch {
                setError(t('EXPENSE.ERROR'));
            } finally {
                setLoadingLabels(false);
            }
        };
        runAsync();
    }, [t, config, group]);

    const disabledAction = React.useMemo(() => {
        if (
            isLoadingAction ||
            isLoadingLabels ||
            hasValue(error) ||
            !hasValue(name) ||
            !hasValue(value) ||
            !hasValue(date) ||
            !hasValue(label)
        ) {
            return true;
        }

        return false;
    }, [error, name, value, date, label, isLoadingAction, isLoadingLabels]);

    const labelOptions = React.useMemo(
        () =>
            labels.map(l => (
                <option key={l.id} value={l.id}>
                    {l.name}
                </option>
            )),
        [labels]
    );

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {hasValue(props.expense) ? t('EXPENSE.MODAL.EDIT_TITLE') : t('EXPENSE.MODAL.ADD_TITLE')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ErrorComponent message={error} />
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>{t('EXPENSE.MODAL.NAME')}</Form.Label>
                            <Form.Control
                                data-testid="expense-name-field"
                                type="text"
                                value={name}
                                placeholder={t('EXPENSE.MODAL.NAME_PLACEHOLDER')}
                                onChange={handleOnChangeName}
                            />
                        </Form.Group>
                        <Form.Group controlId="formValue">
                            <Form.Label>{t('EXPENSE.MODAL.VALUE')}</Form.Label>
                            <Form.Control
                                data-testid="expense-value-field"
                                type="number"
                                value={value ?? ''}
                                placeholder={t('EXPENSE.MODAL.VALUE_PLACEHOLDER')}
                                onChange={handleOnChangeValue}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>{t('EXPENSE.MODAL.DATE')}</Form.Label>
                            <Form.Control
                                data-testid="expense-date-field"
                                type="date"
                                value={format(new Date(date), t('EXPENSE.FIELD_DATE_FORMAT'))}
                                onChange={handleOnChangeDate}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLabel">
                            <Form.Label>{t('EXPENSE.MODAL.LABEL')}</Form.Label>
                            <LoadingComponent isLoading={isLoadingLabels}>
                                <Form.Control as="select" value={label ?? ''} onChange={handleOnChangeLabel}>
                                    {labelOptions}
                                </Form.Control>
                            </LoadingComponent>
                        </Form.Group>
                        <Form.Group controlId="formComments">
                            <Form.Label>{t('EXPENSE.MODAL.COMMENTS')}</Form.Label>
                            <Form.Control
                                data-testid="expense-comments-field"
                                as="textarea"
                                rows={2}
                                value={comments}
                                placeholder={t('EXPENSE.MODAL.COMMENTS_PLACEHOLDER')}
                                onChange={handleOnChangeComments}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOnAction} disabled={disabledAction}>
                        {hasValue(props.expense) ? t('EXPENSE.MODAL.EDIT_ACTION') : t('EXPENSE.MODAL.ADD_ACTION')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});
