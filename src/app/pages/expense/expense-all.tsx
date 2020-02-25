import React, { useContext, useEffect, useCallback, useMemo } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import SearchComponent from '../../components/search/search';
import { useHistory } from 'react-router-dom';
import { globalContext } from '../../contexts/global-context';
import { LocalStorageHelper } from '../../helpers/localStorage-helper';
import { FetchStatus } from '../../services/fetch-status';
import { MyRoute } from '../../route';
import { ExpenseType, ExpenseWithDetails } from '../../models/expense';
import ExpenseList from './expense-list';
import { FetchData } from '../../services/fetch-data';
import { userContext } from '../../contexts/user-context';
import { ExpenseService } from '../../services/expense/expense-service';
import { sumBy } from 'lodash';

const ExpenseAllPage: React.FC = () => {
    const global = useContext(globalContext);
    const { user } = useContext(userContext);
    const { t } = useTranslation();
    const history = useHistory();

    const { loadingBase, expenseReducer } = global;

    const search = async (g: string, m: number, y: number) => {
        LocalStorageHelper.setGroup(g);

        global.group = g;
        global.month = m;
        global.year = y;

        // TODO test
        // await global.groupReducer.getGroups();

        // TODO search
    };

    const { state: expenseState, getExpenses, resetExpenses } = expenseReducer;
    useEffect(() => {
        if (loadingBase || (expenseState.expenses && expenseState.expenses.status !== FetchStatus.Ready)) {
            return;
        }

        getExpenses(global.group, global.month, global.year);
    }, [expenseState.expenses, getExpenses, loadingBase, global.group, global.month, global.year]);

    const handleOnEdit = useCallback(
        (id: string): Promise<void> => {
            return new Promise(resolve => {
                history.push(MyRoute.EXPENSE + `/${id}`);
                resolve();
            });
        },
        [history]
    );

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

    const { expenses } = expenseState;
    const [totalUsed, totalUsedPercentage, totalLeft, totalLeftPercentage] = useMemo(() => {
        if (
            expenses == null ||
            expenses === undefined ||
            expenses.status !== FetchStatus.Loaded ||
            expenses.data.length === 0
        ) {
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

    return (
        <div key='ExpenseAllPage'>
            <SearchComponent search={search} />

            <hr></hr>

            <Button
                className='mb-4'
                variant='primary'
                size='sm'
                disabled={expenseState.expenses && expenseState.expenses.status !== FetchStatus.Loaded}
                onClick={() => {
                    history.push(MyRoute.EXPENSE_ADD);
                }}
            >
                <FaPlus size={16} />
                &nbsp;
                {t('EXPENSE.ADD')}
            </Button>

            <Alert variant={totalLeft >= 0 ? 'success' : 'danger'}>
                <div className='d-flex justify-content-around'>
                    <h6>{t('EXPENSE.TOTAL_USED')} </h6>
                    <h6>{t('CURRENCY') + ' ' + totalUsed.toFixed(2)}</h6>
                    <h6>{totalUsedPercentage.toFixed(2) + ' %'}</h6>
                </div>
                <div className='d-flex justify-content-around'>
                    <h6 className='m-0'>{t('EXPENSE.TOTAL_LEFT')}</h6>
                    <h6 className='m-0'>{t('CURRENCY') + ' ' + totalLeft.toFixed(2)}</h6>
                    <h6 className='m-0'>{totalLeftPercentage.toFixed(2) + ' %'}</h6>
                </div>
            </Alert>

            <Row>
                <Col>
                    <h6>{t('EXPENSE.OUTCOMING')}</h6>
                    {expenseState.expenses && expenseState.expenses.status === FetchStatus.Loaded && (
                        <ExpenseList
                            expenses={
                                {
                                    data: expenseState.expenses.data.filter(
                                        expense => expense.type === ExpenseType.Outcoming
                                    ),
                                    status: expenseState.expenses.status
                                } as FetchData<ExpenseWithDetails[]>
                            }
                            onEdit={handleOnEdit}
                            onDelete={handleOnDelete}
                        />
                    )}
                </Col>
                <Col>
                    <h6>{t('EXPENSE.INCOMING')}</h6>
                    {expenseState.expenses && expenseState.expenses.status === FetchStatus.Loaded && (
                        <ExpenseList
                            expenses={
                                {
                                    data: expenseState.expenses.data.filter(
                                        expense => expense.type === ExpenseType.Incoming
                                    ),
                                    status: expenseState.expenses.status
                                } as FetchData<ExpenseWithDetails[]>
                            }
                            onEdit={handleOnEdit}
                            onDelete={handleOnDelete}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ExpenseAllPage;
