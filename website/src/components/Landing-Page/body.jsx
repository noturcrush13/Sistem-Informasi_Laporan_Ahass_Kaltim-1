import React from "react";

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import "./style.css"

import LandingImage from "../../assets/img/Landing-Page-Image.png";

import LoginPage from "../../pages/Login-Page/Admin";

import { useNavigate } from "react-router-dom";

const Body = (props) => {

    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <Col md={6} className="content">
                    <Col md={12} className="title-landing">
                        <p>Sistem Informasi Laporan AHASS Kaltim 1</p>
                    </Col>
                    <Col md={11} className="description">
                        <p>Lorem ipsum dolor sit amet. Et repudiandae maiores eos assumenda iure ut distinctio expedita aut accusamus odio. Ut minus facilis eum voluptatum quia et tempora tenetur. Est facilis omnis sed quasi distinctio rem doloribus repellendus est voluptates iste.</p>
                    </Col>
                    <Col md={12} className="">
                        <button onClick={() => navigate("/admin/login")} className="btn btn-secondary button">Login Sebagai Admin</button>
                        <button onClick={() => navigate("/user/login")} className="btn btn-secondary button" style={{color:"#C71C15", backgroundColor:"white", border:"1px solid #820000"}}>Login Sebagai User</button>
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