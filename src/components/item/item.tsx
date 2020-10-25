import React from 'react';

import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { createGlobalStyle } from 'styled-components';

export interface ItemProps {
    id: number;
    name: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ItemStyle = createGlobalStyle`
    .item-component {
        .card-body {
            padding: 10px;
        }
    };
    `;

export const ItemComponent: React.FC<React.PropsWithChildren<ItemProps>> = React.memo(
    (props: React.PropsWithChildren<ItemProps>) => {
        const [t] = useTranslation();

        return (
            <div className="item-component">
                <ItemStyle />
                <Card key={`${props.id}_${props.name}`} className="mb-1">
                    <Card.Body>
                        <Card.Title className="m-0">
                            <div className="d-flex justify-content-between">
                                {props.name}
                                <DropdownButton size="sm" variant="secondary" title="" id={`menu-${props.id}`}>
                                    <Dropdown.Item eventKey="1" onClick={() => props.onEdit(props.id)}>
                                        {t('LABEL.EDIT')}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="2" onClick={() => props.onDelete(props.id)}>
                                        {t('LABEL.DELETE')}
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </Card.Title>
                        <Card.Body>{props.children}</Card.Body>
                    </Card.Body>
                </Card>
            </div>
        );
    }
);
