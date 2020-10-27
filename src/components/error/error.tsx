import React from 'react';
import { hasValue } from '../../helpers/util';

export interface ErrorProps {
    message: string;
}

export const ErrorComponent: React.FC<ErrorProps> = React.memo((props: ErrorProps) => {
    if (!hasValue(props.message)) {
        return <></>;
    }

    return (
        <div className="alert alert-danger" role="alert">
            {props.message}
        </div>
    );
});
