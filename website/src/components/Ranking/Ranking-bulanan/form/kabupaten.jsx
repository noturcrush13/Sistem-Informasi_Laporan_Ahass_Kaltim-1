import React, { useState } from "react";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../../ranking.css";
import Axios from "axios";

function RankingBulananKabupatenAdmin () {

    const [dataBulan, setDataBulan] = useState("");
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
        setDataTahun(e.target.value)
    }

    const autofill_bulan = (e) => {
        setDataBulan(e.target.value)
    }

    const autofill_kabupaten = (e) => {
        setDataKabupaten(e.target.value)
    }

    const isEmpty = (e) => {
        if(dataTahun === "" || dataBulan === "" || dataKabupaten === ""){
            alert("Data tidak boleh kosong")
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        if(isEmpty(e)){
            Axios.get(`https://backend-fix.glitch.me/laporan/rankingbulananbykabupaten/${dataBulan}/${dataTahun}/${dataKabupaten}`, {
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
            const query = `dataBulan=${dataBulan}&dataTahun=${dataTahun}&dataKabupaten=${dataKabupaten}`
            window.location.href = `/admin/ranking/ranking-bulanan/kabupaten/hasil-data/?` + query
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
                        style={{backgroundColor:"#C71C15"}}
                        >Cari Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RankingBulananKabupatenAdmin;