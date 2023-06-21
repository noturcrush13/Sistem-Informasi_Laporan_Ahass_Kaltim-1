import React, { useState } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../../ranking.css";
import Axios from "axios";

function RankingTahunanKabupatenAdmin () {

    const [dataTahun, setDataTahun] = useState("");
    const [dataKabupaten, setDataKabupaten] = useState("");

    const kabupaten = [
        {
            "no_kabupaten": "1",
            "nama_kabupaten": "Balikpapan"
        },
        {
            "no_kabupaten": "2",
            "nama_kabupaten": "Penajam Paser Utara"
        },
        {
            "no_kabupaten": "3",
            "nama_kabupaten": "Paser"
        },
        {
            "no_kabupaten": "4",
            "nama_kabupaten": "Berau"
        },
        {
            "no_kabupaten": "5",
            "nama_kabupaten": "Bulungan"
        },
        {
            "no_kabupaten": "6",
            "nama_kabupaten": "Tarakan"
        },
        {
            "no_kabupaten": "7",
            "nama_kabupaten": "Nunukan"
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

    const token = localStorage.getItem('token')

    const autofill_tahun = (e) => {
        setDataTahun(e.target.value)
    }

    const autofill_kabupaten = (e) => {
        setDataKabupaten(e.target.value)
    }

    const isEmpty = (e) => {
        if(dataTahun === "" || dataKabupaten === ""){
            alert("Data tidak boleh kosong")
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        if(isEmpty(e)){
            Axios.get(`https://backend-fix.glitch.me/laporan/rankingtahunanbykabupaten/${dataTahun}/${dataKabupaten}`, {
                headers: {
                   "Authorization": `Bearer ${token}`
                }
            }).then(response => {
                if(response.data['data'].length === 0) {
                    alert("Data Tidak Ditemukan!")
                }
                else {
                    alert("Data Ditemukan!")
                    console.log(response.data['data'])
                }
            })
            const query = `dataTahun=${dataTahun}&dataKabupaten=${dataKabupaten}`
            window.location.href = `/admin/ranking/ranking-tahunan/kabupaten/hasil-data/?` + query
        }
    }


    return (
        <div >
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center my-2">
                    <Col md={12} className="">
                        <FormLabel>Kabupaten*</FormLabel>
                        <FormSelect onChange={autofill_kabupaten}>
                            <option>Pilih Kabupaten</option>    
                            { kabupaten.map(kabupaten => (
                                <option value={kabupaten.nama_kabupaten} >{kabupaten.nama_kabupaten}</option>
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
                        style={{backgroundColor:"#C71C15"}}
                        >Cari Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RankingTahunanKabupatenAdmin;