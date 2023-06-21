import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import { Pagination } from "react-bootstrap";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import Axios from "axios";

import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../laporan-tahunan.css";

function TampilLaporanTahunanNoAHASSUser(){
    const location = useLocation();
    const [params, setParams] = useState(null);

    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileextension = '.xlsx';

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const searchParams = useQuery();

    // consolelog all params in useQuery
    // for (let param of searchParams.entries()) {
    //     console.log(param);
    // }

    const [active, setActive] = useState(1); // State for active page
    const [page, setPage] = useState(1); // State for current page
    const itemsPerPage = 3; // Number of items to display per page

    const noAhass = searchParams.get('noAhass');
    const dataTahun = searchParams.get('dataTahun');

    const [namaDealer, setNamaDealer] = useState('')

    const [laporan, setLaporan] = useState([]);

    const token = localStorage.getItem("token");

    const handlePageChange = (number) => {
        setPage(number);
        setActive(number);
    };

    const handleNext = () => {
        if (page < Math.ceil(laporan.length / itemsPerPage)) {
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

        for (let number = 1; number <= Math.ceil(laporan.length / itemsPerPage); number++) {
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
        const slicedData = laporan.slice(start, end);

        return slicedData.map((value, index) => (
            <tr>
                <th scope="row">
                    {start + index + 1}
                </th>
                {value[noAhass] ? (
                    <>
                        <td>
                            No Dealer : {value[noAhass].id_dealer}
                            <br/>
                            Nama Dealer : {namaDealer}
                            <br/>
                        </td>
                        <td>
                            Mekanik : {value[noAhass].total_mekanik}
                            <br/>
                            Unit Entry : {value[noAhass].unit_entry}
                            <br/>
                            KPB 1 : {value[noAhass].KPB_1}
                            <br/>
                            KPB 2 : {value[noAhass].KPB_2}
                            <br/>
                            KPB 3 : {value[noAhass].KPB_3}
                            <br/>
                            KPB 4 : {value[noAhass].KPB_4}
                            <br/>
                            Claim : {value[noAhass].claim}
                            <br/>
                            Service Lengkap : {value[noAhass].service_lengkap}
                            <br/>
                            Service Ringan : {value[noAhass].service_ringan}
                            <br/>
                            UE by Engine Flush : {value[noAhass].ue_by_engine_flush}
                        </td>
                        <td>
                            Ganti Oli : {value[noAhass].ganti_oli}    
                            <br/>
                            Light Repair : {value[noAhass].light_repair}
                            <br/>
                            Heavy Repair : {value[noAhass].heavy_repair}
                            <br/>
                            Job Return : {value[noAhass].job_return}
                            <br/>
                            Other Job : {value[noAhass].other_job}
                            <br/>
                            Jumlah UE By Service Visit : {value[noAhass].jumlah_ue_by_service_visit}
                            <br/>
                            Jumlah UE By Pit Express : {value[noAhass].jumlah_ue_by_pit_express}
                            <br/>
                            UE By Reminder : {value[noAhass].ue_by_reminder}
                            <br/>
                            UE By AHASS Event : {value[noAhass].ue_by_ahass_event}
                            <br/>
                            UE By Injector Cleaner : {value[noAhass].ue_by_injector_cleaner}
                        </td>
                    </>
                ) : (
                    <>
                        <td>
                            No Dealer : {noAhass}
                            <br/>
                            Nama Dealer : {namaDealer}
                            <br/>
                        </td>
                        <td>
                            data belum tersedia
                        </td>
                        <td>
                            data belum tersedia
                        </td>
                    </>
                )}
            </tr>
        ));
    }

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
        Axios.get(`https://backend-fix.glitch.me/dealer/getdealername/${noAhass}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            // console.log("nama dealer",response.data);
            setNamaDealer(response.data.data[0].Nama_Ahass);
        })
    }, [])

    useEffect(() => {
        Axios.get(`https://backend-fix.glitch.me/laporan/getlaporantahunan/${noAhass}/${dataTahun}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setLaporan(response.data.data);
            console.log(response.data.data);
            console.log(response.data.data[4][noAhass]);
        })
    }, [])

    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Tahunan"/>
            <h3 className="text-center">{namaDealer}</h3>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Bulan</th>
                        <th scope='col'>AHASS Info</th>
                        <th scope='col'>Unit Info I</th>
                        <th scope='col'>Unit Info II</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {renderTableRows()}
                </MDBTableBody>
            </MDBTable>
            <Row className="d-flex justify-content-start">
                <Col md={12} className="d-flex justify-content-start">
                    <Pagination>
                        <Pagination.Item disabled={page === 1} onClick={handlePrev}>
                            Prev
                        </Pagination.Item>
                        {renderPaginationItems()}
                        <Pagination.Item disabled={page === Math.ceil(laporan.length / itemsPerPage)} onClick={handleNext}>
                            Next
                        </Pagination.Item>
                    </Pagination>
                    <MDBBtn 
                        className="ms-2"
                        color='success' 
                        size='sm'
                        style={{height: '2.2rem', lineHeight: '1.5rem'}}
                        onClick={(e) => {
                            exportToCSV(laporan, `laporan_bulanan_${dataTahun}.csv`)
                        }}>Export Laporan
                    </MDBBtn>
                </Col>
            </Row>
        </div>
    )
}

export default TampilLaporanTahunanNoAHASSUser;