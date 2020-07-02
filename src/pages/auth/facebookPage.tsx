import React, { memo, useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import FacebookIcon from '@material-ui/icons/Facebook';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { loginWithFacebook } from '../../services/authService';
import { Routes } from '../routes';

export type FacebookProps = {};

export const FacebookPage: React.FC<FacebookProps> = memo(() => {
    const [t] = useTranslation();
    const history = useHistory();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [hasError, setError] = useState<boolean>(false);

    const handleFacebook = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            await loginWithFacebook();
            setTimeout(() => history.push(Routes.home));
        } catch (error) {
            setError(true);
            // console.error(error);
        } finally {
            setLoading(false);
        }
    }, [history]);

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<FacebookIcon />}
                onClick={handleFacebook}
                endIcon={
                    <>
                        {isLoading && <CircularProgress size={15} />}
                        {hasError && <CloseIcon color="secondary" data-testid="facebook-close-icon" />}
                    </>
                }
                disabled={isLoading}
            >
                {t('AUTH.FACEBOOK.BUTTON')}
            </Button>
        </>
    );
});
