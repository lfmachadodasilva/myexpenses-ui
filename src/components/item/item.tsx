import React from 'react';
import { useTranslation } from 'react-i18next';

import { BsThreeDotsVertical, BsTrash, BsPencil, BsLayersHalf } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';

import { ModalComponent } from '../modal/modal';
import { DropdownButtonComponent, DropdownItem } from '../dropdownButton/dropdownButton';

export interface ItemProps {
    id: number;
    name: string;
    onEdit?: (id: number) => void;
    onDuplicate?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export const ItemComponent: React.FC<React.PropsWithChildren<ItemProps>> = React.memo(
    (props: React.PropsWithChildren<ItemProps>) => {
        const [t] = useTranslation();
        const [showDeleteModal, setShowDeleteModal] = React.useState(false);

        const { id, onEdit, onDelete, onDuplicate } = props;

        const handleOnHide = React.useCallback(() => {
            setShowDeleteModal(false);
        }, []);

        const handleOnShowDeleteModel = React.useCallback(() => {
            setShowDeleteModal(true);
        }, []);

        const handleOnEdit = React.useCallback(() => {
            if (onEdit) {
                onEdit(id);
            }
        }, [onEdit, id]);

        const handleOnDuplicate = React.useCallback(() => {
            if (onDuplicate) {
                onDuplicate(id);
            }
        }, [onDuplicate, id]);

        const handleOnDelete = React.useCallback(() => {
            if (onDelete) {
                onDelete(id);
                handleOnHide();
            }
        }, [onDelete, handleOnHide, id]);

        const itemsElement = React.useMemo(() => {
            let items: DropdownItem[] = [];
            if (onEdit) {
                items.push({ text: t('ITEM.EDIT'), icon: <BsPencil />, onClick: handleOnEdit });
            }
            if (onDuplicate) {
                items.push({ text: t('ITEM.DUPLICATE'), icon: <BsLayersHalf />, onClick: handleOnDuplicate });
            }
            if (onDelete) {
                items.push({ text: t('ITEM.DELETE'), icon: <BsTrash />, onClick: handleOnShowDeleteModel });
            }

            return items;
        }, [onEdit, onDuplicate, onDelete, handleOnEdit, handleOnDuplicate, handleOnShowDeleteModel, t]);

        return (
            <div className="item-component">
                <Card key={`${props.id}_${props.name}`} className="mb-2 mt-2">
                    <Card.Body className="p-2">
                        <div className="row align-items-center">
                            <div className="col pr-0">
                                <h6>{props.name}</h6>
                                {props.children}
                            </div>
                            <div className="col-auto">
                                <DropdownButtonComponent
                                    id={`menu-${props.id}`}
                                    icon={<BsThreeDotsVertical />}
                                    items={itemsElement}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <ModalComponent
                    show={showDeleteModal}
                    title={t('ITEM.DELETE_TITLE')}
                    actionText={t('ITEM.DELETE_ACTION')}
                    actionVariant={'danger'}
                    onHide={handleOnHide}
                    onAction={handleOnDelete}
                    size="sm"
                >
                    <p>{t('ITEM.DELETE_QUESTON')}</p>
                </ModalComponent>
            </div>
        );
    }
);
