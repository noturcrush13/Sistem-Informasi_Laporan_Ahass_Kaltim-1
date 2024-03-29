import React, { useState, useEffect } from "react";

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../dealer.css'



function BuatDealerAdmin () {

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

    const [noAhass, setNoAhass] = useState("")
    const [namaAhass, setNamaAhass] = useState("")
    const [alamatAhass, setAlamatAhass] = useState("")
    const [telepon, setTelepon] = useState("")
    const [gantikabupaten, setKabupaten] = useState([])
    const [gantikecamatan, setKecamatan] = useState([])
    const token = localStorage.getItem("token")


    const handleChangeKabupaten = (e) => {
        setKabupaten(e.target.value)
    }

    const handleChangeKecamatan = (e) => {
        setKecamatan(e.target.value)
    }

    const fillKecamatan = () => {
        let kecamatan = []
        for (let i = 0; i < kabupaten.length; i++) {
            if (kabupaten[i].nama_kabupaten === gantikabupaten) {
                kecamatan = kabupaten[i].kecamatan
            }
        }
        return kecamatan
    }

    const checkFormEmpty = () => {
        if (noAhass === "" || namaAhass === "" || alamatAhass === "" || telepon === "" || gantikabupaten === "" || gantikecamatan === "") {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            "No_Ahass": noAhass,
            "Nama_Ahass": namaAhass,
            "Alamat": alamatAhass,
            "Telepon": telepon,
            "Kabupaten": gantikabupaten,
            "Kecamatan": gantikecamatan
        }
        if (checkFormEmpty()) {
            alert("Data tidak boleh kosong")
        } else {
            Axios.post("https://backend-fix.glitch.me/dealer/create", data, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            },
            ).then((response) => {
                console.log("response awal", response.data)
                if(response.data.err){
                    alert("Gagal menambahkan data, No. AHASS sudah terdaftar")
                }else{
                    alert("Data berhasil ditambahkan")
                }
            })
            .catch ((err) => {
                alert("Gagal menambahkan data. "+ err['response']['data']['message'])
            })
        }
    }


    return (
        <div >
            <SubTitleComponent title="Dealer" subtitle="Buat Dealer Baru"/>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col md={12} className="">
                        <FormLabel>No. AHASS*</FormLabel>
                        <FormControl 
                        type="text" 
                        placeholder="No. AHASS" 
                        onChange={(e) => setNoAhass(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Nama AHASS*</FormLabel>
                            <FormControl 
                            type="text" 
                            placeholder="Nama AHASS" 
                            onChange={(e) => setNamaAhass(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Alamat*</FormLabel>
                            <FormControl 
                            type="text" 
                            placeholder="Alamat Dealer" 
                            onChange={(e) => setAlamatAhass(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Telepon*</FormLabel>
                            <FormControl 
                            type="number" 
                            placeholder="No. Telepon" 
                            onChange={(e) => setTelepon(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Kabupaten*</FormLabel>
                        <FormSelect onChange={handleChangeKabupaten}>
                            <option>Pilih Kabupaten</option>
                            { kabupaten.map(kabupaten => (
                                <option value={kabupaten.nama_kabupaten} >{kabupaten.nama_kabupaten}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Kecamatan*</FormLabel>
                        <FormSelect  onChange={handleChangeKecamatan}>
                            <option>Pilih Kecamatan</option>
                            { fillKecamatan().map(kecamatan => (
                                <option value={kecamatan.nama_kecamatan} >{kecamatan.nama_kecamatan}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button  className="button-dealer sm mx-auto w-100 mb-2" style={{backgroundColor:"#C71C15"}} onClick={handleSubmit}>Buat Dealer</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuatDealerAdmin;