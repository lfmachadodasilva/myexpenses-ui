import React, { useCallback, useState } from 'react';
import { ListGroup, Spinner, Badge } from 'react-bootstrap';
import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import { hasValue } from '../../helpers/util-helper';
import ModalComponent from '../modal/modal';

interface ListItemBadgeProps {
    title: string;
    value: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

interface ListItemProps {
    id: string;
    title: string;
    onEdit?: (id: string) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    badges?: ListItemBadgeProps[];
}

interface ListComponentProps {
    items: ListItemProps[];
}

const ListComponent: React.FC<ListComponentProps> = (props: ListComponentProps) => {
    const { t } = useTranslation();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoadingEdit, setLoadingEdit] = useState<string>(null);
    const [isLoadingDelete, setLoadingDelete] = useState<string>(null);
    const { items } = props;

    const handleOnEdit = useCallback(
        (id: string) => {
            setLoadingEdit(id);
            const item = items.find(item => item.id === id);
            if (hasValue(item) && item.onEdit) {
                item.onEdit(id).then(() => setLoadingEdit(null));
            } else {
                setLoadingEdit(null);
            }
        },
        [items]
    );
    const handleOnDelete = useCallback(
        (id: string) => {
            setShowDeleteModal(false);
            setLoadingDelete(id);
            const item = items.find(item => item.id === id);
            if (hasValue(item) && item.onEdit) {
                item.onDelete(id).then(() => setLoadingDelete(null));
            } else {
                setLoadingDelete(null);
                setShowDeleteModal(false);
            }
        },
        [items]
    );

    return (
        <>
            <ListGroup key='list-component'>
                {props.items.map(item => (
                    <ListGroup.Item key={JSON.stringify(item)}>
                        <div className='d-flex justify-content-between'>
                            <h6 className='m-0'>{item.title}</h6>
                            <div className='d-flex justify-content-end'>
                                {hasValue(item.onEdit) &&
                                    (isLoadingEdit === item.id ? (
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />
                                    ) : (
                                        <FaEdit
                                            size={16}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleOnEdit(item.id)}
                                        />
                                    ))}
                                {hasValue(item.onDelete) &&
                                    (isLoadingDelete === item.id ? (
                                        <Spinner
                                            className='ml-3'
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />
                                    ) : (
                                        <FaRegWindowClose
                                            className='ml-3'
                                            size={16}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setLoadingDelete(item.id);
                                                setShowDeleteModal(true);
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>

                        {hasValue(item.badges) && (
                            <>
                                <hr className='m-1' />

                                <div className='d-flex justify-content-around'>
                                    {item.badges.map(badges => (
                                        <p className='d-flex flex-column justify-content-center text-wrap mb-0'>
                                            <small className='text-center'>{badges.title}</small>
                                            <Badge variant={hasValue(badges.variant) ? badges.variant : 'info'}>
                                                {badges.value}
                                            </Badge>
                                        </p>
                                    ))}
                                </div>
                            </>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <ModalComponent
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setLoadingDelete(null);
                }}
                title={t('DELETE_TITLE')}
                body={t('DELETE_BODY')}
                buttons={[
                    {
                        label: t('DELETE'),
                        variant: 'danger',
                        onClick: () => handleOnDelete(isLoadingDelete)
                    },
                    {
                        label: t('CANCEL'),
                        variant: 'secondary',
                        onClick: () => {
                            setShowDeleteModal(false);
                            setLoadingDelete(null);
                        }
                    }
                ]}
            />
        </>
    );
};

export default ListComponent;
