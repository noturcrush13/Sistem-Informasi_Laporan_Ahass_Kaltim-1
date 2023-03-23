import React, { useState, useEffect } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../user.css'



function BuatUserAdmin () {

    const data_ahass = [ 
        {
            "no_ahass": "1",
            "nama_ahass": "Ahass 1"
        },
        {
            "no_ahass": "2",
            "nama_ahass": "Ahass 2"
        },
        {
            "no_ahass": "3",
            "nama_ahass": "Ahass 3"
        },
        {
            "no_ahass": "4",
            "nama_ahass": "Ahass 4"
        },
        {
            "no_ahass": "5",
            "nama_ahass": "Ahass 5"
        },
    ]


    const autofill_nama_ahass = (e) => {
        const no_ahass = e.target.value;
        const nama_ahass = data_ahass.find(ahass => ahass.no_ahass === no_ahass).nama_ahass;
        document.getElementById("nama_ahass").value = nama_ahass;
    }
    return (
        <div >
            <SubTitleComponent title="User" subtitle="Buat User Baru"/>
            <Container fluid>
            <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>No. AHASS*</FormLabel>
                        <FormSelect onChange={autofill_nama_ahass}>
                            <option>Pilih AHASS</option>
                            { data_ahass.map(ahass => (
                                <option value={ahass.no_ahass} >{ahass.no_ahass}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>  
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Nama AHASS*</FormLabel>
                            <FormControl type="text" placeholder="Nama AHASS" id="nama_ahass" disabled/>
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
                            <FormLabel>Username*</FormLabel>
                            <FormControl type="text" placeholder="Username Anda" />
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
                        <Button  className="button-dealer sm mx-auto w-100 mb-2" style={{backgroundColor:"#820000", border:"none"}}>Buat User</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuatUserAdmin;