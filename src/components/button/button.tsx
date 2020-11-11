import React from 'react';

import { hasValue } from '../../helpers/util';

export interface ButtonProps {
    type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
    text?: string;
    size?: 'sm' | 'lg';
    icon?: JSX.Element;

    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

export const ButtonComponent: React.FC<ButtonProps> = React.memo((props: ButtonProps) => {
    const { size = 'md', className, type = 'primary', icon, text, onClick, disabled } = props;

    if (!hasValue(text) && hasValue(icon)) {
        return (
            <>
                <span role="button" className={className} onClick={onClick}>
                    {icon}
                </span>
            </>
        );
    }

    return (
        <div className="dropdown-button">
            <button
                type="button"
                className={`btn btn-${type} btn-${size} ${className}`}
                onClick={onClick}
                disabled={disabled}
            >
                <div className="d-flex justify-content-center">
                    {icon && <div>{icon}</div>}
                    {text}
                </div>
            </button>
        </div>
    );
});
