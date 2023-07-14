import React, { useState } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../laporan-tahunan.css";
import Axios from "axios";

function LaporanTahunanKecamatanAdmin () {

    const [dataTahun, setDataTahun] = useState("");
    const [dataKecamatan, setDataKecamatan] = useState("");

    const kabupaten = [
        {
            "no_kabupaten": "1",
            "nama_kabupaten": "Balikpapan",
            "kecamatan": [
                {
                    "no_kecamatan": "1",
                    "nama_kecamatan": "Balikpapan Tengah"
                },
                {
                    "no_kecamatan": "2",
                    "nama_kecamatan": "Balikpapan Kota"
                },
                {
                    "no_kecamatan": "3",
                    "nama_kecamatan": "Balikpapan Barat"
                },
                {
                    "no_kecamatan": "4",
                    "nama_kecamatan": "Balikpapan Timur"
                },
                {
                    "no_kecamatan": "5",
                    "nama_kecamatan": "Balikpapan Selatan"
                },
                {
                    "no_kecamatan": "6",
                    "nama_kecamatan": "Balikpapan Utara"
                }
            ]
        },
        {
            "no_kabupaten": "2",
            "nama_kabupaten": "Penajam Paser Utara",
            "kecamatan": [
                {
                    "no_kecamatan": "7",
                    "nama_kecamatan": "Penajam"
                },
                {
                    "no_kecamatan": "8",
                    "nama_kecamatan": "Sepaku"
                },
            ]
        },
        {
            "no_kabupaten": "3",
            "nama_kabupaten": "Paser",
            "kecamatan": [
                {
                    "no_kecamatan": "9",
                    "nama_kecamatan": "Tanah Grogot"
                },
                {
                    "no_kecamatan": "10",
                    "nama_kecamatan": "Long Ikis"
                },
            ]
        },
        {
            "no_kabupaten": "4",
            "nama_kabupaten": "Berau",
            "kecamatan": [
                {
                    "no_kecamatan": "11",
                    "nama_kecamatan": "Tanjung Redeb"
                },
            ]
        },
        {
            "no_kabupaten": "5",
            "nama_kabupaten": "Bulungan",
            "kecamatan": [
                {
                    "no_kecamatan": "12",
                    "nama_kecamatan": "Tanjung Selor"
                },
            ]
        },
        {
            "no_kabupaten": "6",
            "nama_kabupaten": "Tarakan",
            "kecamatan": [
                {
                    "no_kecamatan": "13",
                    "nama_kecamatan": "Tarakan Tengah"
                },
                {
                    "no_kecamatan": "14",
                    "nama_kecamatan": "Tarakan Barat"
                }
            ]
        },
        {
            "no_kabupaten": "7",
            "nama_kabupaten": "Nunukan",
            "kecamatan": [
                {
                    "no_kecamatan": "15",
                    "nama_kecamatan": "Nunukan"
                },
            ]
        }
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

    const token = localStorage.getItem('token')

    const autofill_tahun = (e) => {
        setDataTahun(e.target.value)
    }

    const autofill_kecamatan = (e) => {
        setDataKecamatan(e.target.value)
    }

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

    const isEmpty = (e) => {
        if (dataTahun === "" || dataKecamatan === "") {
            alert("Data tidak boleh kosong")
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        if(isEmpty(e)){
            Axios.get(`https://backend-fix.glitch.me/laporan/getrekaplaporantahunankecamatan/${dataTahun}/${dataKecamatan}`, {
                headers: {
                   "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                if(response.data['data'].length === 0) {
                    alert("Data Tidak Ditemukan!")
                }
                else {
                    alert("Data Ditemukan!")
                }
            })
            const query = `dataTahun=${dataTahun}&dataKecamatan=${dataKecamatan}`
            // alert(query)
            window.location.href = `/admin/laporan/laporan-tahunan/kecamatan/hasil-data/?` + query
        }
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
                        <FormSelect onChange={autofill_kecamatan}>
                            <option>Pilih Kecamatan</option>
                            { fillKecamatan().map(kecamatan => (
                                <option value={kecamatan.nama_kecamatan} >{kecamatan.nama_kecamatan}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Tahun*</FormLabel>
                        <FormSelect onChange={autofill_tahun}>
                            <option>Pilih Tahun</option>    
                            { tahun.map(tahun => (
                                <option value={tahun.no_tahun} >{tahun.nama_tahun}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button onClick={handleSubmit} 
                        className="button-harian sm mx-auto w-100 mb-2" 
                        style={{backgroundColor:"#C71C15"}}
                        >Cari Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LaporanTahunanKecamatanAdmin;