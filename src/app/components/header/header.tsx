import React from "react";
import { Navbar, Nav } from "react-bootstrap";

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
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
        <Navbar.Brand href="#home">MyExpenses</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Groups</Nav.Link>
            <Nav.Link href="#link">Labels</Nav.Link>
            <Nav.Link href="#link">Expenses</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
