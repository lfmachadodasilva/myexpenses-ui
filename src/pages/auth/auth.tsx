import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { createGlobalStyle } from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { Routes } from '../routes';
import { loginWithEmail, loginWithFacebook } from '../../services/auth';
import { ErrorComponent } from '../../components/error/error';

const AuthStyle = createGlobalStyle``;

export type AuthProps = {};

export const AuthPage: React.FC<AuthProps> = React.memo((props: AuthProps) => {
    const [t] = useTranslation();
    const history = useHistory();

    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleFacebook = React.useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            await loginWithFacebook();
            setTimeout(() => history.push(Routes.home));
        } catch (error) {
            setError(t('AUTH.ERROR'));
        } finally {
            setLoading(false);
        }
    }, [history, t]);

    const handleChangeEmail = React.useCallback((value: any) => {
        setEmail(value.target.value);
    }, []);
    const handleChangePassword = React.useCallback((value: any) => {
        setPassword(value.target.value);
    }, []);

    const handleLogin = React.useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            await loginWithEmail(email, password);
            setTimeout(() => history.push(Routes.home));
        } catch {
            setError(t('AUTH.ERROR'));
        } finally {
            setLoading(false);
        }
    }, [email, password, history, t]);

    return (
        <>
            <AuthStyle />
            <Container className="p-4">
                <ErrorComponent message={error} />
                <Row>
                    <Col className="p-1" xs={12} sm={6}>
                        <Card className="p-4">
                            <Card.Title>{t('AUTH.BY_FACEBOOK')}</Card.Title>
                            <Card.Body>
                                <Button onClick={handleFacebook}>{t('AUTH.FACEBOOK')}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="p-1" xs={12} sm={6}>
                        <Card className="p-4">
                            <Card.Title>{t('AUTH.BY_EMAIL')}</Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>{t('AUTH.EMAIL')}</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder={t('AUTH.EMAIL_PLACEHOLDER')}
                                            onChange={handleChangeEmail}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>{t('AUTH.PASSWORD')}</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder={t('AUTH.PASSWORD_PLACEHOLDER')}
                                            onChange={handleChangePassword}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleLogin} disabled={isLoading}>
                                        {t('AUTH.LOGIN')}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
});
