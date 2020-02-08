import React, { useContext, useMemo } from 'react';
import { Navbar, Nav, Image, Container, Row, Spinner, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { userContext } from '../../contexts/user-context';
import { useHistory } from 'react-router-dom';
import { MyRoute } from '../../route';

/**
 * Header component
 */
const HeaderComponent: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useContext(userContext);
    const history = useHistory();

    const { hasUser, displayName, photoURL } = useMemo(() => {
        const hasUser = user !== null;
        return {
            hasUser: hasUser,
            displayName: hasUser
                ? user.displayName && user.displayName.length > 0
                    ? user.displayName.split(' ')[0]
                    : user.email
                : '',
            photoURL: hasUser && user.photoURL ? user.photoURL : null
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

    return (
        <div key='headerComponent'>
            <Navbar collapseOnSelect bg='dark' variant='dark' expand='sm'>
                <Container>
                    <Navbar.Brand onClick={handleOnClickHome} style={{ cursor: 'pointer' }}>
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
                                    {photoURL && (
                                        <Image
                                            className='m-1 justify-content-center'
                                            src={photoURL}
                                            height={32}
                                            width={32}
                                            roundedCircle
                                        />
                                    )}
                                    {photoURL && photoURL.length === 0 && <Navbar.Text>{displayName}</Navbar.Text>}
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
