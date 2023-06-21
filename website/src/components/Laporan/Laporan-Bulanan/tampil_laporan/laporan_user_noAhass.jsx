import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import moment from "moment";

import { Pagination } from "react-bootstrap";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import Axios from "axios";

import LineRechartComponent from "../../../Graph/bar-chart";

import PieRechartComponent from "../../../Graph/pie-chart";

import LiceRechartPendapatanComponent from "../../../Graph/bar-chart-pendapatan";

import { 
    MDBBadge, 
    MDBBtn, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane, } from 'mdb-react-ui-kit';

import SubTitleComponent from "../../../Sub-Title/Sub-Title";

import "../laporan-bulanan.css";


function TampilLaporanBulananNoAHASSUser(){
    const [activeTab, setActiveTab] = useState('1');
    
    const handleBasicClick = (value) => {
        if (value == activeTab) {
          return;
        }
        setActiveTab(value);
    };

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

    const noAhass = searchParams.get('noAhass');
    const dataBulan = searchParams.get('dataBulan');
    const dataTahun = searchParams.get('dataTahun');

    const [namaDealer, setNamaDealer] = useState('')

    const [laporan, setLaporan] = useState([]);

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
        Axios.get(`https://backend-fix.glitch.me/laporan/getlaporanbulanan/${noAhass}/${dataBulan}/${dataTahun}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            setLaporan(response.data.data);
            // console.log(response.data.data);
        })
    }, [])

    const data = laporan.reduce((result, item) => {
        const date = new Date(item.tanggal);
        const tanggal_data = date.getDate();
        const bulan_data = date.getMonth() + 1;
      
        result.push({
          name: `${tanggal_data}/${bulan_data}`,
          ue: item.unit_entry,
          date: date
        })
      
        return result;
    }, []);
      
    data.sort((a, b) => a.date - b.date);


    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Bulanan"/>
            <Row className="d-flex justify-content-start">
                <Col md={12} className="d-flex justify-content-start">
                    
                    <MDBBtn 
                        className="ms-2"
                        color='success' 
                        size='sm'
                        style={{height: '2.2rem', lineHeight: '1.5rem'}}
                        onClick={(e) => {
                            exportToCSV(laporan, `laporan_bulanan_${dataBulan}.csv`)
                        }}>Export Laporan
                    </MDBBtn>
                </Col>
            </Row>
        </div>
    )           
}

export default TampilLaporanBulananNoAHASSUser;