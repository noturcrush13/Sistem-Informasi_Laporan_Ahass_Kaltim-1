import React from "react";

import Background from "../../assets/img/Background-Login.png";

import {Container, Row, Col, Image} from "react-bootstrap";

import "./style.css"

function Content() {

    const styles = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover !important',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
    };

    return (
        <Container fluid style={styles}>
            <Row>
                <Col md={12} className="title">
                    <p>Sistem Informasi Laporan AHASS Kaltim 1</p>
                </Col>
            </Row>
        </Container>
    );
                    
}

export default Content;