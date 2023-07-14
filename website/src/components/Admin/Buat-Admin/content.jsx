import React, { useState, useEffect } from "react";

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../admin.css'



function BuatAdmin () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nama_depan, setNamaDepan] = useState("");
    const [nama_belakang, setNamaBelakang] = useState("");
    const [konfirmasi, setKonfirmasi] = useState("");

    const token = localStorage.getItem("token");

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
        if (username === "" || password === "" || nama_depan === "" || nama_belakang === "") {
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
            nama_depan: nama_depan,
            nama_belakang: nama_belakang
        }
        if (isEmpty(e) && konfirmasiPassword(e)) {
            Axios.post("https://backend-fix.glitch.me/admin/register", data,
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
                    alert("Admin berhasil ditambahkan")
                }
            })
        }
    }


    return (
        <div >
            <SubTitleComponent title="Admin" subtitle="Tambah Admin Baru"/>
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={12} className="">
                        <FormGroup>
                            <FormLabel>Username*</FormLabel>
                            <FormControl 
                            type="text" 
                            placeholder="Username Anda" 
                            onChange={(e) => setUsername(e.target.value)}
                            />
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
                            onChange={(e) => setNamaDepan(e.target.value)}
                            />
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
                            onChange={(e) => setNamaBelakang(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
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
                            onChange={(e) => setKonfirmasi(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col md={10}>
                        <Button 
                        className="button-dealer sm mx-auto w-100 mb-2" 
                        style={{backgroundColor:"#C71C15"}}
                        onClick={(e) => handleSubmit(e)}
                        >Tambah Admin</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BuatAdmin;