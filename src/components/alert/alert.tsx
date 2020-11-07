import React from 'react';
import { hasValue } from '../../helpers/util';

export interface AlertProps {
    type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    message: string;
}

export const AlertComponent: React.FC<AlertProps> = React.memo((props: AlertProps) => {
    const { type = 'danger', message } = props;

    if (!hasValue(message)) {
        return <></>;
    }

    return (
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    );
});
