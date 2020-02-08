import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { createUserWithEmail } from '../../auth';
import { Redirect } from 'react-router';

/**
 * Register page
 */
const RegisterPage: React.FC = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);
    const [error, setError] = useState('');

    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const disabledButton = useMemo(() => {
        return email === '' || password === '';
    }, [email, password]);

    const handleRegister = async () => {
        setRegisterLoading(true);
        setError('');
        createUserWithEmail(email, password)
            .then(() => {
                setRedirectToReferrer(true);
            })
            .catch(e => {
                setError(e.toString());
            })
            .finally(() => {
                setRegisterLoading(false);
            });
    };

    if (redirectToReferrer) {
        const { from } = { from: { pathname: '/' } };
        return <Redirect from='' to={from.pathname} />;
    }

    return (
        <div key='RegisterPage'>
            <Card>
                <Card.Header className='pt-2'>{t('LOGIN_REGISTER.REGISTER')}</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId='formRegisterEmail'>
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
                        <Form.Group controlId='formRegisterPassword'>
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

                        <Button variant='primary' onClick={handleRegister} disabled={disabledButton}>
                            {registerLoading && (
                                <>
                                    <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                                    &nbsp;
                                </>
                            )}
                            {t('LOGIN_REGISTER.REGISTER')}
                        </Button>
                    </Form>

                    {error !== '' && (
                        <Alert key='registerError' variant='danger' className='mt-2'>
                            {error}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default RegisterPage;
