import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { resetPassword } from '../../auth';
import { Redirect } from 'react-router';

/**
 * Forgot page
 */
const ForgotPage: React.FC = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const disabledButton = useMemo(() => {
        return email === '';
    }, [email]);

    const handle = async () => {
        setLoading(true);
        setError('');
        resetPassword(email)
            .then(() => {
                setRedirectToReferrer(true);
            })
            .catch(e => {
                setError(e.toString());
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (redirectToReferrer) {
        const { from } = { from: { pathname: '/' } };
        return <Redirect from='' to={from.pathname} />;
    }

    return (
        <div key='ForgotPage'>
            <Card>
                <Card.Title className='pt-2'>{t('LOGIN_REGISTER.FORGOT')}</Card.Title>

                <Card.Body>
                    <Form>
                        <Form.Group controlId='formForgotEmail'>
                            <Form.Label>{t('LOGIN_REGISTER.EMAIL')}</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder={t('LOGIN_REGISTER.EMAIL_PLACEHOLDER')}
                                value={email}
                                onChange={(value: any) => {
                                    setEmail(value.target.value);
                                }}
                            />
                        </Form.Group>

                        <Button variant='primary' onClick={handle} disabled={disabledButton}>
                            {loading && (
                                <>
                                    <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                                    &nbsp;
                                </>
                            )}
                            {t('LOGIN_REGISTER.RESET')}
                        </Button>
                    </Form>

                    {error !== '' && (
                        <Alert key='forgotError' variant='danger' className='mt-2'>
                            {error}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ForgotPage;
