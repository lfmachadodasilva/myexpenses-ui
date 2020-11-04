import React from 'react';

import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

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

        const { id, onEdit, onDelete, onDuplicate } = props;

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
            }
        }, [onDelete, id]);

        return (
            <div className="item-component">
                <Card key={`${props.id}_${props.name}`} className="mb-2 mt-2">
                    <Card.Title className="mt-2 mr-2 ml-2 mb-0">
                        <div className="d-flex justify-content-between">
                            {props.name}
                            <DropdownButton size="sm" variant="secondary" title="" id={`menu-${props.id}`}>
                                {props.onEdit && (
                                    <Dropdown.Item eventKey="1" onClick={handleOnEdit}>
                                        {t('ITEM.EDIT')}
                                    </Dropdown.Item>
                                )}
                                {props.onDuplicate && (
                                    <Dropdown.Item eventKey="1" onClick={handleOnDuplicate}>
                                        {t('ITEM.DUPLICATE')}
                                    </Dropdown.Item>
                                )}
                                {props.onDelete && (
                                    <Dropdown.Item eventKey="2" onClick={handleOnDelete}>
                                        {t('ITEM.DELETE')}
                                    </Dropdown.Item>
                                )}
                            </DropdownButton>
                        </div>
                    </Card.Title>
                    <Card.Body className="p-2">{props.children}</Card.Body>
                </Card>
            </div>
        );
    }
);
