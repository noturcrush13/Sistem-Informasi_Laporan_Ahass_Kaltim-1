import React from "react";

import {Container, Nav, Navbar, NavDropdown, Image} from "react-bootstrap";

import Logo from "../../assets/img/Logo-Astra-Putih.png";

function Header() {
    return (
        <Navbar bg="white" expand="lg" className="w-50">
            <Container>
                <Navbar.Brand href="#home">
                    <Image src={Logo} alt="Logo Astra" />
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;