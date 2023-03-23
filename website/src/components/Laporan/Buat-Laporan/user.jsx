import React from "react";

import {Container, Row, Col, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import "./buat-laporan.css";

function BuatLaporanUser () {
    return (
        <div >
            {/* <Container>
                <p className="laporan-title">Laporan</p>
                <p className="laporan-subtitle">Buat Laporan Harian Baru</p>
                <hr className="underline-subtitle"/>
            </Container> */}
            <SubTitleComponent title="Laporan" subtitle="Buat Laporan Harian Baru"/>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Tanggal*</FormLabel>
                            <FormControl type="date" placeholder="Tanggal" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>User Entry*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>KPB 1*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Mekanik*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>KPB 2*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Heavy Repair*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>KPB 3*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Job Return*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>KPB 4*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Jumlah UE By Service Visit*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Claim*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Other Job*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Service Lengkap*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Jumlah UE By Pit Express*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Service Ringan*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Pendapatan Jasa*</FormLabel>
                            <InputGroup>
                                <InputGroup.Text>Rp.</InputGroup.Text>
                                <FormControl type="number" placeholder="" id="inlineFormInputGroup"/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Ganti Oli*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Penjualan Part*</FormLabel>
                            <InputGroup>
                                <InputGroup.Text>Rp.</InputGroup.Text>
                                <FormControl type="number" placeholder="" id="inlineFormInputGroup"/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Light Repair*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Penjualan Oli*</FormLabel>
                            <InputGroup>
                                <InputGroup.Text>Rp.</InputGroup.Text>
                                <FormControl type="number" placeholder="" id="inlineFormInputGroup"/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={6} className="">
                        <FormGroup>
                            <FormLabel>Jumlah UE By Reminder*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6} className="">
                       <FormGroup>
                            <FormLabel>Jumlah UE By AHASS Event*</FormLabel>
                            <FormControl type="number" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button  className="button-form sm mx-auto w-100 mb-2" style={{backgroundColor:"#820000", border:"none"}}>Kumpul Laporan Harian</Button>
                    </Col>
                    <Col md={10}>
                        <Button className="button-form sm mx-auto w-100 mb-5" style={{backgroundColor:"white", border:"2px solid #820000", color:"#820000",}}>Reset</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuatLaporanUser;