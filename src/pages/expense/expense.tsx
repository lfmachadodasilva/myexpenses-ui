import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { createGlobalStyle } from 'styled-components';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { AlertComponent } from '../../components/alert/alert';
import { ItemsHeaderComponent } from '../../components/itemsHeader/itemsHeader';
import { LoadingComponent } from '../../components/loading/loading';
import { SearchComponent } from '../../components/search/search';
import { ConfigManager } from '../../configurations/configManager';
import { defaultGlobalContext, globalContext } from '../../contexts/global';
import { ConfigModel } from '../../models/config';
import { ExpenseFullModel, ExpenseType } from '../../models/expense';
import { ExpenseService } from '../../services/expense';
import { ExpenseItemsPage } from './expenseItems';
import { ExpenseSummaryPage } from './expenseSummary';
import { ExpenseModalPage, ExpenseModalType } from '../expenseModal/expenseModal';
import { hasValue } from '../../helpers/util';

export type ExpenseProps = {};

const ExpenseStyle = createGlobalStyle`
    .no-margin {
        margin: 0px;
    };
    canvas {
        max-width: 500px;
    };
    .red-text {
        color: #dc3545;
    }
`;

export const ExpensePage: React.FC<ExpenseProps> = React.memo((props: ExpenseProps) => {
    const [t] = useTranslation();
    const global = useContext(globalContext);

    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const [error, setError] = React.useState<string>('');
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [expenses, setExpenses] = React.useState<ExpenseFullModel[]>([]);
    const [expense, setExpense] = React.useState<ExpenseFullModel>();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<ExpenseModalType>(ExpenseModalType.ADD);
    const [refresh, setRefresh] = React.useState<boolean>(false);

    // #region main
    React.useEffect(() => {
        if (global.isLoading) {
            return;
        }

        const runAsync = async () => {
            setLoading(true);
            try {
                const data = await new ExpenseService(config).getAllFull(global.group, global.month, global.year);
                setExpenses(data);
            } catch {
                setExpenses([]);
                setError(t('LABEL.ERROR'));
            } finally {
                setLoading(false);
            }
        };
        runAsync();
    }, [global, config, t, refresh]);
    // #endregion

    // #region handles
    const handleOnAdd = React.useCallback(() => {
        setExpense(undefined);
        setModalType(ExpenseModalType.ADD);
        setShowModal(true);
    }, []);

    const handleOnEdit = React.useCallback(
        (id: number) => {
            setExpense(expenses.find(x => x.id === id));
            setModalType(ExpenseModalType.EDIT);
            setShowModal(true);
        },
        [expenses]
    );

    const handleOnDuplicate = React.useCallback(
        (id: number) => {
            setExpense(expenses.find(x => x.id === id));
            setModalType(ExpenseModalType.DUPLICATE);
            setShowModal(true);
        },
        [expenses]
    );

    const handleOnDelete = React.useCallback(
        async (id: number) => {
            try {
                await new ExpenseService(config).remove(id);
                setTimeout(() => {
                    setRefresh(!refresh);
                }, config.requestDelay);
            } catch {
                setError(t('LABEL.ERROR'));
            }
        },
        [config, t, refresh]
    );

    const handleOnHide = React.useCallback(() => {
        setShowModal(false);
    }, []);

    const handleOnAction = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            setRefresh(!refresh);
        }, config.requestDelay);
    }, [config, refresh]);
    // #endregion

    //#region items
    const incomingItems = React.useMemo(() => {
        return expenses.filter(x => x.type === +ExpenseType.INCOMING);
    }, [expenses]);

    const outcomingItems = React.useMemo(() => {
        return expenses.filter(x => x.type === +ExpenseType.OUTCOMING);
    }, [expenses]);
    //#endregion

    const alertsElement = React.useMemo(() => {
        if (global.group === defaultGlobalContext.group) {
            return <AlertComponent message={t('EXPENSE.EMPTY_GROUP')} type="warning" />;
        }
        if (expenses.length === 0 && !hasValue(error)) {
            return <AlertComponent message={t('EXPENSE.EMPTY')} type="warning" />;
        }
        return <AlertComponent message={error} type="danger" />;
    }, [expenses, error, t, global]);

    return (
        <>
            <ExpenseStyle />
            <SearchComponent />
            <ItemsHeaderComponent
                title={t('EXPENSE.TITLE')}
                action={t('EXPENSE.ADD')}
                onAction={handleOnAdd}
                disableAction={isLoading || global.isLoading}
            />
            {alertsElement}
            <LoadingComponent isLoading={isLoading || global.isLoading}>
                <Tabs defaultActiveKey="summary">
                    <Tab eventKey="summary" title={t('EXPENSE.SUMMARY')}>
                        <ExpenseSummaryPage incoming={incomingItems} outcoming={outcomingItems} />
                    </Tab>
                    <Tab eventKey="incoming" title={t('EXPENSE.INCOMING')}>
                        <ExpenseItemsPage
                            items={incomingItems}
                            onEdit={handleOnEdit}
                            onDuplicate={handleOnDuplicate}
                            onDelete={handleOnDelete}
                        />
                    </Tab>
                    <Tab eventKey="outcoming" title={t('EXPENSE.OUTCOMING')}>
                        <ExpenseItemsPage
                            items={outcomingItems}
                            onEdit={handleOnEdit}
                            onDuplicate={handleOnDuplicate}
                            onDelete={handleOnDelete}
                        />
                    </Tab>
                </Tabs>
            </LoadingComponent>
            <ExpenseModalPage
                show={showModal}
                type={modalType}
                expense={expense}
                onHide={handleOnHide}
                onAction={handleOnAction}
            />
        </>
    );
});
