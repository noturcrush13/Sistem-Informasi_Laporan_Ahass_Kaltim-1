import React, { useState, useEffect } from "react";

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../user.css'

function BuatUserAdmin () {

    const [ahass, setAhass] = useState([]);

    const [noAhass, setNoAhass] = useState("");
    const [namaAhass, setNamaAhass] = useState("");
    const [namaDepan, setNamaDepan] = useState("");
    const [namaBelakang, setNamaBelakang] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [konfirmasi, setKonfirmasi] = useState("");

    const token = localStorage.getItem("token");

    const getDealer = () => {
        Axios.get("https://backend-fix.glitch.me/dealer/",{
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

    const konfirmasiPassword = (e) => {
        e.preventDefault();
        if (password !== konfirmasi) {
            alert("Password tidak sama")
            return false;
        }
        else {
            return true;
        }
    }

    const isEmpty = (e) => {
        e.preventDefault();
        if (noAhass === "" || namaAhass === "" || namaDepan === "" || namaBelakang === "" || username === "" || password === "") {
            alert("Data tidak boleh kosong")
            return false;
        }
        else {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            No_Ahass: noAhass,
            nama_depan: namaDepan,
            nama_belakang: namaBelakang,
        }
        if (isEmpty(e) && konfirmasiPassword(e)) {
            Axios.post("https://backend-fix.glitch.me/user/register", data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            },
            )
            .then((response) => {
                if(response.data.err){
                    alert(response.data.err)
                }else{
                    alert("User berhasil dibuat")
                    window.location.reload();
                }
            })
        }
    }



    return (
        getDealer(),
        <div >
            <SubTitleComponent title="User" subtitle="Buat User Baru"/>
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
                            <FormControl type="text" placeholder="Nama AHASS" id="nama_ahass" disabled />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Nama Depan*</FormLabel>
                            <FormControl 
                            type="text" 
                            placeholder="Nama Depan Anda" 
                            onChange={(e) => {setNamaDepan(e.target.value)}}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Nama Belakang*</FormLabel>
                            <FormControl 
                            type="text" 
                            placeholder="Nama Belakang Anda"
                            onChange={(e) => {setNamaBelakang(e.target.value)}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Username*</FormLabel>
                            <FormControl 
                            type="text" 
                            placeholder="Username Anda" 
                            onChange={(e) => {setUsername(e.target.value)}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Password*</FormLabel>
                            <FormControl 
                            type="password" 
                            placeholder="" 
                            onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Konfirmasi Password*</FormLabel>
                            <FormControl 
                            type="password" 
                            placeholder="" 
                            onChange={(e) => {setKonfirmasi(e.target.value)}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button  
                        className="button-dealer sm mx-auto w-100 mb-2" 
                        style={{backgroundColor:"#C71C15"}}
                        onClick={handleSubmit}
                        >Buat User</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuatUserAdmin;