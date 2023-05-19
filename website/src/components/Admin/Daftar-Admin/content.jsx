import React, { useState, useEffect } from "react";

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import '../admin.css'


function DaftarAdmin () {

    const [data, setData] = useState([]);

    const token = localStorage.getItem("token");

    const getData = () => {
        Axios.get("http://localhost:3001/admin/", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setData(response.data);
        })
    }

    return (
        getData(),
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
                        {data.map((item, index) => {
                            return (
                                <tr>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.nama_depan}</td>
                                    <td>{item.nama_belakang}</td>
                                    <td>{item.createdAt}</td>
                                    <td>
                                        <MDBBtn className="me-2" color='primary' size='sm'>Edit</MDBBtn>
                                        <MDBBtn color='danger' size='sm'>Hapus</MDBBtn>
                                    </td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
        </div>
    )
}

export default DaftarAdmin;