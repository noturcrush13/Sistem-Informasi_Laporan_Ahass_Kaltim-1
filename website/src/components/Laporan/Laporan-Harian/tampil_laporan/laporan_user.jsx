import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import { Pagination } from "react-bootstrap";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import Axios from "axios";

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

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../laporan-harian.css";

function TampilLaporanHarianUser(){
    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileextension = '.xlsx';

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const [laporan, setLaporan] = useState([]);
    const [namaDealer, setNamaDealer] = useState('');

    const searchParams = useQuery();
    const noAhass = searchParams.get('id_user');
    const tanggal = searchParams.get('tanggal');
    
    const token = localStorage.getItem("token");

    const exportToCSV = (csvData, fileName) => {
        const filteredData = csvData.map(({ _id, penjualan_part, pendapatan_jasa, penjualan_oli,__v,  ...rest }) => rest);
        // const filteredData = csvData.map(({ _id, __v,  ...rest }) => rest);
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: filetype});
        FileSaver.saveAs(data, fileName + fileextension);
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/laporan/getlaporanharianuser/${noAhass}/${tanggal}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setLaporan(response.data.data);
        })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3001/dealer/getdealername/${noAhass}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setNamaDealer(response.data.data[0].Nama_Ahass);
        })
    }, [])

    return (
        <div>
            <SubTitleComponent title="Laporan" subtitle="Laporan Harian"/>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>No</th>
                        <th scope='col'>AHASS Info</th>
                        <th scope='col'>Unit Info I</th>
                        <th scope='col'>Unit Info II</th>
                        <th scope='col'>Dibuat Pada</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {laporan.map((item, index) => {
                        return(
                            <tr>
                                <th scope='row'>{ index + 1}</th>
                                <td>
                                    No Dealer : {item.id_dealer}
                                    <br/>
                                    Nama Dealer : {namaDealer}
                                </td>
                                <td>
                                    Mekanik : {item.total_mekanik}
                                    <br/>
                                    Unit Entry : {item.unit_entry}
                                    <br/>
                                    KPB 1 : {item.KPB_1}
                                    <br/>
                                    KPB 2 : {item.KPB_2}
                                    <br/>
                                    KPB 3 : {item.KPB_3}
                                    <br/>
                                    KPB 4 : {item.KPB_4}
                                    <br/>
                                    Claim : {item.claim}
                                    <br/>
                                    Service Lengkap : {item.service_lengkap}
                                    <br/>
                                    Service Ringan : {item.service_ringan}
                                    <br/>
                                    UE by Engine Flush : {item.ue_by_engine_flush}
                                </td>
                                <td>
                                    Ganti Oli : {item.ganti_oli}    
                                    <br/>
                                    Light Repair : {item.light_repair}
                                    <br/>
                                    Heavy Repair : {item.heavy_repair}
                                    <br/>
                                    Job Return : {item.job_return}
                                    <br/>
                                    Other Job : {item.other_job}
                                    <br/>
                                    Jumlah UE By Service Visit : {item.jumlah_ue_by_service_visit}
                                    <br/>
                                    Jumlah UE By Pit Express : {item.jumlah_ue_by_pit_express}
                                    <br/>
                                    UE By Reminder : {item.ue_by_reminder}
                                    <br/>
                                    UE By AHASS Event : {item.ue_by_ahass_event}
                                    <br/>
                                    UE By Injector Cleaner : {item.ue_by_injector_cleaner}
                                </td>
                                <td>{item.tanggal}</td>
                            </tr>
                        )
                    })}
                </MDBTableBody>
            </MDBTable>
            <MDBBtn 
                className="ms-2"
                color='success' 
                size='sm'
                style={{height: '2.2rem', lineHeight: '1.5rem'}}
                onClick={(e) => {
                    exportToCSV(laporan, `Laporan Harian ${namaDealer} ${tanggal}`)
                }}>Export Laporan
            </MDBBtn>
        </div>
    )
}

export default TampilLaporanHarianUser;