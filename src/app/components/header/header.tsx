import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/**
 * Header component
 */
const HeaderComponent: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div key='headerComponent'>
            <Navbar collapseOnSelect bg='dark' variant='dark' expand='sm'>
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
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto' activeKey={window.location.pathname}>
                        <Nav.Link href={process.env.PUBLIC_URL + '/group'}>{t('HEADER.GROUPS')}</Nav.Link>
                        <Nav.Link href={process.env.PUBLIC_URL + '/label'}>{t('HEADER.LABELS')}</Nav.Link>
                        <Nav.Link href={process.env.PUBLIC_URL + '/expense'}>{t('HEADER.EXPENSES')} </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default HeaderComponent;
