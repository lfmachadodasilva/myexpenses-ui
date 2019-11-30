import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Trans } from 'react-i18next';

export interface HeaderProps {}
export interface HeaderState {}

/**
 * Header component
 */
export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <Navbar collapseOnSelect bg='dark' variant='dark' expand='sm'>
                <Navbar.Brand href={process.env.PUBLIC_URL + '/'}>
                    <Trans>HEADER.BRAND</Trans>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href={process.env.PUBLIC_URL + '/group'}>
                            <Trans count={5}>HEADER.GROUPS</Trans>
                        </Nav.Link>
                        <Nav.Link href={process.env.PUBLIC_URL + '/label'}>
                            <Trans>HEADER.LABELS</Trans>
                        </Nav.Link>
                        <Nav.Link href={process.env.PUBLIC_URL + '/expense'}>
                            <Trans>HEADER.EXPENSES</Trans>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
