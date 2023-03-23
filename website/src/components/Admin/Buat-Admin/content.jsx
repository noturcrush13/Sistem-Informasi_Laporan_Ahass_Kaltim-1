import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../admin.css'



function BuatAdmin () {

    return (
        <div >
            <SubTitleComponent title="Admin" subtitle="Tambah Admin Baru"/>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Username*</FormLabel>
                            <FormControl type="text" placeholder="Username Anda" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Nama Depan*</FormLabel>
                            <FormControl type="text" placeholder="Nama Depan Anda" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Nama Belakang*</FormLabel>
                            <FormControl type="text" placeholder="Nama Belakang Anda" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Password*</FormLabel>
                            <FormControl type="password" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Konfirmasi Password*</FormLabel>
                            <FormControl type="password" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button  className="button-dealer sm mx-auto w-100 mb-2" style={{backgroundColor:"#820000", border:"none"}}>Tambah Admin</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuatAdmin;