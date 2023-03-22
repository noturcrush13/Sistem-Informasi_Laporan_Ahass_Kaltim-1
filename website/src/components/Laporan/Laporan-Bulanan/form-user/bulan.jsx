import React from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../laporan-bulanan.css";

function LaporanBulananBulanUser () {

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
        document.getElementById("daftar_ahass").value = nama_ahass;
    }

    const bulan = [
        {
            "no_bulan": "1",
            "nama_bulan": "Januari"
        },
        {
            "no_bulan": "2",
            "nama_bulan": "Februari"
        },
        {
            "no_bulan": "3",
            "nama_bulan": "Maret"
        },
        {
            "no_bulan": "4",
            "nama_bulan": "April"
        },
        {
            "no_bulan": "5",
            "nama_bulan": "Mei"
        },
        {
            "no_bulan": "6",
            "nama_bulan": "Juni"
        },
        {
            "no_bulan": "7",
            "nama_bulan": "Juli"
        },
        {
            "no_bulan": "8",
            "nama_bulan": "Agustus"
        },
        {
            "no_bulan": "9",
            "nama_bulan": "September"
        },
        {
            "no_bulan": "10",
            "nama_bulan": "Oktober"
        },
        {
            "no_bulan": "11",
            "nama_bulan": "November"
        },
        {
            "no_bulan": "12",
            "nama_bulan": "Desember"
        },
    ]

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
                            <FormControl type="text" placeholder="Nama AHASS" id="daftar_ahass" disabled/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Bulan*</FormLabel>
                        <FormSelect >
                            <option>Pilih Bulan</option>    
                            { bulan.map(bulan => (
                                <option value={bulan.no_bulan} >{bulan.nama_bulan}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
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

export default LaporanBulananBulanUser;