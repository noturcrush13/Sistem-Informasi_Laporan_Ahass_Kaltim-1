import React from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import "./laporan-harian.css";

function LaporanHarianUser () {

    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Harian"/>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Tanggal*</FormLabel>
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

export default LaporanHarianUser;