import { FetchData } from '../../services/fetch-data';
import { ExpenseWithDetails } from '../../models/expense';
import { FetchStatus } from '../../services/fetch-status';
import React, { useState, useCallback } from 'react';
import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { ListGroup, Badge, Spinner, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

export interface ExpenseListProps {
    expenses: FetchData<ExpenseWithDetails[]>;
    onEdit: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}
const ExpenseList: React.FC<ExpenseListProps> = (props: ExpenseListProps) => {
    const { expenses, onEdit, onDelete } = props;
    const { t } = useTranslation();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState('');

    const handleOnCloseDeleteModel = useCallback(() => {
        setShowDeleteModal(false);
        setLoadingDelete('');
    }, []);

    const handleDelete = useCallback(() => {
        setShowDeleteModal(true);
        setLoadingDelete(loadingDelete);
        onDelete(loadingDelete).finally(() => {
            setLoadingDelete(null);
        });
    }, [onDelete, loadingDelete]);

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
                                                    setShowDeleteModal(true);
                                                    setLoadingDelete(expense.id);
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <hr className='m-1' />

                                <div className='d-flex justify-content-around'>
                                    <h6 style={{ textAlign: 'center' }}>
                                        {t('EXPENSE.DATE')}
                                        <br />
                                        <Badge variant='info'>{format(expense.date, 'dd/MM/yyyy')}</Badge>
                                    </h6>
                                    <h6 style={{ textAlign: 'center' }}>
                                        {t('EXPENSE.VALUE')} <br />
                                        <Badge variant='info'>{t('CURRENCY') + ' ' + expense.value.toFixed(2)}</Badge>
                                    </h6>

                                    {expense.label && (
                                        <h6 style={{ textAlign: 'center' }}>
                                            {t('EXPENSE.LABEL')} <br />
                                            <Badge variant='info'>{expense.label.name}</Badge>
                                        </h6>
                                    )}
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            )}
            <Modal show={showDeleteModal} onHide={handleOnCloseDeleteModel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('ADD_EDIT.DELETE_TITLE')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('ADD_EDIT.DELETE_BODY')}</Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleDelete}>
                        {t('ADD_EDIT.DELETE')}
                    </Button>
                    <Button variant='secondary' onClick={handleOnCloseDeleteModel}>
                        {t('ADD_EDIT.CANCEL')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExpenseList;
