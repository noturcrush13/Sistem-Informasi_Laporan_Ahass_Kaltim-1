import React, { useState, createContext } from 'react';

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import "./laporan-harian.css";

function LaporanHarianAdmin () {
    const [ahass, setAhass] = useState([]);

    const [noAhass, setNoAhass] = useState("");
    const [namaAhass, setNamaAhass] = useState("");
    const [tanggalAwal, setTanggalAwal] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");

    const token = localStorage.getItem("token");

    const getDealer = () => {
        Axios.get("http://localhost:3001/dealer/",{
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setAhass(response.data['data']);
        })
    }

    const autofill_nama_ahass = (e) => {
        const no_ahass = e.target.value;
        const nama_ahass = ahass.filter((item) => {
            return item.No_Ahass === no_ahass
        })
        document.getElementById("nama_ahass").value = nama_ahass[0].Nama_Ahass;
        setNoAhass(no_ahass);
        setNamaAhass(nama_ahass[0].Nama_Ahass);
    }

    const isEmpty = (e) => {
        e.preventDefault();
        if (noAhass === "" || namaAhass === "" || tanggalAwal === "" || tanggalAkhir === "") {
            alert("Mohon isi semua kolom");
            return false;
        }
        else {
            return true;
        }
    }

    const handleSubmit = (e) => {
        if (isEmpty(e)) {
            Axios.get(`http://localhost:3001/laporan/getlaporanharian/${noAhass}/${tanggalAwal}/${tanggalAkhir}`,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                    }
                    }).then((response) => {
                        console.log(response.data['data']);
                        if (response.data['data'].length === 0) {
                            alert("Data tidak ditemukan");
                        }
                        else {
                            alert("data ditemukan", response.data['data'])
                        }
                    })
        const query = `noAhass=${noAhass}&tanggalAwal=${tanggalAwal}&tanggalAkhir=${tanggalAkhir}`;
        window.location.href = "/admin/laporan/laporan-harian/hasil-data?" + query;
        }
    }

                

    return (
        getDealer(),
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Harian"/>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>No. AHASS*</FormLabel>
                        <FormSelect onChange={autofill_nama_ahass}>
                            <option>Pilih AHASS</option>
                            { 
                                ahass.map((item, index) => {
                                    return(
                                        <option value={item.No_Ahass}>{item.No_Ahass}</option>
                                    )
                                })
                            }
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
                            <FormControl 
                            type="date" 
                            placeholder="Tanggal"
                            onChange={(e) => {
                                setTanggalAwal(e.target.value);
                            }} 
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Tanggal Akhir*</FormLabel>
                            <FormControl 
                            type="date" 
                            placeholder="Tanggal"
                            onChange={(e) => {
                                setTanggalAkhir(e.target.value);
                            }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button 
                        className="button-harian sm mx-auto w-100 mb-2" 
                        style={{backgroundColor:"#820000", border:"none"}}
                        onClick={handleSubmit}
                        >Cari Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LaporanHarianAdmin;