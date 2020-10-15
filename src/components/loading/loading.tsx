import React from 'react';

export type LoadingProps = {};

export const LoadingComponent: React.FC<LoadingProps> = React.memo((props: LoadingProps) => {
    return <>Loading Component</>;
});
