import React, { useContext, useEffect, useCallback, useMemo, useState } from 'react';
import { Row, Col, Button, Alert, Badge, Card } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';

import SearchComponent from '../../components/search/search';
import { useHistory } from 'react-router-dom';
import { globalContext } from '../../contexts/global-context';
import { LocalStorageHelper } from '../../helpers/localStorage-helper';
import { FetchStatus } from '../../services/fetch-status';
import { MyRoute } from '../../route';
import { ExpenseType, ExpenseWithDetails } from '../../models/expense';
import { userContext } from '../../contexts/user-context';
import { ExpenseService } from '../../services/expense/expense-service';
import { sumBy } from 'lodash';
import { hasValue } from '../../helpers/util-helper';
import ListComponent from '../../components/list/list';
import { format } from 'date-fns';

const ExpenseAllPage: React.FC = () => {
    const global = useContext(globalContext);
    const { user } = useContext(userContext);
    const { t } = useTranslation();
    const history = useHistory();

    const {
        loadingBase,
        expenseReducer: {
            state: { years, expenses },
            getExpenses,
            resetExpenses
        },
        groupReducer: {
            state: { groups }
        }
    } = global;

    const [group, setGroup] = useState(global.group);
    const [month, setMonth] = useState(global.month);
    const [year, setYear] = useState(global.year);

    useEffect(() => {
        setGroup(global.group);
        setMonth(global.month);
        setYear(global.year);
    }, [global.group, global.month, global.year]);

    useEffect(() => {
        console.log(loadingBase, expenses, group, year, month);
        if (loadingBase || expenses.status !== FetchStatus.Ready || !hasValue(group) || !hasValue(year)) {
            return;
        }

        getExpenses(group, month, year).then(value => console.log);
    }, [expenses, getExpenses, loadingBase, group, month, year]);

    const handleOnSearch = (group: string, month: number, year: number) => {
        LocalStorageHelper.setGroup(group);

        setGroup(group);
        setMonth(month);
        setYear(year);

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify({
                group: group,
                month: month,
                year: year
            })
        });

        resetExpenses();
    };

    const handleOnDelete = useCallback(
        (id: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                let doIt = false;
                new ExpenseService(user)
                    .delete(id)
                    .then(() => {
                        doIt = true;
                        resolve();
                    })
                    .catch(() => reject())
                    .finally(() => {
                        if (doIt) {
                            resetExpenses();
                        }
                    });
            });
        },
        [user, resetExpenses]
    );

    const [totalUsed, totalUsedPercentage, totalLeft, totalLeftPercentage] = useMemo(() => {
        if (!hasValue(expenses) || expenses.status !== FetchStatus.Loaded || expenses.data.length === 0) {
            return [0, 0, 0, 0];
        }

        const totalOutcoming = sumBy(
            expenses.data.filter(expense => expense.type === ExpenseType.Outcoming),
            expense => expense.value
        );
        const totalIncoming = sumBy(
            expenses.data.filter(expense => expense.type === ExpenseType.Incoming),
            expense => expense.value
        );

        return [
            totalOutcoming,
            (totalOutcoming / totalIncoming) * 100,
            totalIncoming - totalOutcoming,
            ((totalIncoming - totalOutcoming) / totalIncoming) * 100
        ];
    }, [expenses]);

    const showListOfExpenses = useCallback(
        (data: ExpenseWithDetails[], expenseType: ExpenseType) => {
            return (
                <ListComponent
                    items={data
                        .filter(expense => expense.type === expenseType)
                        .map(expense => {
                            const badges = [
                                {
                                    title: t('EXPENSE.DATE'),
                                    value: format(expense.date, 'dd/MM/yyyy')
                                },
                                {
                                    title: t('EXPENSE.VALUE'),
                                    value: t('CURRENCY') + ' ' + expense.value.toFixed(2)
                                }
                            ];
                            if (hasValue(expense.label)) {
                                badges.push({
                                    title: t('EXPENSE.LABEL'),
                                    value: expense.label.name
                                });
                            }
                            return {
                                id: expense.id,
                                title: expense.name,
                                onEdit: (id: string) => Promise.resolve(history.push(MyRoute.EXPENSE + `/${id}`)),
                                onDelete: handleOnDelete,
                                badges: badges
                            };
                        })}
                />
            );
        },
        [handleOnDelete, history, t]
    );

    return (
        <div key='ExpenseAllPage'>
            <SearchComponent
                group={group}
                groups={groups}
                month={month}
                year={year}
                years={years}
                onSearch={handleOnSearch}
            />

            <hr></hr>

            <Button
                className='mb-4'
                variant='primary'
                size='sm'
                disabled={hasValue(expenses) && expenses.status !== FetchStatus.Loaded}
                onClick={() => {
                    history.push(MyRoute.EXPENSE_ADD);
                }}
            >
                <FaPlus size={16} />
                &nbsp;
                {t('ADD')}
            </Button>

            {hasValue(expenses) && expenses.status === FetchStatus.Ready && (
                <Alert key='NotLoaded' variant='info' className='mt-4'>
                    {t('NOT_LOADED')}
                </Alert>
            )}
            {hasValue(expenses) && expenses.status === FetchStatus.Loaded && expenses.data.length === 0 && (
                <Alert key='EmptyLabel' variant='warning' className='mt-4'>
                    {t('NO_DATA')}
                </Alert>
            )}

            {hasValue(expenses) && expenses.status === FetchStatus.Loaded && expenses.data.length > 0 && (
                <>
                    <Card body className='mb-4'>
                        <Row>
                            <Col>
                                <p className='font-weight-bold mb-0'>{t('EXPENSE.TOTAL_USED')}</p>
                            </Col>
                            <Col>
                                <Badge variant={totalLeft >= 0 ? 'success' : 'danger'}>
                                    {t('CURRENCY') + ' ' + totalUsed.toFixed(2)}
                                </Badge>
                            </Col>
                            <Col>
                                <Badge variant={totalLeft >= 0 ? 'success' : 'danger'}>
                                    {totalUsedPercentage.toFixed(2) + ' %'}
                                </Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className='font-weight-bold mb-0'>{t('EXPENSE.TOTAL_LEFT')}</p>
                            </Col>
                            <Col>
                                <Badge variant={totalLeft >= 0 ? 'success' : 'danger'}>
                                    {t('CURRENCY') + ' ' + totalLeft.toFixed(2)}
                                </Badge>
                            </Col>
                            <Col>
                                <Badge variant={totalLeft >= 0 ? 'success' : 'danger'}>
                                    {totalLeftPercentage.toFixed(2) + ' %'}
                                </Badge>
                            </Col>
                        </Row>
                    </Card>
                    <Row>
                        <Col sm={12} md={12} lg={6} className='mb-3'>
                            <h6>{t('EXPENSE.OUTCOMING')}</h6>
                            {expenses.status === FetchStatus.Loaded &&
                                hasValue(expenses.data) &&
                                showListOfExpenses(expenses.data, ExpenseType.Outcoming)}
                        </Col>
                        <Col sm={12} md={12} lg={6} className='mb-3'>
                            <h6>{t('EXPENSE.INCOMING')}</h6>
                            {expenses.status === FetchStatus.Loaded &&
                                hasValue(expenses.data) &&
                                showListOfExpenses(expenses.data, ExpenseType.Incoming)}
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default ExpenseAllPage;
