import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { loginWithEmail } from '../../auth';
import { Redirect } from 'react-router';

/**
 * Login page
 */
const LoginPage: React.FC = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const disabledButton = useMemo(() => {
        return email === '' || password === '';
    }, [email, password]);

    const handle = async () => {
        setLoading(true);
        setError('');
        loginWithEmail(email, password)
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
        <div key='LoginPage'>
            <Card>
                <Card.Header className='pt-2'>{t('LOGIN_REGISTER.LOGIN')}</Card.Header>

                <Card.Body>
                    <Form>
                        <Form.Group controlId='formLoginEmail'>
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
                        <Form.Group controlId='formLoginPassword'>
                            <Form.Label>{t('LOGIN_REGISTER.PASSWORD')}</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder={t('LOGIN_REGISTER.PASSWORD_PLACEHOLDER')}
                                value={password}
                                onChange={(value: any) => {
                                    setPassword(value.target.value);
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
                            {t('LOGIN_REGISTER.LOGIN')}
                        </Button>
                    </Form>

                    {error !== '' && (
                        <Alert key='loginError' variant='danger' className='mt-2'>
                            {error}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginPage;
