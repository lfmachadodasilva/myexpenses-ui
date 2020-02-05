import React, { useContext, useMemo } from 'react';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { userContext } from '../../contexts/user-context';
import { useHistory } from 'react-router-dom';

/**
 * Header component
 */
const HeaderComponent: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useContext(userContext);

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

    return (
        <div key='headerComponent'>
            <Navbar collapseOnSelect bg='dark' variant='dark' expand='sm'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Brand href={process.env.PUBLIC_URL + '/'}>
                    <img
                        src={process.env.PUBLIC_URL + '/logo.svg'}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt='MyExpenses logo'
                    />{' '}
                    {t('HEADER.BRAND')}
                </Navbar.Brand>

                {hasUser && (
                    <>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav>
                                <Nav.Link href={process.env.PUBLIC_URL + '/group'}>{t('HEADER.GROUPS')}</Nav.Link>
                                <Nav.Link href={process.env.PUBLIC_URL + '/label'}>{t('HEADER.LABELS')}</Nav.Link>
                                <Nav.Link href={process.env.PUBLIC_URL + '/expense'}>{t('HEADER.EXPENSES')} </Nav.Link>
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
                                {photoURL.length === 0 && <Navbar.Text>{displayName}</Navbar.Text>}
                                <Nav.Link href={process.env.PUBLIC_URL + '/logout'}>{t('HEADER.LOGOUT')}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )}

                {!hasUser && (
                    <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                        <Nav>
                            <Button
                                    onClick={() => {
                                        history.push('/login-register');
                                    }}
                                >
                                    Logout 1
                                </Button>
                            <Button
                                    onClick={() => {
                                        history.push(process.env.PUBLIC_URL + '/login-register');
                                    }}
                                >
                                    Logout 2
                                </Button>
                            <Nav.Link href={process.env.PUBLIC_URL + '/login-register'}>
                                {t('HEADER.LOGIN_REGISTER')}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                )}
            </Navbar>
        </div>
    );
};

export default HeaderComponent;
