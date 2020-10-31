import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay';
import { createGlobalStyle } from 'styled-components';

export type LoadingProps = {
    isLoading: boolean;
};

const LoadingStyle = createGlobalStyle`
    ._loading_overlay_overlay {
        background: rgba(0,0,0,0.5);
    };
`;

export const LoadingComponent: React.FC<React.PropsWithChildren<LoadingProps>> = React.memo(
    (props: React.PropsWithChildren<LoadingProps>) => {
        const [t] = useTranslation();

        return (
            <>
                <LoadingStyle />
                <LoadingOverlay
                    active={props.isLoading}
                    spinner={
                        <div className="spinner-border" role="status">
                            <span className="sr-only">{t('LOADING')}</span>
                        </div>
                    }
                    text={
                        <>
                            <p>{t('LOADING')}</p>
                        </>
                    }
                >
                    {props.children}
                </LoadingOverlay>
            </>
        );
    }
);
