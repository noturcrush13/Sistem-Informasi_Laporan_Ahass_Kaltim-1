import React, { useState, createContext } from 'react';

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import "./laporan-harian.css";

function LaporanHarianUser () {
    const [tanggal, setTanggal] = useState("");

    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");

    const isEmpty = (e) => {
        e.preventDefault();
        if (tanggal === "") {
            alert("Mohon isi semua kolom");
            return false;
        }
        else {
            return true;
        }
    }

    const handleSubmit = (e) => {
        if (isEmpty(e)) {
            Axios.get(`https://backend-fix.glitch.me/laporan/getlaporanharianuser/${tanggal}`,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then((response) => {
                console.log(response.data['data']);
                if (response.data['data'].length === 0) {
                    alert("Data tidak ditemukan");
                }
                else {
                    alert("Data ditemukan");
                    const query = `&tanggal=${tanggal}`;
                    window.location.href = `/user/laporan/laporan-harian/hasil-data?` + query;
                }
            })
        }
    }


    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Harian"/>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Tanggal*</FormLabel>
                            <FormControl 
                            type="date" 
                            placeholder="Tanggal"
                            onChange={(e) => {
                                setTanggal(e.target.value);
                            }} 
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button 
                        onClick={handleSubmit} 
                        className="button-harian sm mx-auto w-100 mb-2"
                        style={{backgroundColor:"#C71C15"}}
                         >Cari Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LaporanHarianUser;