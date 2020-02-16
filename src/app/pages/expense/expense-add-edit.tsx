import React, { useContext, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import { FaCheckSquare, FaRegSquare, FaCalendarAlt } from 'react-icons/fa';

import 'react-datepicker/dist/react-datepicker.css';
import { globalContext } from '../../contexts/global-context';
import { Row, Col, Spinner, Form, Button, Alert, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { userContext } from '../../contexts/user-context';
import { ExpenseType, Expense } from '../../models/expense';
import { FetchStatus } from '../../services/fetch-status';
import { head } from 'lodash';
import { ExpenseService } from '../../services/expense/expense-service';
import { MyRoute } from '../../route';

const ExpenseAddEditPage: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useContext(userContext);
    const history = useHistory();
    const { expenseReducer, labelReducer, loadingBase, group } = useContext(globalContext);
    const { resetExpenses } = expenseReducer;
    const { labels: labelStatus } = labelReducer.state;
    const { getLabels } = labelReducer;

    const { expense: expenseId } = useParams();
    const isAdd = useRef(expenseId === undefined);

    const [loading, setLoading] = useState(false);
    const [error] = useState('');

    // fields
    const [expense, setExpense] = useState<Expense>();
    const [type, setType] = useState(ExpenseType.Outcoming);
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [value, setValue] = useState<number>();
    const [label, setLabel] = useState('');

    const loadExpensesAsync = useCallback(async () => {
        setLoading(true);

        await new ExpenseService(user)
            .get(expenseId)
            .then(value => {
                setName(value.name);
                setType(value.type);
                setDate(value.date);
                setValue(value.value);
                setLabel(value.labelId);
                setExpense(value);
            })
            .catch(e => {
                // setError(e.toString());
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user, expenseId]);

    const handleAdd = useCallback(() => {
        return new ExpenseService(user)
            .add({
                type: type,
                name: name,
                date: date,
                value: value,
                labelId: label,
                groupId: group
            } as Expense)
            .finally(() => {
                resetExpenses();
                history.push(MyRoute.EXPENSE);
            });
    }, [type, name, date, value, label, user, group, history, resetExpenses]);

    const handleEdit = useCallback(() => {
        return new ExpenseService(user)
            .update({
                id: expenseId,
                type: type,
                name: name,
                date: date,
                value: value,
                labelId: label,
                groupId: group
            } as Expense)
            .finally(() => {
                resetExpenses();
                history.push(MyRoute.EXPENSE);
            });
    }, [user, type, name, date, value, label, expenseId, group, history, resetExpenses]);

    useEffect(() => {
        if (loadingBase) {
            return;
        }
        if (labelStatus.status === FetchStatus.Ready) {
            const loadLabels = async () => {
                setLoading(true);

                await getLabels().finally(() => {
                    setLoading(false);
                });
            };
            loadLabels();
        } else if (isAdd.current && labelStatus.status === FetchStatus.Loaded) {
            if (labelStatus.data.length > 0) {
                // select the first one
                setLabel(head(labelStatus.data).id);
            }
        }
        if (!isAdd.current && (expense === null || expense === undefined)) {
            loadExpensesAsync();
        }
    }, [labelStatus, getLabels, loadExpensesAsync, isAdd, expense, loadingBase]);

    const disabledButton = useMemo(() => {
        return loadingBase || loading || name === '' || value === null || value === undefined || label === '';
    }, [loadingBase, loading, name, value, label]);

    return (
        <div className='mt-4'>
            {loadingBase && (
                <Row className='m-4'>
                    <Col style={{ textAlign: 'center' }}>
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
            {!loadingBase && (
                <Row>
                    <Col sm={12} md={6}>
                        <h4>{t(isAdd.current ? 'EXPENSE.ADD_TITLE' : 'EXPENSE.EDIT_TITLE')}</h4>

                        <hr></hr>
                        <Form>
                            <Form.Group controlId='formExpenseType'>
                                <Form.Label>{t('EXPENSE.TYPE')}</Form.Label>
                                <br />
                                <ToggleButtonGroup
                                    size='sm'
                                    type='checkbox'
                                    value={[ExpenseType.Outcoming, ExpenseType.Incoming]}
                                    onChange={(value: any) => {
                                        setType(value[0]);
                                    }}
                                >
                                    <ToggleButton value={ExpenseType.Incoming} variant='outline-dark'>
                                        {type !== ExpenseType.Outcoming && <FaRegSquare className='mr-1' size={16} />}
                                        {type === ExpenseType.Outcoming && <FaCheckSquare className='mr-1' size={16} />}
                                        {t('EXPENSE.OUTCOMING')}
                                    </ToggleButton>
                                    <ToggleButton value={ExpenseType.Outcoming} variant='outline-dark'>
                                        {type !== ExpenseType.Incoming && <FaRegSquare className='mr-1' size={16} />}
                                        {type === ExpenseType.Incoming && <FaCheckSquare className='mr-1' size={16} />}
                                        {t('EXPENSE.INCOMING')}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>

                            <Form.Group controlId='formExpenseName'>
                                <Form.Label>{t('EXPENSE.NAME')}</Form.Label>
                                {!isAdd.current && loading && (
                                    <>
                                        &nbsp;
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />
                                        &nbsp;
                                    </>
                                )}
                                <Form.Control
                                    type='text'
                                    placeholder={t('EXPENSE.NAME_PLACEHOLDER')}
                                    value={name}
                                    onChange={(value: any) => {
                                        setName(value.target.value);
                                    }}
                                    size='sm'
                                    // disabled={loading || loadingLabel}
                                />
                            </Form.Group>

                            <Form.Group controlId='formExpenseDate'>
                                <Form.Label>{t('EXPENSE.DATE')}</Form.Label>
                                <br />
                                <DatePicker
                                    selected={date}
                                    onChange={(value: any) => setDate(value)}
                                    placeholderText={t('EXPENSE.DATE.NAME_PLACEHOLDER')}
                                    customInput={
                                        <Button variant='outline-secondary' className='date-custom-input' size='sm'>
                                            {date.toDateString()}
                                            <FaCalendarAlt className='ml-1' size={16} />
                                        </Button>
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId='formExpenseValue'>
                                <Form.Label>{t('EXPENSE.VALUE')}</Form.Label>
                                {!isAdd.current && loading && (
                                    <>
                                        &nbsp;
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />
                                        &nbsp;
                                    </>
                                )}
                                <Form.Control
                                    type='number'
                                    placeholder={t('EXPENSE.VALUE_PLACEHOLDER')}
                                    value={value ? value.toString() : ''}
                                    onChange={(value: any) => {
                                        setValue(+value.target.value);
                                    }}
                                    size='sm'
                                    pattern='\d+'
                                    // disabled={loading || loadingLabel}
                                />
                            </Form.Group>

                            <Form.Group controlId='formExpenseLabel'>
                                <Form.Label>{t('EXPENSE.LABEL')}</Form.Label>
                                <Form.Control
                                    as='select'
                                    onChange={(value: any) => {
                                        setLabel(value.target.value);
                                    }}
                                    size='sm'
                                    value={label}
                                >
                                    {labelStatus.status === FetchStatus.Loaded &&
                                        labelStatus.data &&
                                        labelStatus.data.map(obj => {
                                            return (
                                                <option key={obj.id} value={obj.id}>
                                                    {obj.name}
                                                </option>
                                            );
                                        })}
                                </Form.Control>
                            </Form.Group>

                            <Button
                                variant='primary'
                                disabled={disabledButton}
                                onClick={isAdd.current ? handleAdd : handleEdit}
                                size='sm'
                            >
                                {loading && (
                                    <>
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            role='status'
                                            aria-hidden='true'
                                            size='sm'
                                        />
                                        &nbsp;
                                    </>
                                )}
                                {t(isAdd.current ? 'EXPENSE.ADD' : 'EXPENSE.EDIT')}
                            </Button>
                        </Form>

                        {error !== '' && (
                            <Alert key='addError' variant='danger' className='mt-2'>
                                {error}
                            </Alert>
                        )}
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default ExpenseAddEditPage;
