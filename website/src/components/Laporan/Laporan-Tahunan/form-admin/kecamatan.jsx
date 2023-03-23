import React, { useState } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../laporan-tahunan.css";

function LaporanTahunanKecamatanAdmin () {

    const kabupaten = [
        {
            "no_kabupaten": "1",
            "nama_kabupaten": "Kabupaten 1",
            "kecamatan": [
                {
                    "no_kecamatan": "1",
                    "nama_kecamatan": "Kecamatan 1"
                },
                {
                    "no_kecamatan": "2",
                    "nama_kecamatan": "Kecamatan 2"
                },
                {
                    "no_kecamatan": "3",
                    "nama_kecamatan": "Kecamatan 3"
                },
                {
                    "no_kecamatan": "4",
                    "nama_kecamatan": "Kecamatan 4"
                },
            ]
        },
        {
            "no_kabupaten": "2",
            "nama_kabupaten": "Kabupaten 2",
            "kecamatan": [
                {
                    "no_kecamatan": "5",
                    "nama_kecamatan": "Kecamatan 5"
                },
                {
                    "no_kecamatan": "6",
                    "nama_kecamatan": "Kecamatan 6"
                },
                {
                    "no_kecamatan": "7",
                    "nama_kecamatan": "Kecamatan 7"
                },
                {
                    "no_kecamatan": "8",
                    "nama_kecamatan": "Kecamatan 8"
                },
            ]
        },
        {
            "no_kabupaten": "3",
            "nama_kabupaten": "Kabupaten 3",
            "kecamatan": [
                {
                    "no_kecamatan": "9",
                    "nama_kecamatan": "Kecamatan 9"
                },
                {
                    "no_kecamatan": "10",
                    "nama_kecamatan": "Kecamatan 10"
                },
                {
                    "no_kecamatan": "11",
                    "nama_kecamatan": "Kecamatan 11"
                },
                {
                    "no_kecamatan": "12",
                    "nama_kecamatan": "Kecamatan 12"
                },
            ]
        },
        {
            "no_kabupaten": "4",
            "nama_kabupaten": "Kabupaten 4",
            "kecamatan": [
                {
                    "no_kecamatan": "13",
                    "nama_kecamatan": "Kecamatan 13"
                },
                {
                    "no_kecamatan": "14",
                    "nama_kecamatan": "Kecamatan 14"
                },
                {
                    "no_kecamatan": "15",
                    "nama_kecamatan": "Kecamatan 15"
                },
                {
                    "no_kecamatan": "16",
                    "nama_kecamatan": "Kecamatan 16"
                },
            ]
        },
        {
            "no_kabupaten": "5",
            "nama_kabupaten": "Kabupaten 5",
            "kecamatan": [
                {
                    "no_kecamatan": "17",
                    "nama_kecamatan": "Kecamatan 17"
                },
                {
                    "no_kecamatan": "18",
                    "nama_kecamatan": "Kecamatan 18"
                },
                {
                    "no_kecamatan": "19",
                    "nama_kecamatan": "Kecamatan 19"
                },
                {
                    "no_kecamatan": "20",
                    "nama_kecamatan": "Kecamatan 20"
                },
            ]
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

    const [gantikabupaten, setKabupaten] = useState([])

    const handleChangeKabupaten = (e) => {
        setKabupaten(e.target.value)
    }

    const fillKecamatan = () => {
        let kecamatan = []
        for (let i = 0; i < kabupaten.length; i++) {
            if (kabupaten[i].no_kabupaten === gantikabupaten) {
                kecamatan = kabupaten[i].kecamatan
            }
        }
        return kecamatan
    }

    return (
        <div >
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Kabupaten*</FormLabel>
                        <FormSelect onChange={handleChangeKabupaten}>
                            <option>Pilih Kabupaten</option>
                            { kabupaten.map(kabupaten => (
                                <option value={kabupaten.no_kabupaten} >{kabupaten.nama_kabupaten}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Kecamatan*</FormLabel>
                        <FormSelect >
                            <option>Pilih Kecamatan</option>
                            { fillKecamatan().map(kecamatan => (
                                <option value={kecamatan.no_kecamatan} >{kecamatan.nama_kecamatan}</option>
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

export default LaporanTahunanKecamatanAdmin;