import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../pages/routes';
import { userContext } from '../../contexts/user';
import { hasValue } from '../../helpers/util';
import { signOut } from '../../services/auth';
import { getUserDisplayName } from '../../helpers/user';

const HeaderStyle = createGlobalStyle`
        .navbar-brand {
            cursor: pointer;
        };
    `;

export type HeaderProps = {};

export const HeaderComponent: React.FC<HeaderProps> = React.memo((props: HeaderProps) => {
    const { user, initialising } = useContext(userContext);
    const history = useHistory();
    const [t] = useTranslation();

    const handleRedirectTo = React.useCallback(
        (path: string) => {
            if (hasValue(history.location.search)) {
                history.push({ pathname: path, search: history.location.search });
            } else {
                history.push(path);
            }
        },
        [history]
    );

    const handleLogout = React.useCallback(async () => {
        await signOut();
        setTimeout(() => history.push(Routes.home));
    }, [history]);

    const authElement = React.useMemo(() => {
        if (hasValue(user)) {
            const displayName = getUserDisplayName(user as firebase.User);
            return (
                <Nav>
                    <NavDropdown title={displayName} id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={() => handleRedirectTo(Routes.settings)}>
                            {t('HEADER.SETTINGS')}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>{t('HEADER.LOGOUT')}</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            );
        }

        return (
            <Nav>
                <Nav.Link onClick={() => handleRedirectTo(Routes.auth)}>{t('HEADER.LOGIN')}</Nav.Link>
            </Nav>
        );
    }, [user, handleRedirectTo, handleLogout, t]);

    return (
        <>
            <HeaderStyle />
            <Navbar bg="dark" variant="dark" expand="sm">
                <Container>
                    <Navbar.Brand onClick={() => handleRedirectTo(Routes.home)}>{t('HEADER.TITLE')}</Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav" className="mr-auto ">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => handleRedirectTo(Routes.group)}>{t('HEADER.GROUP')}</Nav.Link>
                            <Nav.Link onClick={() => handleRedirectTo(Routes.label)}>{t('HEADER.LABEL')}</Nav.Link>
                            <Nav.Link onClick={() => handleRedirectTo(Routes.expense)}>{t('HEADER.EXPENSE')}</Nav.Link>
                        </Nav>
                        {!initialising && authElement}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
});
