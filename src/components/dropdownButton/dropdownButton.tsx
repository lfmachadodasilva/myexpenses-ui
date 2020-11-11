import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { hasValue } from '../../helpers/util';

import './dropdownButton.scss';

export interface DropdownItem {
    text?: string;
    icon?: JSX.Element;

    onClick: () => void | Promise<void>;
}

export interface DropdownButtonProps {
    id?: string;
    type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
    text?: string;
    size?: 'sm' | 'lg';
    icon?: JSX.Element;

    className?: string;
    disabled?: boolean;

    items: DropdownItem[];
}

export const DropdownButtonComponent: React.FC<DropdownButtonProps> = React.memo((props: DropdownButtonProps) => {
    const itemsElement = React.useMemo(
        () =>
            props.items.map(item => (
                <Dropdown.Item eventKey="1" onClick={item.onClick}>
                    <span className="mr-2">{hasValue(item.icon) && item.icon}</span>
                    {hasValue(item.text) && item.text}
                </Dropdown.Item>
            )),
        [props.items]
    );

    return (
        <div className="dropdown-button">
            <DropdownButton
                id={props.id}
                key={props.id}
                size={props.size}
                className={`dropdown-toggle ${props.className}`}
                title={
                    <>
                        <span className="mr-2">{props.icon}</span>
                        {props.text}
                    </>
                }
            >
                {itemsElement}
            </DropdownButton>
        </div>
    );
});
