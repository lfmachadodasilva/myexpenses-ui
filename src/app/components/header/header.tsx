import React, { useContext, useMemo, useCallback } from 'react';
import { Navbar, Nav, Image, Container, Row, Spinner, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { userContext } from '../../contexts/user-context';
import { MyRoute } from '../../route';

/**
 * Header component
 */
const HeaderComponent: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useContext(userContext);
    const history = useHistory();

    const { hasUser, displayName, email, photo } = useMemo(() => {
        const hasUser = user !== null;
        return {
            hasUser: hasUser,
            displayName: hasUser
                ? user.displayName && user.displayName.length > 0
                    ? user.displayName.split(' ')[0]
                    : user.email.split('@')[0]
                : '',
            email: hasUser ? user.email : '',
            photo:
                hasUser && user.photoURL ? (
                    <Image
                        className='mr-1 justify-content-center'
                        src={user.photoURL}
                        height={32}
                        width={32}
                        roundedCircle
                    />
                ) : (
                    <FaUserAlt className='mr-1' height={32} width={32} />
                )
        };
    }, [user]);

    const handleOnClickHome = () => {
        history.push(MyRoute.HOME);
    };
    const handleOnClickGroup = () => {
        history.push(MyRoute.GROUP);
    };
    const handleOnClickLabel = () => {
        history.push(MyRoute.LABEL);
    };
    const handleOnClickExpense = () => {
        history.push(MyRoute.EXPENSE);
    };
    const handleOnClickLogout = () => {
        history.push(MyRoute.LOGOUT);
    };
    const handleOnClickLoginRegister = () => {
        history.push(MyRoute.LOGIN_REGISTER);
    };

    const showToolTip = useCallback(() => {
        return (
            <Popover id='popover-basic'>
                <Popover.Title as='h6'>{displayName}</Popover.Title>
                <Popover.Content>
                    <div className='d-flex justify-content-around align-items-center'>
                        {photo}
                        <h6 className='m-0'>{email}</h6>
                    </div>
                </Popover.Content>
            </Popover>
        );
    }, [displayName, photo, email]);

    return (
        <div key='headerComponent'>
            <Navbar collapseOnSelect bg='dark' variant='dark' expand='sm'>
                <Container>
                    <Navbar.Brand onClick={handleOnClickHome} style={{ cursor: 'pointer' }}>
                        <img
                            src={process.env.PUBLIC_URL + '/logo.svg'}
                            width='30'
                            height='30'
                            className='d-inline-block align-top mr-2'
                            alt='MyExpenses logo'
                        />
                        {t('HEADER.BRAND')}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />

                    {hasUser && (
                        <>
                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Nav>
                                    <Nav.Link onClick={handleOnClickGroup}>{t('HEADER.GROUPS')}</Nav.Link>
                                    <Nav.Link onClick={handleOnClickLabel}>{t('HEADER.LABELS')}</Nav.Link>
                                    <Nav.Link onClick={handleOnClickExpense}>{t('HEADER.EXPENSES')} </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                                <Nav>
                                    <OverlayTrigger key='overlaytrigger' placement='bottom' overlay={showToolTip()}>
                                        <div className='d-flex align-items-center'>{photo}</div>
                                    </OverlayTrigger>

                                    <Nav.Link onClick={handleOnClickLogout}>{t('HEADER.LOGOUT')}</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </>
                    )}

                    {!hasUser && (
                        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                            <Nav>
                                <Nav.Link onClick={handleOnClickLoginRegister}>{t('HEADER.LOGIN_REGISTER')}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    )}
                </Container>
            </Navbar>
        </div>
    );
};

export default HeaderComponent;

/**
 * Header component
 */
export const HeaderSimpleComponent: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div key='headerComponent'>
            <Navbar collapseOnSelect bg='dark' variant='dark' expand='sm'>
                <Container>
                    <Navbar.Brand style={{ cursor: 'pointer' }}>
                        <img
                            src={process.env.PUBLIC_URL + '/logo.svg'}
                            width='30'
                            height='30'
                            className='d-inline-block align-top'
                            alt='MyExpenses logo'
                        />{' '}
                        {t('HEADER.BRAND')}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                </Container>
            </Navbar>
            <Container>
                <Row className='m-4'>
                    <Col style={{ textAlign: 'center' }}>
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
