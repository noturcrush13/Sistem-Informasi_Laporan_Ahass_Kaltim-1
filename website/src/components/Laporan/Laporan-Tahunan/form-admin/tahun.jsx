import React from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../laporan-tahunan.css";

function LaporanTahunanTahunAdmin () {

    const tahun = [
        {
            "no_tahun": "2020",
            "nama_tahun": "2020"
        },
        {
            "no_tahun": "2021",
            "nama_tahun": "2021"
        },
        {
            "no_tahun": "2022",
            "nama_tahun": "2022"
        },
        {
            "no_tahun": "2023",
            "nama_tahun": "2023"
        },
    ]


    return (
        <div >
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Tahun*</FormLabel>
                        <FormSelect >
                            <option>Pilih Tahun</option>    
                            { tahun.map(tahun => (
                                <option value={tahun.no_tahun} >{tahun.nama_tahun}</option>
                            ))}
                        </FormSelect>
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

export default LaporanTahunanTahunAdmin;