import React, { useState, useEffect } from "react";

import { useLocation } from 'react-router-dom';

import {Container, Row, Col, Image, Link} from "react-bootstrap";

import moment from "moment";

import { Pagination } from "react-bootstrap";

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

import Axios from "axios";

import LineRechartTahunan from "../../../Graph/bar-chart-tahunan";

import PieRechartComponent from "../../../Graph/pie-chart";

import LiceRechartPendapatanComponent from "../../../Graph/bar-chart-tahunan-pendapatan";

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

import "../laporan-tahunan.css";

function TampilLaporanTahunanNoAHASSAdmin(){
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
    const dataTahun = searchParams.get('dataTahun');

    const [namaDealer, setNamaDealer] = useState('')

    const [laporan, setLaporan] = useState([]);

    const token = localStorage.getItem("token");

    const list_bulan = {
        1 : "Januari",
        2 : "Februari",
        3 : "Maret",
        4 : "April",
        5 : "Mei",
        6 : "Juni",
        7 : "Juli",
        8 : "Agustus",
        9 : "September",
        10 : "Oktober",
        11 : "November",
        12 : "Desember",
    }

    const namaBulan = (month) => {
        return list_bulan[month];
    }

    const formatDataForGraph = () => {
        return laporan.map((value, index) => ({
            bulan: namaBulan(index + 1),
            ue: value.unit_entry,
        }));
    };

    const formatDataPekerjaan = () => {
        return laporan.map((item) => ({
            KPB_1: item.KPB_1,
            KPB_2: item.KPB_2,
            KPB_3: item.KPB_3,
            KPB_4: item.KPB_4,
            claim: item.claim,
            service_lengkap: item.service_lengkap,
            service_ringan: item.service_ringan,
            ganti_oli: item.ganti_oli,
            light_repair: item.light_repair,
            heavy_repair: item.heavy_repair,
            job_return: item.job_return,
            jumlah_ue_by_service_visit: item.jumlah_ue_by_service_visit,
            jumlah_ue_by_pit_express: item.jumlah_ue_by_pit_express,
            ue_by_reminder: item.ue_by_reminder,
            ue_by_ahass_event: item.ue_by_ahass_event,
            ue_by_engine_flush: item.ue_by_engine_flush,
            ue_by_injector_cleaner: item.ue_by_injector_cleaner,
        }));
    };

    const pekerjaanData = formatDataPekerjaan();

    const pieData = [
        { name: 'KPB 1', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.KPB_1), 0) },
        { name: 'KPB 2', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.KPB_2), 0) },
        { name: 'KPB 3', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.KPB_3), 0) },
        { name: 'KPB 4', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.KPB_4), 0) },
        { name: 'Claim', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.claim), 0) },
        { name: 'Service Lengkap', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.service_lengkap), 0) },
        { name: 'Service Ringan', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.service_ringan), 0) },
        { name: 'Ganti Oli', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.ganti_oli), 0) },
        { name: 'Light Repair', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.light_repair), 0) },
        { name: 'Heavy Repair', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.heavy_repair), 0) },
        { name: 'Job Return', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.job_return), 0) },
        { name: 'Jumlah UE by Service Visit', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.jumlah_ue_by_service_visit), 0) },
        { name: 'Jumlah UE by Pit Express', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.jumlah_ue_by_pit_express), 0) },
        { name: 'UE by Reminder', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.ue_by_reminder), 0) },
        { name: 'UE by AHASS Event', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.ue_by_ahass_event), 0) },
        { name: 'UE by Engine Flush', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.ue_by_engine_flush), 0) },
        { name: 'UE by Injector Cleaner', value: pekerjaanData.reduce((sum, item) => sum + parseInt(item.ue_by_injector_cleaner), 0) },
    ];

    const formatDataForPendapatan = () => {
        return laporan.map((item, index) => ({
            bulan: namaBulan(index + 1),
          total_pendapatan: item.pendapatan_jasa + item.penjualan_part + item.penjualan_oli,
        }));
    };

    const formatDataForPendapatanPie = () => {
        return laporan.map((item) => ({
            pendapatan_jasa : item.pendapatan_jasa,
            penjualan_part : item.penjualan_part,
            penjualan_oli : item.penjualan_oli,
        }));
    };

    const pekerjaanPieData = formatDataForPendapatanPie();

    const piePekerjaan = [
        { name: 'Pendapatan Jasa', value: pekerjaanPieData.reduce((sum, item) => sum + parseInt(item.pendapatan_jasa), 0) },
        { name: 'Penjualan Part', value: pekerjaanPieData.reduce((sum, item) => sum + parseInt(item.penjualan_part), 0) },
        { name: 'Penjualan Oli', value: pekerjaanPieData.reduce((sum, item) => sum + parseInt(item.penjualan_oli), 0) },
    ]

    // console.log("formatDataForGraph", formatDataForGraph())

    const exportToCSV = (csvData, fileName) => {
        // const filteredData = csvData.map(({ _id, penjualan_part, pendapatan_jasa, penjualan_oli,__v,  ...rest }) => rest);
        const filteredData = csvData.map(({ _id, __v,  ...rest }) => rest);
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
        })
    }, [])

    return (
        <div >
            <SubTitleComponent title="Laporan" subtitle="Laporan Tahunan"/>
            <MDBTabs className='mb-3 underline-tabs'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={activeTab === 'tab1'}>
                        Unit Entry
                    </MDBTabsLink>
                    </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={activeTab === 'tab2'}>
                        Pekerjaan 
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={activeTab === 'tab3'}>
                        Pendapatan(BAR)
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab4')} active={activeTab === 'tab4'}>
                        Pendapatan(PIE)
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={activeTab === 'tab1'}>
                    <Container className="d-flex justify-content-center">
                        <h3>Bar Chart Unit Entry</h3>
                    </Container>
                    <LineRechartTahunan data={formatDataForGraph()} />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab2'}>
                    <Container className="d-flex justify-content-center">
                        <h3>Pie Chart Pekerjaan</h3>
                    </Container>
                    <PieRechartComponent data={pieData} />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab3'}>
                    <Container className="d-flex justify-content-center">
                        <h3>Bar Chart Pendapatan </h3>
                    </Container>
                    <LiceRechartPendapatanComponent data={formatDataForPendapatan()} />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'tab4'}>
                    <Container className="d-flex justify-content-center">
                        <h3>Pie Chart Pendapatan </h3>
                    </Container>
                    <PieRechartComponent data={piePekerjaan} />
                </MDBTabsPane>
            </MDBTabsContent>
            <Row className="d-flex justify-content-start">
                <Col md={12} className="d-flex justify-content-start">
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

export default TampilLaporanTahunanNoAHASSAdmin;