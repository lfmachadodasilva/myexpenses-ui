import { FetchData } from '../../services/fetch-data';
import { ExpenseWithDetails } from '../../models/expense';
import { FetchStatus } from '../../services/fetch-status';
import React, { useState } from 'react';
import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { ListGroup, Badge, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export interface ExpenseListProps {
    expenses: FetchData<ExpenseWithDetails[]>;
    onEdit: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}
const ExpenseList: React.FC<ExpenseListProps> = (props: ExpenseListProps) => {
    const { expenses, onEdit, onDelete } = props;
    const { t } = useTranslation();
    const [loadingDelete, setLoadingDelete] = useState('');

    return (
        <>
            {expenses && expenses.status === FetchStatus.Loaded && (
                <ListGroup className='mt-3 mb-3'>
                    {expenses.data.map(expense => {
                        return (
                            <ListGroup.Item key={JSON.stringify(expense)}>
                                <div className='d-flex justify-content-between'>
                                    <h4>{expense.name}</h4>
                                    <div className='d-flex justify-content-end'>
                                        <FaEdit
                                            className='mr-3'
                                            size={16}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => onEdit(expense.id)}
                                        />
                                        {loadingDelete === expense.id && (
                                            <>
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </>
                                        )}
                                        {loadingDelete !== expense.id && (
                                            <FaRegWindowClose
                                                size={16}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    setLoadingDelete(expense.id);
                                                    onDelete(expense.id).finally(() => {
                                                        setLoadingDelete(null);
                                                    });
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <hr className='m-1' />

                                <div className='d-flex justify-content-around'>
                                    <h6 style={{ textAlign: 'center' }}>
                                        {t('Value')}
                                        <br />
                                        <Badge variant='info'>{t('CURRENCY') + ' ' + expense.value.toFixed(2)}</Badge>
                                    </h6>

                                    {expense.label && (
                                        <h6 style={{ textAlign: 'center' }}>
                                            {t('Label')}
                                            <br />
                                            <Badge variant='info'>{expense.label.name}</Badge>
                                        </h6>
                                    )}
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            )}
        </>
    );
};

export default ExpenseList;
