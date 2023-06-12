import React, { useState, useEffect } from "react";

import Axios from "axios";

import { Pagination } from "react-bootstrap";

import { 
    MDBBadge, 
    MDBBtn, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,} from 'mdb-react-ui-kit';

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button, Modal} from "react-bootstrap";

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import '../admin.css'


function DaftarAdmin () {

    const [idUser, setIdUser] = useState("");
    const [username, setUsername] = useState("");
    const [nama_depan, setNama_Depan] = useState("");
    const [nama_belakang, setNama_Belakang] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [data, setData] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        Axios.get("http://localhost:3001/admin/", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setData(response.data);
        })
    } , [])

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    const getIdUser = (id) => {
        setIdUser(id);
        setBasicModal(!basicModal);
    }
    
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleChangeNama_Depan = (e) => {
        setNama_Depan(e.target.value);
    }

    const handleChangeNama_Belakang = (e) => {
        setNama_Belakang(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const checkFormEmpty = () => {
        if (username === "" || nama_depan === "" || nama_belakang === "" || password === "" || confirmPassword === "") {
            return true;
        } else {
            return false;
        }
    }

    const checkPassword = () => {
        if (password === confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            nama_depan: nama_depan,
            nama_belakang: nama_belakang,
        }
        if (checkFormEmpty()) {
            alert("Form tidak boleh kosong");
        } else if (!checkPassword()) {
            alert("Password tidak sama");
        } else {
            Axios.post(`http://localhost:3001/admin/edit/${idUser}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then((response) => {
                alert(response.data.message);
                window.location.reload();
            })
            .catch((error) => {
                alert("User Gagal Diubah: " + error['response']['data']['message']);
            })
        }
    }

    const deleteUser = (id) => {
        Axios.delete(`http://localhost:3001/admin/delete/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            alert(response.data.message);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error['response']['data']);
            alert("User Gagal Dihapus: " + error['response']['data']['message']);
        })
    }

    const [active, setActive] = useState(1); // State for active page
    const [page, setPage] = useState(1); // State for current page
    const itemsPerPage = 5; // Number of items to display per page

    const handlePageChange = (number) => {
        setPage(number);
        setActive(number);
    };

    const handleNext = () => {
        if (page < Math.ceil(data.length / itemsPerPage)) {
        setPage(page + 1);
        setActive(page + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
        setPage(page - 1);
        setActive(page - 1);
        }
    };

    const renderPaginationItems = () => {
        const items = [];

        for (let number = 1; number <= Math.ceil(data.length / itemsPerPage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handlePageChange(number)}>
            {number}
            </Pagination.Item>
        );
        }

        return items;
    };

    const renderTableRows = () => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedData = data.slice(start, end);
    
        return slicedData.map((item, index) => (
            <tr>
                <th scope='row'>{start + index + 1}</th>
                <td>{item.username}</td>
                <td>{item.nama_depan}</td>
                <td>{item.nama_belakang}</td>
                <td>{item.createdAt}</td>
                <td>
                    <MDBBtn 
                    className="custom-button me-2" 
                    color='primary' 
                    size='sm'
                    onClick={() => getIdUser(item._id)}
                    >Edit</MDBBtn>
                    <MDBBtn
                    className="custom-button" 
                    color='danger' 
                    size='sm'
                    onClick={() => deleteUser(item._id)}
                    >Hapus</MDBBtn>
                </td>
            </tr>
        ));
    };

    useEffect(() => {
        Axios.get(`http://localhost:3001/admin/${idUser}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            console.log("ini data", response.data);
            setUsername(response.data.username);
            setNama_Depan(response.data.nama_depan);
            setNama_Belakang(response.data.nama_belakang);
        })
        .catch((error) => {
            console.log(error.response.data.message);
        })
    }, [idUser, token]);

    return (
        <div >
            <SubTitleComponent title="Admin" subtitle="Daftar Admin"/>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>No</th>
                            <th scope='col'>Username</th>
                            <th scope='col'>Nama Depan</th>
                            <th scope='col'>Nama Belakang</th>
                            <th scope='col'>Dibuat Pada</th>
                            <th scope='col'>Opsi</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {renderTableRows()}
                    </MDBTableBody>
                </MDBTable>
                <Pagination>
                    <Pagination.Item disabled={page === 1} onClick={handlePrev}>
                        Prev
                    </Pagination.Item>
                    {renderPaginationItems()}
                    <Pagination.Item disabled={page === Math.ceil(data.length / itemsPerPage)} onClick={handleNext}>
                        Next
                    </Pagination.Item>
                </Pagination>
                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex=''>
                <MDBModalDialog >
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit Admin</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <Modal.Body>
                            <Row className="d-flex justify-content-center align-items-center">
                                <Row className="d-flex justify-content-center align-items-center mt-3">
                                    <Col md={12} className="">
                                    <FormGroup>
                                        <FormLabel>Username*</FormLabel>
                                        <FormControl 
                                        type="text" 
                                        placeholder="Username Anda" 
                                        value={username}
                                        onChange={(e) => {setUsername(e.target.value)}}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Nama Depan*</FormLabel>
                                                <FormControl 
                                                type="text" 
                                                placeholder="Nama Depan Anda" 
                                                value={nama_depan}
                                                onChange={(e) => {setNama_Depan(e.target.value)}}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Nama Belakang*</FormLabel>
                                                <FormControl 
                                                type="text" 
                                                placeholder="Nama Belakang Anda"
                                                value={nama_belakang}
                                                onChange={(e) => {setNama_Belakang(e.target.value)}}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center mt-3">
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Password*</FormLabel>
                                                <FormControl 
                                                type="password" 
                                                placeholder=""
                                                onChange={(e) => {setPassword(e.target.value)}}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} className="">
                                            <FormGroup>
                                                <FormLabel>Konfirmasi Password*</FormLabel>
                                                <FormControl 
                                                type="password" 
                                                placeholder="" 
                                                onChange={(e) => {setConfirmPassword(e.target.value)}}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Row>
                            </Modal.Body>
                        <MDBModalFooter>
                            <MDBBtn 
                            className="custom-button"
                            color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn
                            className="custom-button"
                            color='primary'
                            onClick={handleSubmit}
                            >Save changes
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    )
}

export default DaftarAdmin;