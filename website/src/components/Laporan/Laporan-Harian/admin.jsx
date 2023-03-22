import React from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import "./laporan-harian.css";

function LaporanHarianAdmin () {
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
            <SubTitleComponent title="Laporan" subtitle="Laporan Harian"/>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>No. AHASS*</FormLabel>
                        <FormSelect aria-label="Pilih AHASS" onChange={autofill_nama_ahass}>
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
                            <FormLabel>Tanggal Awal*</FormLabel>
                            <FormControl type="date" placeholder="Tanggal" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Tanggal Akhir*</FormLabel>
                            <FormControl type="date" placeholder="Tanggal" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button  className="button-harian sm mx-auto w-100 mb-2" style={{backgroundColor:"#820000", border:"none"}}>Cari Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LaporanHarianAdmin;