import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { loginWithFacebook } from '../../auth';
import { Redirect } from 'react-router';
import { FaFacebook } from 'react-icons/fa';
import RegisterPage from './register';
import LoginPage from './login';
import ForgotPage from './forgot';
import { ConfigurationManager } from '../../../configuration/manager';

/**
 * Login/Regiter page
 */
const LoginRegisterPage: React.FC = () => {
    const { from } = { from: { pathname: '/' } };

    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const handleFacebook = async () => {
        loginWithFacebook().then(() => {
            setRedirectToReferrer(true);
        });
    };

    const [config] = useState(ConfigurationManager.get());

    if (redirectToReferrer) {
        return <Redirect from='' to={from.pathname} />;
    }

    return (
        <div key='LoginRegisterPage'>
            <Row className='justify-content-center'>
                <Col className='pt-4'>
                    <div style={{ color: '#3b5998', cursor: 'pointer' }}>
                        <FaFacebook size={64} onClick={handleFacebook} />
                    </div>
                </Col>
            </Row>

            {config.enableLoginByEmail && (
                <>
                    <hr></hr>

                    <Row className='justify-content-center'>
                        <Col xs={12} sm={6}>
                            <LoginPage />
                        </Col>
                        <Col xs={12} sm={6}>
                            <RegisterPage />
                        </Col>
                    </Row>

                    <hr></hr>

                    <Row className='justify-content-center'>
                        <Col xs={12} sm={6}>
                            <ForgotPage />
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default LoginRegisterPage;
