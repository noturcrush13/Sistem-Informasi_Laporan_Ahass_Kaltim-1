import React, { useState, createContext, useEffect } from 'react';

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../../ranking.css";

function RankingTahunanTahunAdmin () {

    const [dataTahun, setDataTahun] = useState("")

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

    const token = localStorage.getItem("token");
    
    const autofill_tahun = (e) => {
        const tahun = e.target.value;
        setDataTahun(tahun);
    }

    const isEmpty = (e) => {
        if (dataTahun === "") {
            alert("Tahun tidak boleh kosong!");
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        if(isEmpty(e)) {
            Axios.get(`http://localhost:3001/laporan/rankingtahunanbytahun/${dataTahun}`, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                if(response.data['data'].length === 0) {
                    alert("Data Tidak Ditemukan!")
                }
                else {
                    alert("Data Ditemukan!")
                }
            })
            const query = `dataTahun=${dataTahun}`
            window.location.href = `/admin/ranking/ranking-tahunan/tahun/hasil-data/?` + query;
        }
    }


    return (
        <div >
            <Container fluid>
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
                        className="button-ranking sm mx-auto w-100 mb-2" 
                        style={{backgroundColor:"#820000", border:"none"}}
                        >Cari Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RankingTahunanTahunAdmin;