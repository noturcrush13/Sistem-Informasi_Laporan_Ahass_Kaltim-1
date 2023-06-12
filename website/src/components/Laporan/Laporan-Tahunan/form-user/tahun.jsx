import React, { useState, createContext, useEffect } from 'react';

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "../laporan-tahunan.css";

function LaporanTahunanTahunUser () {
    const [ahass, setAhass] = useState([]);
    const [noAhass, setNoAhass] = useState("");
    const [nama_ahass, setNamaAhass] = useState("");
    const [dataTahun, setDataTahun] = useState("");


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

    useEffect(() => {
        Axios.get("http://localhost:3001/dealer", {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }).then((response) => {
            setAhass(response.data['data']);
        })
    }, [])

    const autofill_nama_ahass = (e) => {
        const no_ahass = e.target.value;
        const nama_ahass = ahass.filter((item) => {
            return item.No_Ahass == no_ahass
        })
        document.getElementById("nama_ahass").value = nama_ahass[0].Nama_Ahass;
        setNoAhass(no_ahass);
        setNamaAhass(nama_ahass[0].Nama_Ahass);
    }

    const autofill_tahun = (e) => {
        const tahun = e.target.value;
        setDataTahun(tahun);
    }

    const isEmpty = (e) => {
        e.preventDefault();
        if(noAhass == "" || dataTahun == ""){
            alert("Data belum lengkap, silahkan isi semua form");
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        if(isEmpty(e)) {
            Axios.get(`http://localhost:3001/laporan/getlaporantahunan/${noAhass}/${dataTahun}`, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                if(response.data["data"].length === 0){
                    alert("Data tidak ditemukan");
                }
                else{
                    alert("Data ditemukan");
                    console.log(response.data["data"]);
                }
            })
            const query = `noAhass=${noAhass}&dataTahun=${dataTahun}`;
            window.location.href = `/user/laporan/laporan-tahunan/no-ahass/hasil-data/?${query}`;
            // alert (query);
        }
    }

    return (
        <div >
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
                        style={{backgroundColor:"#820000", border:"none"}}
                        >Cari Data</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LaporanTahunanTahunUser;