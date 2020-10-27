import React from 'react';

export type LoadingProps = {
    isLoading: boolean;
};

export const LoadingComponent: React.FC<React.PropsWithChildren<LoadingProps>> = React.memo(
    (props: React.PropsWithChildren<LoadingProps>) => {
        if (props.isLoading) {
            return (
                <div className="m-2 text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return <>{props.children}</>;
    }
);
