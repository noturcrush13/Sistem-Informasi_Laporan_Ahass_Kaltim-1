import React, { useState, useEffect } from "react";

import Axios from "axios";

import {Container, Row, Col, Image, Link, FormSelect, FormControl, FormLabel, FormGroup, InputGroup, Button} from "react-bootstrap";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../Sub-Title/Sub-Title";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import '../user.css'


function DaftarUserAdmin () {

    const [data, setData] = useState([]);

    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileextension = '.xlsx';

    const token = localStorage.getItem("token");

    const getData = () => {
        Axios.get("http://localhost:3001/user/", {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setData(response.data);
        })
    }

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: filetype});
        FileSaver.saveAs(data, fileName + fileextension);
    }

    return (
        getData(),
        <div >
            <SubTitleComponent title="User" subtitle="Daftar User"/>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>No</th>
                            <th scope='col'>Username</th>
                            <th scope='col'>User Info</th>
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
                                    <td>
                                        No AHASS : {item.No_Ahass}
                                        <br/>
                                        Nama Depan : {item.nama_depan}
                                        <br/>
                                        Nama Belakang : {item.nama_belakang}
                                    </td>
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
            <MDBBtn  
            color='success' 
            size='sm'
            onClick={(e) => exportToCSV(data, 'daftar user')}
            >Export User</MDBBtn>
        </div>
    )
}

export default DaftarUserAdmin;