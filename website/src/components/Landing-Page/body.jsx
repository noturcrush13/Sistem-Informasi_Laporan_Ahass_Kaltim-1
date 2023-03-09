import React from "react";

import {Container, Row, Col, Image} from "react-bootstrap";

import "./style.css"

import LandingImage from "../../assets/img/Landing-Page-Image.png";

function Body() {
    return (
        <Container>
            <Row>
                <Col md={6} className="content">
                    <Col md={12} className="title">
                        <p>Sistem Informasi Laporan AHASS Kaltim 1</p>
                    </Col>
                    <Col md={11} className="description">
                        <p>Lorem ipsum dolor sit amet. Et repudiandae maiores eos assumenda iure ut distinctio expedita aut accusamus odio. Ut minus facilis eum voluptatum quia et tempora tenetur. Est facilis omnis sed quasi distinctio rem doloribus repellendus est voluptates iste.</p>
                    </Col>
                    <Col md={12} className="">
                        <button className="btn btn-secondary button">Login</button>
                    </Col>
                </Col>
                <Col md={6} className="image">
                    <Image src={LandingImage}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Body;