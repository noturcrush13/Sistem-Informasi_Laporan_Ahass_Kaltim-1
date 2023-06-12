import React, { useState, createContext, useEffect } from 'react';

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../../ranking.css";

function RankingBulananBulanAdmin () {

    const [dataBulan, setDataBulan] = useState("");
    const [dataTahun, setDataTahun] = useState("");

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

    const token = localStorage.getItem('token')

    const autofill_tahun = (e) => {
        const tahun = e.target.value;
        setDataTahun(tahun);
    }

    const autofill_bulan = (e) => {
        const bulan = e.target.value;
        setDataBulan(bulan);
    }

    const isEmpty = (e) => {
        e.preventDefault();
        if (dataBulan === "" || dataTahun === "") {
            alert("Data Bulan dan Tahun Harus Diisi!")
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        if(isEmpty(e)) {
            Axios.get(`http://localhost:3001/laporan/rankingbulananbybulan/${dataBulan}/${dataTahun}`, {
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
            const query = `dataBulan=${dataBulan}&dataTahun=${dataTahun}`
            window.location.href = `/admin/ranking/ranking-bulanan/bulan/hasil-data/?` + query;
        }
        // console.log("ini list no ahass", noAhass)
    }

    return (
        <div >
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Bulan*</FormLabel>
                        <FormSelect onChange={autofill_bulan}>
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

export default RankingBulananBulanAdmin;